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
  console.log("🔥 로딩 시작됨");

  fetchShelters(filter)
    .then(res => {
      console.log("✅ shelter 받아옴:", res.length);
      setShelters(res);
    })
    .catch(err => {
      console.error("❌ fetchShelters 에러:", err);
    })
    .finally(() => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, 1000 - elapsed); // 최소 1000ms 보장

      setTimeout(() => {
        setLoading(false);
      }, delay);
  }, [filter]);

  return (
    <div>
      <Navbar />
      {loading ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '85vh',
          backgroundColor: '#ffffff'
        }}
      >
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
