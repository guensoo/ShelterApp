// const API_BASE_URL = 'http://shelter-backend-env.eba-myyifqwh.ap-northeast-2.elasticbeanstalk.com';
const API_BASE_URL = 'http://localhost:5000';

/**
 * 로그인 (아이디 = username)
 */
export const loginUser = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.json(); // { token: "..." }
};

/**
 * 회원가입 (email, username, nickname, password)
 * @param {Object} userData - { email, username, nickname, password }
 */
export const signupUser = async ({ email, username, nickname, password }) => {
  const res = await fetch(`${API_BASE_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, nickname, password }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.text(); // 회원가입 성공 메시지
};

/**
 * 내 정보 조회
 */
export const fetchMe = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.json(); // UserDTO 반환
};