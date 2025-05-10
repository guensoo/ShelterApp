import { useEffect, useState } from "react";

export const MapContainer = () => {
  const [map, setMap] = useState(null);
  const [markerData, setMarkerData] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6232f093e6039351f3fde5efcdcd97c9&autoload=false&libraries=services";
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 예시
        const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
        
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
  }, []);

  const handleSearch = () => {
  if (!map) return;

  const center = map.getCenter();
  const lat = center.getLat();
  const lng = center.getLng();

  // 👉 위도, 경도로 백엔드 API 호출
  fetch(`/shelter?lat=${lat}&lng=${lng}`)
    .then(res => res.json())
    .then(data => {
      setMarkerData(data); // 마커 상태 갱신 → useEffect로 반영
    });
};

return (
  <div style={{ height: "92vh", position: "relative" }}>
    <div
      id="map"
      style={{ width: "100%", height: "92%" }}
    ></div>

    <button
      onClick={handleSearch}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: "4px",
        zIndex: 10,
        background: "white",
        padding: "6px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      이 지역에서 다시 찾기
    </button>
  </div>
);
}

export default MapContainer;
