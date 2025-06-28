/* global naver */
import { useEffect, useRef, useState, useContext } from "react";
import markerColors from "./markerColors";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Button } from '@mui/material';
import ShelterDetail from "./ShelterDetail";
import { ShelterFilterContext } from "../../context/ShelterFilterContext";
import { getProcessedShelters } from "../../api/geocode";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.9780 };
const NAVER_MAP_SCRIPT_ID = "naver-map-script";

const MapContainer = ({ shelters = [] }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const myLocationMarkerRef = useRef(null);
  const infoWindowRef = useRef(null);

  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const { selectedTypes } = useContext(ShelterFilterContext);
  const [mapShelters, setMapShelters] = useState([]); // 실제 마커 대상

  // 1. **shelters → 주소좌표 변환**
  useEffect(() => {
    let ignore = false;
    getProcessedShelters(shelters).then(result => {
      if (!ignore) setMapShelters(result);
    });
    return () => { ignore = true; };
  }, [shelters]);

  // 2. **네이버맵 스크립트 동적 로딩**
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      setIsMapReady(true);
      return;
    }
    if (document.getElementById(NAVER_MAP_SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = NAVER_MAP_SCRIPT_ID;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.REACT_APP_NAVER_MAP_API_KEY}`;
    script.async = true;
    script.onload = () => setIsMapReady(true);
    document.head.appendChild(script);
  }, []);

  // 3. **지도 최초 초기화**
  useEffect(() => {
    if (!isMapReady || !naver || !naver.maps || !mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        mapInstance.current = new naver.maps.Map(mapRef.current, {
          center: new naver.maps.LatLng(latitude, longitude),
          zoom: 13,
        });
        renderCurrentLocationMarker();
      },
      () => {
        mapInstance.current = new naver.maps.Map(mapRef.current, {
          center: new naver.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
          zoom: 13,
        });
      }
    );
    // eslint-disable-next-line
  }, [isMapReady]);

  // 4. **마커/InfoWindow/idle리스너**
  useEffect(() => {
    if (!mapInstance.current) return;

    // idle리스너 재등록
    naver.maps.Event.clearInstanceListeners(mapInstance.current);
    naver.maps.Event.addListener(mapInstance.current, "idle", drawVisibleMarkers);

    // 최초 1회 실행
    drawVisibleMarkers();

    function drawVisibleMarkers() {
      clearMarkers();

      // **필터 적용**
      const filterSet = new Set((selectedTypes || []).map(type => type.toUpperCase()));
      const bounds = mapInstance.current.getBounds();
      // **좌표 있는 shelter만 사용!**
      const visibleShelters = mapShelters.filter(shelter => {
        if (!shelter.lat || !shelter.lng) return false;
        const latlng = new naver.maps.LatLng(Number(shelter.lat), Number(shelter.lng));
        const matchType = filterSet.size === 0 || filterSet.has(String(shelter.type).toUpperCase());
        return bounds.hasLatLng(latlng) && matchType;
      });

      markersRef.current = visibleShelters.map(shelter => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(Number(shelter.lat), Number(shelter.lng)),
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
          }
        });
        naver.maps.Event.addListener(marker, "click", () => {
          mapInstance.current.panTo(marker.getPosition());
          if (infoWindowRef.current) infoWindowRef.current.close();
          infoWindowRef.current = new naver.maps.InfoWindow({
            content: `
              <div style="padding:10px;max-width:230px;">
                <div style="font-weight:bold;font-size:16px;">${shelter.name || "쉼터 이름"}</div>
                <div style="font-size:13px;margin:4px 0;">📍 ${shelter.addr || shelter.address || "주소 없음"}</div>
                <button id="open-detail-btn" style="margin-top:8px;padding:4px 10px;border:1px solid #1976d2;background:#1976d2;color:#fff;border-radius:6px;cursor:pointer;">
                  상세보기
                </button>
                <button id="close-infowindow-btn" style="margin-top:8px;margin-left:6px;padding:4px 10px;border:1px solid #ccc;background:#fff;border-radius:6px;cursor:pointer;">
                  닫기
                </button>
              </div>
            `,
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
              setSelectedShelter(shelter);
              infoWindowRef.current.close();
            };
          }, 100);
        });
        return marker;
      });

      // 내 위치 마커 복원 (있으면)
      if (myLocationMarkerRef.current) {
        myLocationMarkerRef.current.setMap(mapInstance.current);
      }
    }

    // cleanup
    return () => {
      clearMarkers();
      if (infoWindowRef.current) infoWindowRef.current.close();
    };
  }, [mapShelters, selectedTypes, isMapReady]);

  // 5. **마커 삭제**
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker && marker.setMap(null));
    markersRef.current = [];
  };

  // 6. **내 위치 찍기**
  const renderCurrentLocationMarker = () => {
    if (!mapInstance.current) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const myLocation = new naver.maps.LatLng(lat, lng);
        if (myLocationMarkerRef.current) {
          myLocationMarkerRef.current.setPosition(myLocation);
        } else {
          myLocationMarkerRef.current = new naver.maps.Marker({
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
            }
          });
        }
        mapInstance.current.setCenter(myLocation);
      },
      (err) => console.error("위치 허용 실패:", err)
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
        onClick={renderCurrentLocationMarker}
      >
        <MyLocationIcon />
      </Button>

      {selectedShelter && (
        <ShelterDetail
          shelter={selectedShelter}
          onClose={() => setSelectedShelter(null)}
        />
      )}
    </div>
  );
};

export default MapContainer;
