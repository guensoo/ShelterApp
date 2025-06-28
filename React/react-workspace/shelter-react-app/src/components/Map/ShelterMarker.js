import { useEffect } from "react";
import markerColors from "./markerColors";

/**
 * Naver Map용 ShelterMarker 컴포넌트
 * @param {object} props
 *   - map: 네이버맵 인스턴스
 *   - shelter: { lat, lng, type, name, ... }
 *   - onClick: 클릭 시 실행 함수
 */
const ShelterMarker = ({ map, shelter, onClick }) => {
  useEffect(() => {
    if (!map || !window.naver) return;

    // 위도/경도 숫자 변환 (혹시 모를 string 방지)
    const lat = Number(shelter.lat);
    const lng = Number(shelter.lng);
    if (isNaN(lat) || isNaN(lng)) return;

    // 마커 생성
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map,
      icon: {
        content: `
          <div style="
            width: 16px;
            height: 16px;
            background-color: ${markerColors[shelter.type] || markerColors.DEFAULT};
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 2px rgba(0,0,0,0.3);
          " title="${shelter.name || ""}"></div>
        `,
        size: new window.naver.maps.Size(16, 16),
        anchor: new window.naver.maps.Point(8, 8),
      },
    });

    // 클릭 이벤트 등록 및 해제 (메모리릭 방지)
    let listener = null;
    if (onClick) {
      listener = window.naver.maps.Event.addListener(marker, "click", () => onClick(shelter));
    }

    // cleanup
    return () => {
      if (listener) window.naver.maps.Event.removeListener(listener);
      marker.setMap(null);
    };
  }, [map, shelter, onClick]);

  return null;
};

export default ShelterMarker;
