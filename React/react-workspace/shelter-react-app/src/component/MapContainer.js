import React, { useEffect } from 'react';

const MapContainer = ({ shelters }) => {
  useEffect(() => {
    console.log("shelters 데이터:", shelters);

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6232f093e6039351f3fde5efcdcd97c9&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) {
          console.error("❌ #map DOM이 존재하지 않습니다.");
          return;
        }

        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 7,
        };
        const map = new window.kakao.maps.Map(container, options);

        shelters.forEach(shelter => {
          if (!shelter.lat || !shelter.lng) return;

          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(shelter.lat, shelter.lng),
          });

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${shelter.name}</div>`,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker);
          });
        });
      });
    };
  }, [shelters]);

  return <div id="map" style={{ width: '100%', height: '85vh' }}></div>;
};

export default MapContainer;
