// 📁 src/api/shelterApi.js
import axios from 'axios';

// 현재 호스트 이름 (ex: localhost, github.io 등)
const hostname = window?.location?.hostname;

// 백엔드 API 주소 분기
let backendHost = '';

if (hostname === 'localhost') {
  // 개발 환경에서 사용할 백엔드 주소
  backendHost = 'http://localhost:10000';
} else {
  // 배포 환경에서 사용할 백엔드 주소 (배포 후 실제 주소로 수정)
  backendHost = 'https://your-backend-server.com';
}

// 공통 API BASE URL로 export
export const API_BASE_URL = backendHost;

export const fetchShelters = async (area = '') => {
  const url =
    area === 'ALL' || !area
      ? `${API_BASE_URL}/shelter`
      : `${API_BASE_URL}/shelter?area=${area}`;
  const response = await axios.get(url);
  return response.data;
};
