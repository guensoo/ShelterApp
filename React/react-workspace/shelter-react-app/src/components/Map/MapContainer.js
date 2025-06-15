import { useEffect, useRef } from "react";

const MapContainer = ({ shelters = [] }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // 지도 인스턴스 저장용

  useEffect(() => {
    if (!window.naver || !window.naver.maps || !mapRef.current) return;

    const initializeMap = (lat, lng) => {
      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: 13,
      });

      console.log("📍 지도 생성됨: ", lat, lng);

      // 마커 찍기
      shelters.forEach((shelter) => {
        if (!shelter.lat || !shelter.lng) return;

        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(shelter.lat, shelter.lng),
          map: mapInstance.current,
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          alert(`${shelter.name} 클릭!`);
        });
      });
    };

    // 위치 허용 요청
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (!mapInstance.current) {
            initializeMap(latitude, longitude);
          }
        },
        (error) => {
          console.warn("❌ 위치 권한 거부, 기본 위치로 설정됨.");
          if (!mapInstance.current) {
            initializeMap(37.5665, 126.9780); // 서울시청
          }
        }
      );
    } else {
      console.warn("❌ geolocation 지원 안 됨, 기본 위치로 설정됨.");
      initializeMap(37.5665, 126.9780);
    }
  }, [shelters]);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{ width: "100%", height: "90vh", minHeight: 400 }}
    />
  );
};

export default MapContainer;
