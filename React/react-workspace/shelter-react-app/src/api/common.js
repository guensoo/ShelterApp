import axios from 'axios';

const hostname = window?.location?.hostname;

let backendHost = '';
if (hostname === 'localhost') {
  backendHost = 'http://localhost:5000'; // 로컬 개발용
} else {
  backendHost = 'https://shelter-alb-548777259.ap-northeast-2.elb.amazonaws.com'; // 운영 EC2 백엔드 주소
}

export const API = axios.create({
  baseURL: backendHost,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 토큰이 필요 없는 엔드포인트 목록

API.interceptors.request.use(config => {
  const path = new URL(config.url, config.baseURL).pathname;
  const noAuthExact = [
    '/user/login',
    '/user/signup',
    '/user/find-id',
    '/user/send-reset-link',
    '/user/reset-password',
    '/board'
  ];
  const noAuthPrefix = ['/shelters'];

  const isExact = noAuthExact.includes(path);
  const isPrefix = noAuthPrefix.some(prefix => path.startsWith(prefix));

  if (!isExact && !isPrefix) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

API.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
