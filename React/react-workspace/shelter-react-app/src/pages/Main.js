import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import NavbarFilter from '../component/NavbarFilter';
import MapContainer from '../component/MapContainer';
import { fetchShelters } from '../api/ShelterApi';

const MainPage = () => {
  const [filter, setFilter] = useState('ALL');
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    fetchShelters(filter).then(setShelters);
  }, [filter]);

  return (
    <>
      <Navbar />
      <MapContainer shelters={shelters} />
      <NavbarFilter selected={filter} onChange={setFilter} />
    </>
  );
};

export default MainPage;
