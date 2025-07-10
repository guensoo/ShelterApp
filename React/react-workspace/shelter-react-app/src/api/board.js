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
    const res = await API.get(`/board/${postNo}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '게시글 상세 조회 실패';
  }
};

// 게시글 작성
export const createBoard = async (postData) => {
  try {
    const res = await API.post('/board/write', postData);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '게시글 작성 실패';
  }
};

// 게시글 수정 상세 조회 (수정 페이지 진입 시)
export const fetchBoardEdit = async (postNo) => {
  try {
    const res = await API.get(`/board/${postNo}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message || '게시글 수정 조회 실패';
  }
};

// 추천 상태 가져오기
export const getLikedStatus = async (boardId) => {
  try {
    const res = await API.get(`/board/${boardId}/liked`);
    return res.data.liked;
  } catch (err) {
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
    throw err.response?.data?.message || err.message || '신고 실패';
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
