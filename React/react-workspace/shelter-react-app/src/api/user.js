const API_BASE_URL = 'http://shelter-backend-env.eba-myyifqwh.ap-northeast-2.elasticbeanstalk.com';
// const API_BASE_URL = 'http://localhost:5000';

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

export const fetchFavoriteShelters = async (userId) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}/user/favorite/list?userId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json(); // [{ shelterType: "HEAT", shelterId: 123 }, ...]
};

export const deleteUser = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}/user/delete`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.text(); // "회원탈퇴가 완료되었습니다."
};

/**
 * 아이디 찾기 (이메일로)
 */
export const findUserId = async (email) => {
  const res = await fetch(`${API_BASE_URL}/user/find-id`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  // 응답 예시: { username: "..." }
  return await res.json();
};

/**
 * 비밀번호 재설정 링크 발송 (아이디+이메일)
 */
export const sendResetLink = async (username, email) => {
  const res = await fetch(`${API_BASE_URL}/user/send-reset-link`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  // 서버에서 "비밀번호 재설정 링크를 메일로 보냈습니다..." 등의 메시지 반환
  return await res.text();
};

/**
 * 비밀번호 실제 재설정 (토큰, 새 비밀번호)
 */
export const resetPassword = async (token, newPassword) => {
  const res = await fetch(`${API_BASE_URL}/user/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.text();
};

export const fetchScrapPosts = async (username) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}/user/scraps?userId=${username}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const addScrapPost = async (boardId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/user/scraps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ boardId }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
};

export const removeScrapPost = async (boardId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/user/scraps`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ boardId }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
};