import { API } from './common';

export const loginUser = async (username, password) => {
  try {
    const res = await API.post('/user/login', { username, password });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '로그인 실패';
  }
};

export const signupUser = async ({ email, username, nickname, password }) => {
  try {
    const res = await API.post('/user/signup', { email, username, nickname, password });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '회원가입 실패';
  }
};

export const fetchMe = async () => {
  try {
    const res = await API.get('/user/me');
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '내 정보 조회 실패';
  }
};

export const fetchFavoriteShelters = async (userId) => {
  try {
    const res = await API.get(`/user/favorite/list?userId=${userId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '즐겨찾기 조회 실패';
  }
};

export const deleteUser = async () => {
  try {
    const res = await API.delete('/user/delete');
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '회원탈퇴 실패';
  }
};

export const findUserId = async (email) => {
  try {
    const res = await API.post('/user/find-id', { email });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '아이디 찾기 실패';
  }
};

export const sendResetLink = async (username, email) => {
  try {
    const res = await API.post('/user/send-reset-link', { username, email });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '비밀번호 재설정 링크 발송 실패';
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const res = await API.post('/user/reset-password', { token, newPassword });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '비밀번호 재설정 실패';
  }
};

export const fetchScrapPosts = async (username) => {
  try {
    const res = await API.get(`/user/scraps?userId=${username}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '스크랩 조회 실패';
  }
};

export const addScrapPost = async (boardId) => {
  try {
    const res = await API.post('/user/scraps', { boardId });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '스크랩 추가 실패';
  }
};

export const removeScrapPost = async (boardId) => {
  try {
    const res = await API.delete('/user/scraps', { data: { boardId } });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '스크랩 삭제 실패';
  }
};
