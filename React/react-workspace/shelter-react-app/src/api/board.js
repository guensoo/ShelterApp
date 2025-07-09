const API_BASE_URL = 'http://shelter-backend-env.eba-myyifqwh.ap-northeast-2.elasticbeanstalk.com';
// const API_BASE_URL = 'http://localhost:5000';

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

  const res = await fetch(`${API_BASE_URL}/board/${postNo}`,);

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

// 추천 상태 가져오기
export const getLikedStatus = async (boardId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/board/${boardId}/liked`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("추천 여부 조회 실패");
  const data = await res.json();
  return data.liked;
};

// 추천 API 호출
export const likeBoardPost = async (boardId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/board/${boardId}/like`, {
    method: "POST", // 또는 PATCH
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const unlikeBoardPost = async (boardId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/board/${boardId}/unlike`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw new Error('추천 취소 실패');
  }
  return await res.json();
};

// 신고 API 호출
export const reportBoardPost = async ({ boardId, reason }) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/api/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ boardId, reason }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
};

// 게시글 삭제 API
export const deleteBoardPost = async (boardId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/board/${boardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
};

// 파일업로드
export const uploadFileToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/api/files/upload`, {
    
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("파일 업로드 실패");
  return await res.text(); // 업로드된 S3 URL
};