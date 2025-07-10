import axios from 'axios';

const hostname = window?.location?.hostname;

let backendHost = '';
if (hostname === 'localhost') {
  backendHost = 'http://localhost:5000'; // 로컬 개발용
} else {
  backendHost = 'http://52.79.236.75:5000'; // 운영 EC2 백엔드 주소
}

export const API = axios.create({
  baseURL: backendHost,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 토큰이 필요 없는 엔드포인트 목록
const noAuthPaths = [
  '/user/login',
  '/user/signup',
  '/user/find-id',
  '/user/send-reset-link',
  '/user/reset-password',
  '/shelters',
  '/board'
];

// board/{id}, shelters/**는 startsWith로 처리!
API.interceptors.request.use(config => {
  const noAuth = noAuthPaths.some(path =>
    config.url === path || config.url.startsWith(path + '/')
  );
  if (!noAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
