import { useEffect, useRef } from "react";

const MapContainer = ({ shelters = [], onSelectShelter }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

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
          // 🟡 부모에게 선택된 쉼터 전달
          onSelectShelter?.(shelter);

          // 🟡 해당 위치로 pan
          mapInstance.current.panTo(
            new window.naver.maps.LatLng(shelter.lat, shelter.lng)
          );
        });
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (!mapInstance.current) {
            initializeMap(latitude, longitude);
          }
        },
        () => {
          console.warn("❌ 위치 권한 없음, 기본 위치");
          initializeMap(37.5665, 126.9780);
        }
      );
    } else {
      console.warn("❌ geolocation 미지원, 기본 위치");
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
