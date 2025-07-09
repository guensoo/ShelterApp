const API_BASE_URL = 'http://shelter-backend-env.eba-myyifqwh.ap-northeast-2.elasticbeanstalk.com';
// const API_BASE_URL = 'http://localhost:5000';

/**
 * 제보 등록 API
 * @param {Object} reportData - 제보 내용 (폼에서 넘긴 데이터)
 * @returns {Promise<string>} 성공 메시지
 */
export const submitReport = async (reportData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("로그인이 필요합니다.");

  const res = await fetch(`${API_BASE_URL}/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reportData),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || '제보 등록 실패');
  }

  return await res.text(); // "제보가 등록되었습니다."
};

/**
 * 관리자 제보 목록 조회 API
 * @returns {Promise<Array>} 제보 리스트
 */
export const fetchReports = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("관리자 권한이 필요합니다.");

  const res = await fetch(`${API_BASE_URL}/report/admin`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || '제보 목록 조회 실패');
  }

  return await res.json(); // 제보 리스트 반환
};

export const deleteReport = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}/report/admin/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, // ✅ 이거 꼭 있어야 함!
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.text();
};