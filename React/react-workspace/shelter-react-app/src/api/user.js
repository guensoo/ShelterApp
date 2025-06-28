// api/user.js

export const loginUser = async (username, password) => {
  const res = await fetch('http://localhost:10000/user/login', {
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

export const signupUser = async (userData) => {
  const res = await fetch('http://localhost:10000/user/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.text(); // 회원가입 완료 메시지
};

export const fetchMe = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:10000/user/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.json(); // UserDTO 반환
};
