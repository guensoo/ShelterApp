import { Box, Typography, Paper, Button, Divider, IconButton, Tooltip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import mockPosts from "../../data/mockPosts";
import mockComments from "../../data/mockComments";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState, useEffect } from 'react';

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id);
  const post = mockPosts.find((p) => p.id === postId);
  const comments = mockComments[postId] || [];

  // 👍 추천(좋아요) state
  const [like, setLike] = useState(post?.like ?? 0);
  // ⭐ 스크랩 state
  const [scrapped, setScrapped] = useState(false);
  // 👤 로그인 유저 (localStorage에서 가져옴)
  const [loginUser, setLoginUser] = useState(null);

  // util
  const getLoginUser = () => {
    const userStr = localStorage.getItem("loginUser");
    return userStr ? JSON.parse(userStr) : null;
  };
  const getScrapList = () => JSON.parse(localStorage.getItem("scrapPosts") || "[]");

  const getLikedPosts = (userId) =>
  JSON.parse(localStorage.getItem(`likedPosts_${userId}`) || "[]");
const setLikedPosts = (userId, arr) =>
  localStorage.setItem(`likedPosts_${userId}`, JSON.stringify(arr));

  // 마운트 시 로그인/스크랩 상태 체크
  useEffect(() => {
    setLoginUser(getLoginUser());
    const scrapList = getScrapList();
    setScrapped(scrapList.includes(postId));
  }, [postId]);

  // 추천(좋아요) 클릭
  const handleLike = () => {
    if (!loginUser) {
      alert("로그인이 필요합니다");
      return;
    }
    const likedPosts = getLikedPosts(loginUser.userNickName);
    if (likedPosts.includes(postId)) {
      alert("이미 추천하셨습니다.");
      return;
    }
    setLike((prev) => prev + 1);
    likedPosts.push(postId);
    setLikedPosts(loginUser.userNickName, likedPosts);
    // (서버 연동시 PATCH 요청)
  };

  // 스크랩 클릭
  const handleScrap = () => {
    if (!loginUser) {
      alert("로그인이 필요합니다");
      return;
    }
    let scrapList = getScrapList();
    if (scrapped) {
      scrapList = scrapList.filter((pid) => pid !== postId);
      setScrapped(false);
    } else {
      scrapList.push(postId);
      setScrapped(true);
    }
    localStorage.setItem("scrapPosts", JSON.stringify(scrapList));
  };

  // 신고 클릭 (목업)
  const handleReport = () => {
    if (!loginUser) {
      alert("로그인이 필요합니다");
      return;
    }
    alert("🚨 신고가 접수되었습니다. (실제 신고 기능은 추후 구현)");
  };

  if (!post) {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6">❌ 존재하지 않는 게시글입니다.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/board")}>
          목록으로
        </Button>
      </Box>
    );
  }

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      alert("🗑️ 삭제 완료 (목업이므로 실제 삭제는 구현 필요)");
      navigate("/board");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>{post.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          작성자: {post.author} | {post.createdAt}
        </Typography>

        <Box sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* 중앙 정렬: 추천/스크랩/신고 */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* 👍 추천(좋아요) 버튼 */}
          <Tooltip title="추천">
            <IconButton onClick={handleLike}>
              <ThumbUpAltIcon sx={{ color: "#1976d2" }} />
              <span style={{ marginLeft: 6, fontWeight: 600 }}>{like}</span>
            </IconButton>
          </Tooltip>
          {/* ⭐ 스크랩(북마크) 버튼 */}
          <Tooltip title={scrapped ? "스크랩 취소" : "스크랩"}>
            <IconButton onClick={handleScrap}>
              {scrapped ? (
                <BookmarkIcon sx={{ color: "#ffd600" }} />
              ) : (
                <BookmarkBorderIcon sx={{ color: "#bbb" }} />
              )}
            </IconButton>
          </Tooltip>
          {/* 🚨 신고 버튼 */}
          <Tooltip title="신고">
            <IconButton onClick={handleReport}>
              <WarningAmberIcon sx={{ color: "#ff9800" }} />
              {/* 또는 <ReportProblemIcon sx={{ color: "#ff9800" }} /> */}
            </IconButton>
          </Tooltip>
        </Box>

        {/* 우측 정렬: 목록/수정/삭제 */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/board")}>목록</Button>
          <Button variant="contained" onClick={() => navigate(`/board/edit/${postId}`)}>수정</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>삭제</Button>
        </Box>
      </Paper>

      {/* 💬 댓글 영역 */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>💬 댓글</Typography>
        <Divider sx={{ mb: 2 }} />
        {comments.length === 0 ? (
          <Typography>아직 댓글이 없습니다.</Typography>
        ) : (
          comments.map((c) => (
            <Box key={c.id} sx={{ mb: 2, p: 1.5, border: "1px solid #eee", borderRadius: 1 }}>
              <Typography variant="subtitle2">{c.author} · {c.createdAt}</Typography>
              <Typography variant="body1">{c.content}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default BoardDetail;
