import { API } from './common';

// 게시글 전체 조회
export const fetchBoardList = async () => {
  try {
    const res = await API.get('/board');
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '게시글 목록 조회 실패';
  }
};

// 게시글 상세 조회
export const fetchBoardDetail = async (postNo) => {
  try {
    const res = await API.get(`/board/${postNo}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '게시글 상세 조회 실패';
  }
};

// 게시글 작성
export const createBoard = async (postData) => {
  try {
    const token = localStorage.getItem('token'); // 토큰 저장 위치에 맞게 조정
    const res = await API.post('/board/write', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '게시글 작성 실패';
  }
};

// 게시글 수정 상세 조회 (수정 페이지 진입 시)
export const fetchBoardEdit = async (postNo) => {
  try {
    const res = await API.get(`/board/${postNo}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '게시글 수정 조회 실패';
  }
};

// ✅ 게시글 수정 API
export const updateBoardPost = async (postNo, data) => {
  try {
    const res = await API.put(`/board/${postNo}`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '게시글 수정 실패';
  }
};

// 추천 상태 가져오기
export const getLikedStatus = async (boardId) => {
  const token = localStorage.getItem('token');
  if (!token) return false; // 로그인 안 했으면 추천 안한 걸로

  try {
    const res = await API.get(`/board/${boardId}/liked`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.liked;
  } catch (err) {
    // 403은 추천 안함으로 처리
    if (err.response?.status === 403) return false;
    throw err.response?.data?.message || err.message || '추천 여부 조회 실패';
  }
};

// 추천 API 호출
export const likeBoardPost = async (boardId) => {
  try {
    const res = await API.post(`/board/${boardId}/like`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '추천 실패';
  }
};

export const unlikeBoardPost = async (boardId) => {
  try {
    const res = await API.delete(`/board/${boardId}/unlike`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '추천 취소 실패';
  }
};

// 신고 API 호출
export const reportBoardPost = async ({ boardId, reason }) => {
  try {
    const res = await API.post('/api/report', { boardId, reason });
    return res.data;
  } catch (err) {
    // 전체 에러 객체를 throw (분기 처리를 위해)
    throw err;
  }
};

// 게시글 삭제
export const deleteBoardPost = async (boardId) => {
  try {
    const res = await API.delete(`/board/${boardId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '게시글 삭제 실패';
  }
};

// 파일업로드
export const uploadFileToS3 = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await API.post('/api/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '파일 업로드 실패';
  }
};

// 댓글 목록 조회 (게시글 ID로)
export const fetchComments = async (boardId) => {
  console.log("fetchComments 호출, boardId:", boardId);
  try {
    const res = await API.get(`/comments/${boardId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '댓글 목록 조회 실패';
  }
};

export const postComment = async (boardId, content) => {
  console.log("postComment 호출, boardId:", boardId, "content:", content);
  try {
    const res = await API.post(`/comments/${boardId}`, { content });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '댓글 작성 실패';
  }
};

// 댓글 수정
export const updateComment = async (commentId, content) => {
  try {
    const res = await API.put(`/comments/${commentId}`, { content });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '댓글 수정 실패';
  }
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const res = await API.delete(`/comments/${commentId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '댓글 삭제 실패';
  }
};