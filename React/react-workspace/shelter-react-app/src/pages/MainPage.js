import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MapContainer from "../components/Map/MapContainer";

const DUMMY_SHELTERS = [
  { id: 1, name: "화학재난 대피소", type: "CHEMICAL", lat: 37.567, lng: 126.978 },
  { id: 2, name: "민방위 대피소(전쟁)", type: "CIVIL_DEFENSE", lat: 37.565, lng: 126.976 },
  { id: 3, name: "지진/해일 대피소", type: "EARTHQUAKE_TSUNAMI", lat: 37.563, lng: 126.980 },
  { id: 4, name: "무더위 쉼터", type: "HEAT", lat: 37.561, lng: 126.979 },
  { id: 5, name: "한파 쉼터", type: "COLD", lat: 37.559, lng: 126.977 },
];

const MainPage = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  // 실제 filter 예시 (모든 타입 표시)
  const filteredShelters = (DUMMY_SHELTERS || []).filter(() => true);

  return (
    <>
      <Header
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <MapContainer shelters={filteredShelters} />
    </>
  );
};

export default MainPage;
