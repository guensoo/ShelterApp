/* global naver */
import { useEffect, useRef, useState } from "react";
import markerColors from "./markerColors";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.9780 };

const MapContainer = ({ shelters = [], onSelectShelter, keyword }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [markers, setMarkers] = useState([]);
  const infoWindowRef = useRef(null);

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });
  const navigate = useNavigate();

  const getInfoWindowContent = (shelter) => `
    <div style="padding:10px;max-width:230px;">
      <div style="font-weight:bold;font-size:16px;">${shelter.name || "쉼터 이름"}</div>
      <div style="font-size:13px;margin:4px 0;">📍 ${shelter.addr || "주소 없음"}</div>
      <button id="open-detail-btn" style="margin-top:8px;padding:4px 10px;border:1px solid #1976d2;background:#1976d2;color:#fff;border-radius:6px;cursor:pointer;">
        상세보기
      </button>
      <button id="close-infowindow-btn" style="margin-top:8px;margin-left:6px;padding:4px 10px;border:1px solid #ccc;background:#fff;border-radius:6px;cursor:pointer;">
        닫기
      </button>
    </div>
  `;

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  const addMapClickCloseEvent = () => {
    if (!mapInstance.current) return;
    naver.maps.Event.addListener(mapInstance.current, "click", () => {
      if (infoWindowRef.current) infoWindowRef.current.close();
    });
  };

  const renderCurrentLocationMarker = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const myLocation = new naver.maps.LatLng(lat, lng);

        const marker = new naver.maps.Marker({
          position: myLocation,
          map: mapInstance.current,
          icon: {
            content: `
              <div style="
                width: 18px;
                height: 18px;
                background-color:#1E90FF;
                border: 2px solid white;
                box-shadow: 0 0 6px rgba(30, 144, 255, 0.7);
              " title="내 위치"></div>
            `,
            size: new naver.maps.Size(18, 18),
            anchor: new naver.maps.Point(9, 9),
          },
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: `
            <div style="
              padding: 8px 12px;
              font-size: 14px;
              background: white;
              border-radius: 6px;
            ">
              📍 내 위치
            </div>
          `,
          pixelOffset: new naver.maps.Point(0, -10),
        });
        infoWindowRef.current = infoWindow;

        naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(mapInstance.current, marker);
        });

        mapInstance.current.setCenter(myLocation);
      },
      (err) => console.error("위치 허용 실패:", err)
    );
  };

  const toggleFavorite = (shelter) => {
    const isLoggedIn = !!localStorage.getItem("user");
    if (!isLoggedIn) {
      const confirmLogin = window.confirm("이 기능은 로그인 후 이용 가능합니다.\n로그인하시겠습니까?");
      if (confirmLogin) navigate("/login");
      return;
    }

    const exists = favorites.some(f => f.id === shelter.id);
    const updated = exists
      ? favorites.filter(f => f.id !== shelter.id)
      : [...favorites, shelter];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const createMarker = (shelter) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(shelter.lat, shelter.lng),
      map: mapInstance.current,
      icon: {
        content: `
          <div style="
            width: 16px;
            height: 16px;
            background-color: ${markerColors[shelter.type] || markerColors.DEFAULT};
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 2px rgba(0,0,0,0.3);
          " title="${shelter.name}"></div>
        `,
        size: new naver.maps.Size(16, 16),
        anchor: new naver.maps.Point(8, 8),
      },
    });

    naver.maps.Event.addListener(marker, "click", () => {
      mapInstance.current.panTo(new naver.maps.LatLng(shelter.lat, shelter.lng));
      if (infoWindowRef.current) infoWindowRef.current.close();

      infoWindowRef.current = new naver.maps.InfoWindow({
        content: getInfoWindowContent(shelter),
        disableAnchor: false,
        pixelOffset: new naver.maps.Point(0, -10),
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        maxWidth: 250,
      });

      infoWindowRef.current.open(mapInstance.current, marker);

      setTimeout(() => {
        const closeBtn = document.getElementById("close-infowindow-btn");
        if (closeBtn) closeBtn.onclick = () => infoWindowRef.current.close();

        const detailBtn = document.getElementById("open-detail-btn");
        if (detailBtn) detailBtn.onclick = () => {
          onSelectShelter?.(shelter);
          infoWindowRef.current.close();
        };
      }, 100);
    });

    return marker;
  };

  const addShelterMarkers = (shelterList) => {
    clearMarkers();
    const newMarkers = shelterList
      .filter(shelter => shelter.lat && shelter.lng)
      .map(createMarker);
    setMarkers(newMarkers);
  };

  useEffect(() => {
    if (!naver || !naver.maps || !mapRef.current) return;

    const initializeMap = (lat, lng) => {
      mapInstance.current = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 13,
      });

      addShelterMarkers(shelters);
      addMapClickCloseEvent();
      renderCurrentLocationMarker();
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => initializeMap(pos.coords.latitude, pos.coords.longitude),
      () => initializeMap(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng)
    );
  }, []);

  useEffect(() => {
    if (!naver || !naver.maps || !mapInstance.current || !keyword) return;

    const geocoder = new naver.maps.services.Geocoder();
    geocoder.addressSearch(keyword, (result, status) => {
      if (status === naver.maps.services.Status.OK && result.length > 0) {
        const { y, x } = result[0];
        const latlng = new naver.maps.LatLng(y, x);
        mapInstance.current.setCenter(latlng);
        mapInstance.current.setZoom(16);
      } else {
        console.warn("❌ 지오코딩 실패:", status, result);
      }
    });
  }, [keyword]);

  useEffect(() => {
    if (!naver || !naver.maps || !mapInstance.current) return;
    markers.forEach(marker => marker.setMap(null));
    const newMarkers = shelters
      .filter(shelter => shelter.lat && shelter.lng)
      .map(createMarker);
    setMarkers(newMarkers);
  }, [shelters]);

  const handleMoveToMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const myLat = pos.coords.latitude;
        const myLng = pos.coords.longitude;
        const myLocation = new naver.maps.LatLng(myLat, myLng);
        if (mapInstance.current) {
          mapInstance.current.setCenter(myLocation);
        }
      },
      (err) => {
        alert("위치 접근을 허용해주세요.");
        console.error("❌ 위치 접근 오류:", err);
      }
    );
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        ref={mapRef}
        id="map"
        style={{ width: "100%", height: "90vh", minHeight: 400 }}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          borderRadius: '50%',
          minWidth: 'auto',
          width: 48,
          height: 48,
          padding: 0,
          boxShadow: 3,
        }}
        onClick={handleMoveToMyLocation}
      >
        <MyLocationIcon />
      </Button>
    </div>
  );
};

export default MapContainer;
