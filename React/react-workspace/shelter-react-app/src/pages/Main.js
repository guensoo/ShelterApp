// src/pages/MainPage.js (Main.js로 가정)
import { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import NavbarFilter from '../component/NavbarFilter';
import MapContainer from '../component/MapContainer';
// 🚨 이제 fetchShelters 대신 분리된 함수들을 import 합니다.
import { fetchAllShelters, fetchColdShelters } from '../api/ShelterApi';
import { CircularProgress, Box, Typography } from '@mui/material';
// axios와 API_BASE_URL은 fetchShelters 안에서 사용되므로 여기서는 필요 없을 수 있습니다.
// import axios from 'axios'; // 삭제해도 됨
// import { API_BASE_URL } from '../api/ShelterApi'; // 삭제해도 됨

const MainPage = () => {
  const [filter, setFilter] = useState('ALL');
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("📌 현재 filter 값:", filter);
    setLoading(true);
    const start = Date.now();
    console.log("🔥 로딩 시작됨");

    const loadShelterData = async () => {
      try {
        let loadedData = [];
        if (filter === 'COLD') {
          loadedData = await fetchColdShelters(); // 👈 ColdShelters API 호출
        } else { // filter === 'ALL' 또는 'HEAT' (현재 HEAT는 shelter에서 필터링)
          loadedData = await fetchAllShelters(); // 👈 AllShelters API 호출
          // 만약 'HEAT'가 별도 API가 있다면, 여기에서 if (filter === 'HEAT') 로직 추가
          if (filter === 'HEAT') {
              loadedData = loadedData.filter(shelter => shelter.type?.toUpperCase() === 'HEAT');
          }
        }
        console.log("✅ shelter 받아옴:", loadedData.length);
        setShelters(loadedData);
      } catch (err) {
        console.error("❌ 데이터 불러오기 에러:", err);
      } finally {
        const elapsed = Date.now() - start;
        const delay = Math.max(0, 1000 - elapsed);
        setTimeout(() => {
          setLoading(false);
        }, delay);
      }
    };

    loadShelterData();

  }, [filter]); // filter 값이 바뀔 때마다 실행

  // 🚨 이 두 번째 useEffect는 더 이상 필요 없습니다. (삭제)
  // useEffect(() => {
  //   const fetchCold = async () => {
  //     const res = await axios.get(`${API_BASE_URL}/api/cold-shelter/fetch`);
  //     console.log("🔥 받아온 cold shelter:", res.data);
  //   };
  //   fetchCold();
  // }, []);

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
            backgroundColor: '#ffffff',
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