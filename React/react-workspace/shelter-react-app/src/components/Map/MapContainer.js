import { useEffect, useRef, useState } from "react";
import markerColors from "./markerColors"; // 색상 정의

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.9780 };

const MapContainer = ({ shelters = [], onSelectShelter, keyword }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [markers, setMarkers] = useState([]);
  const infoWindowRef = useRef(null);

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
    window.naver.maps.Event.addListener(mapInstance.current, "click", () => {
      if (infoWindowRef.current) infoWindowRef.current.close();
    });
  };

  const addShelterMarkers = (shelterList) => {
    clearMarkers();
    const newMarkers = shelterList.map((shelter) => {
      if (!shelter.lat || !shelter.lng) return null;

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(shelter.lat, shelter.lng),
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
          size: new window.naver.maps.Size(16, 16),
          anchor: new window.naver.maps.Point(8, 8),
        },
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        mapInstance.current.panTo(new window.naver.maps.LatLng(shelter.lat, shelter.lng));
        if (infoWindowRef.current) infoWindowRef.current.close();

        infoWindowRef.current = new window.naver.maps.InfoWindow({
          content: getInfoWindowContent(shelter),
          disableAnchor: false,
          pixelOffset: new window.naver.maps.Point(0, -10),
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
    }).filter(Boolean);
    setMarkers(newMarkers);
  };

  useEffect(() => {
    if (!window.naver || !window.naver.maps || !mapRef.current) return;

    const initializeMap = (lat, lng) => {
      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: 13,
      });

      addShelterMarkers(shelters);
      addMapClickCloseEvent();
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => initializeMap(pos.coords.latitude, pos.coords.longitude),
        () => initializeMap(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng)
      );
    } else {
      initializeMap(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!window.naver || !window.naver.maps || !mapInstance.current || !keyword) return;

    const geocoder = new window.naver.maps.services.Geocoder();

    geocoder.addressSearch(keyword, (result, status) => {
      if (status === window.naver.maps.services.Status.OK && result.length > 0) {
        const { y, x } = result[0];
        const latlng = new window.naver.maps.LatLng(y, x);
        mapInstance.current.setCenter(latlng);
        mapInstance.current.setZoom(16);
      } else {
        console.warn("❌ 지오코딩 실패:", status, result);
      }
    });
  }, [keyword]);

  useEffect(() => {
    if (!window.naver || !window.naver.maps || !mapInstance.current) return;

    markers.forEach(marker => marker.setMap(null));

    const newMarkers = shelters.map((shelter) => {
      if (!shelter.lat || !shelter.lng) return null;

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(shelter.lat, shelter.lng),
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
          size: new window.naver.maps.Size(16, 16),
          anchor: new window.naver.maps.Point(8, 8),
        },
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        mapInstance.current.panTo(new window.naver.maps.LatLng(shelter.lat, shelter.lng));
        if (infoWindowRef.current) infoWindowRef.current.close();

        infoWindowRef.current = new window.naver.maps.InfoWindow({
          content: getInfoWindowContent(shelter),
          disableAnchor: false,
          pixelOffset: new window.naver.maps.Point(0, -10),
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
    }).filter(Boolean);

    setMarkers(newMarkers);

    window.naver.maps.Event.addListener(mapInstance.current, "click", () => {
      if (infoWindowRef.current) infoWindowRef.current.close();
    });
    // eslint-disable-next-line
  }, [shelters]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        ref={mapRef}
        id="map"
        style={{ width: "100%", height: "90vh", minHeight: 400 }}
      />
    </div>
  );
};

export default MapContainer;