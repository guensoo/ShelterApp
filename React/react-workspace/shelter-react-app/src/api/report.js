import { API } from './common';

// 제보 등록 API
export const submitReport = async (reportData) => {
  try {
    const res = await API.post('/report', reportData);
    return res.data; // 서버에서 메시지 반환 시
  } catch (err) {
    throw err.response?.data?.message || err.message || '제보 등록 실패';
  }
};

// 관리자 제보 목록 조회 API
export const fetchReports = async () => {
  try {
    const res = await API.get('/report/admin');
    return res.data; // 제보 리스트
  } catch (err) {
    throw err.response?.data?.message || err.message || '제보 목록 조회 실패';
  }
};

export const deleteReport = async (id) => {
  try {
    const res = await API.delete(`/report/admin/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '제보 삭제 실패';
  }
};
