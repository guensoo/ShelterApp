// const API_BASE_URL = 'http://shelter-backend-env.eba-myyifqwh.ap-northeast-2.elasticbeanstalk.com';
const API_BASE_URL = 'http://localhost:5000';

/**
 * 게시글 전체 조회
 */
export const fetchBoardList = async () => {
  const res = await fetch(`${API_BASE_URL}/board`);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || '게시글 목록 조회 실패');
  }

  return await res.json(); // List<BoardResponseDTO>
};

/**
 * 게시글 상세 조회
 */
export const fetchBoardDetail = async (postNo) => {
  const token = localStorage.getItem('token');
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${API_BASE_URL}/board/${postNo}`, );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || '게시글 상세 조회 실패');
  }

  return await res.json();
};

/**
 * 게시글 작성
 */
export const createBoard = async (postData) => {
  const token = localStorage.getItem('token');
  console.log("🔥 [DEBUG] token =", token);
  if (!token) throw new Error("로그인이 필요합니다.");

  const res = await fetch(`${API_BASE_URL}/board/write`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // 로그인한 사용자 정보 포함
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || '게시글 작성 실패');
  }

  return await res.json(); // 작성된 게시글 DTO 반환
};

export const fetchBoardEdit = async (postNo) => {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${API_BASE_URL}/board/${postNo}`, {
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || '게시글 상세 조회 실패');
  }

  return await res.json();
};