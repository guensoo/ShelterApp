import { createContext, useState } from "react";
export const ShelterFilterContext = createContext();
export const ShelterFilterProvider = ({ children }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  return (
    <ShelterFilterContext.Provider value={{
      selectedTypes, setSelectedTypes,
      searchKeyword, setSearchKeyword
    }}>
      {children}
    </ShelterFilterContext.Provider>
  );
};
