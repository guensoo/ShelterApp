// src/api/ShelterApi.js 파일 수정
import axios from 'axios';

const hostname = window?.location?.hostname;

let backendHost = '';
if (hostname === 'localhost') {
  backendHost = 'http://localhost:10000';
} else {
  backendHost = 'https://your-backend-server.com';
}

export const API_BASE_URL = backendHost;

// 전체 쉼터 데이터를 가져오는 함수 (주로 일반 'shelter' 테이블에서)
export const fetchAllShelters = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/shelter`);
    return res.data;
  } catch (error) {
    console.error('❌ All Shelters fetch error:', error);
    return [];
  }
};

// 한파 쉼터 데이터를 가져오는 함수 (cold_shelter 테이블에서)
export const fetchColdShelters = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/cold-shelter/fetch`);
    // 백엔드에서 type 필드를 제공하지 않는다면, 여기서 추가해줄 수 있습니다.
    return res.data.map(d => ({ ...d, type: 'COLD' }));
  } catch (error) {
    console.error('❌ Cold Shelters fetch error:', error);
    return [];
  }
};

// 무더위 쉼터 데이터를 가져오는 함수 (만약 별도 API가 있다면 추가)
// export const fetchHeatShelters = async () => {
//   try {
//     const res = await axios.get(`${API_BASE_URL}/api/heat-shelter/fetch`);
//     return res.data.map(d => ({ ...d, type: 'HEAT' }));
//   } catch (error) {
//     console.error('❌ Heat Shelters fetch error:', error);
//     return [];
//   }
// };

export const saveColdShelters = async (coldShelterList) => {
  console.log("📤 coldShelterList 내용:", coldShelterList);
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/cold-shelter/save`,
      coldShelterList,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('✅ 한파쉼터 저장 완료:', res.data);
  } catch (err) {
    console.error('❌ 한파쉼터 저장 실패:', err);
  }
};