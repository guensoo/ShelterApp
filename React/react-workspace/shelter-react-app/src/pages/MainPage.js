import { useContext, useEffect, useState } from "react";
import MapContainer from "../components/Map/MapContainer";
import ShelterDetail from "../components/Map/ShelterDetail";
import { ShelterFilterContext } from "../context/ShelterFilterContext";
import HEAT from "../data/DUMMY_HEAT_SHELTERS";
import COLD from "../data/DUMMY_COLD_SHELTERS";
import CHEMICAL from "../data/DUMMY_CHEMICAL_SHELTERS";
import CIVIL_DEFENSE from "../data/DUMMY_CIVIL_DEFENSE_SHELTERS";
import EARTHQUAKE_TSUNAMI from "../data/DUMMY_EARTHQUAKE_TSUNAMI_SHELTERS";

const ALL_SHELTERS = {
  HEAT,
  COLD,
  CHEMICAL,
  CIVIL_DEFENSE,
  EARTHQUAKE_TSUNAMI,
};

const MainPage = () => {
  const { selectedTypes, searchKeyword } = useContext(ShelterFilterContext); // ✅ 전역 필터 불러오기
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState(null);

  useEffect(() => {
    if (!selectedTypes || selectedTypes.length === 0) {
      setFilteredShelters([]);
      return;
    }

    let result;

    if (selectedTypes.includes("ALL")) {
      // 전체 선택 시 모든 마커
      result = Object.values(ALL_SHELTERS).flat();
    } else {
      result = selectedTypes
        .map((type) => ALL_SHELTERS[type] || [])
        .flat();
    }

    // 🔍 키워드까지 필터링
    if (searchKeyword) {
      result = result.filter((shelter) =>
        shelter.name.includes(searchKeyword)
      );
    }

    setFilteredShelters(result);
  }, [selectedTypes, searchKeyword]);

  return (
    <div style={{ position: "relative", width: "100%", height: "90vh" }}>
      <MapContainer
        shelters={filteredShelters}
        keyword={searchKeyword}
        onSelectShelter={setSelectedShelter}
      />
      {selectedShelter && (
        <ShelterDetail
          shelter={selectedShelter}
          onClose={() => setSelectedShelter(null)}
        />
      )}
    </div>
  );
};

export default MainPage;
