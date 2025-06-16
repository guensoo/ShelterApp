/* global naver */
import { useEffect, useRef, useState } from "react";
import markerColors from "./markerColors";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.9780 };
const NAVER_MAP_SCRIPT_ID = "naver-map-script";

const MapContainer = ({ shelters = [], onSelectShelter, keyword }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [markers, setMarkers] = useState([]);
  const infoWindowRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false); // ⭐️ 추가

  // 네이버맵 스크립트 동적 추가 및 로딩 감지
  useEffect(() => {
    // 이미 스크립트가 있다면 로딩 체크 후 바로 세팅
    if (window.naver && window.naver.maps) {
      setIsMapReady(true);
      return;
    }
    // 이미 추가된 script 태그 있으면 이벤트만 걸어줌
    const existScript = document.getElementById(NAVER_MAP_SCRIPT_ID);
    if (existScript) {
      existScript.addEventListener("load", () => setIsMapReady(true));
      return;
    }
    // 새로 추가
    const script = document.createElement("script");
    script.id = NAVER_MAP_SCRIPT_ID;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.REACT_APP_NAVER_MAP_API_KEY}`;
    script.async = true;
    script.addEventListener("load", () => setIsMapReady(true));
    document.head.appendChild(script);

    return () => {
      // 필요시 클린업, script 제거는 안함(다른 컴포넌트에서 또 쓸 수 있으니까)
      script.removeEventListener("load", () => setIsMapReady(true));
    };
  }, []);

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

  // 네이버맵이 완전히 로딩된 뒤에만 맵 초기화!
  useEffect(() => {
    if (!isMapReady) return;
    if (!naver || !naver.maps || !mapRef.current) return;

    const initializeMap = (lat, lng) => {
      if (!window.naver || !window.naver.maps) return;
      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(lat, lng),
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
    // eslint-disable-next-line
  }, [isMapReady]); // ⭐️ isMapReady를 의존성에 추가

  useEffect(() => {
    if (!isMapReady) return;
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
  }, [isMapReady, keyword]);

  useEffect(() => {
    if (!isMapReady) return;
    if (!naver || !naver.maps || !mapInstance.current) return;
    markers.forEach(marker => marker.setMap(null));
    const newMarkers = shelters
      .filter(shelter => shelter.lat && shelter.lng)
      .map(createMarker);
    setMarkers(newMarkers);
    // eslint-disable-next-line
  }, [isMapReady, shelters]);

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
