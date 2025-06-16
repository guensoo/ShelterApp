import { useEffect } from "react";
import markerColors from "./markerColors";

// props: map, shelter 객체 { lat, lng, type, name }, onClick 등
const ShelterMarker = ({ map, shelter, onClick }) => {
  useEffect(() => {
    if (!map || !window.naver) return;

    const { lat, lng, type, name } = shelter;

    const markerColor = markerColors[type] || markerColors.DEFAULT;

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
          " title="${name}"></div>
        `,
        size: new window.naver.maps.Size(16, 16),
        anchor: new window.naver.maps.Point(8, 8),
      },
    });

    // 클릭 이벤트 등록
    if (onClick) {
      window.naver.maps.Event.addListener(marker, "click", () => onClick(shelter));
    }

    // cleanup
    return () => {
      marker.setMap(null);
    };
  }, [map, shelter, onClick]);

  return null;
};

export default ShelterMarker;
