import axios from 'axios';

const hostname = window?.location?.hostname;

let backendHost = '';
if (hostname === 'localhost') {
  backendHost = 'http://localhost:10000'; // 로컬 개발용
} else {
  backendHost = 'https://api.shelter.io.kr'; // 배포용 도메인 (서브도메인 권장)
}

export const API = axios.create({
  baseURL: backendHost,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
