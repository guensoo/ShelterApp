import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import NavbarFilter from '../component/NavbarFilter';
import MapContainer from '../component/MapContainer';
import { fetchShelters } from '../api/ShelterApi';
import { CircularProgress, Box, Typography } from '@mui/material';

const MainPage = () => {
  const [filter, setFilter] = useState('ALL');
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    fetchShelters(filter)
    .then(setShelters)
    .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div>
      <Navbar />
      {loading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>쉼터 정보를 불러오는 중...</Typography>
      </Box>
    ) : (
      <MapContainer shelters={shelters} />
    )}
      <NavbarFilter selected={filter} onChange={setFilter} />
    </div>
  );
};

export default MainPage;
