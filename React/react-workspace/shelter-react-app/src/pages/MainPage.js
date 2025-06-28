import { useContext, useEffect, useState } from "react";
import MapContainer from "../components/Map/MapContainer";
import ShelterDetail from "../components/Map/ShelterDetail";
import { ShelterFilterContext } from "../context/ShelterFilterContext";
import {
  fetchColdShelters,
  fetchHeatShelters,
  fetchChemicalShelters,
  fetchCivilDefenseShelters,
  fetchEarthquakeShelters,
} from '../api/shelter';

const MainPage = () => {
  const { selectedTypes, searchKeyword } = useContext(ShelterFilterContext);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [allShelters, setAllShelters] = useState({
    HEAT: [],
    COLD: [],
    CHEMICAL: [],
    CIVIL_DEFENSE: [],
    EARTHQUAKE_TSUNAMI: [],
  });

  useEffect(() => {
    const fetchAll = async () => {
      const [heat, cold, chemical, civil, earthquake] = await Promise.all([
        fetchHeatShelters(),
        fetchColdShelters(),
        fetchChemicalShelters(),
        fetchCivilDefenseShelters(),
        fetchEarthquakeShelters(),
      ]);
      setAllShelters({
        HEAT: heat,
        COLD: cold,
        CHEMICAL: chemical,
        CIVIL_DEFENSE: civil,
        EARTHQUAKE_TSUNAMI: earthquake,
      });
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (!selectedTypes || selectedTypes.length === 0) {
      setFilteredShelters([]);
      return;
    }

    let result;

    if (selectedTypes.includes("ALL")) {
      result = Object.values(allShelters).flat();
    } else {
      result = selectedTypes.map((type) => allShelters[type] || []).flat();
    }

    if (searchKeyword) {
      result = result.filter((shelter) =>
        shelter.name?.includes(searchKeyword)
      );
    }

    setFilteredShelters(result);
  }, [selectedTypes, searchKeyword, allShelters]);

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
