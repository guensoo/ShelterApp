import { Box, Typography, Paper, Button, Divider, IconButton, Tooltip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState, useEffect } from 'react';
import { useAlert } from '../../context/AlertContext';
import { fetchBoardDetail } from '../../api/board'; // API 함수 import

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // 댓글도 API 연동 필요하면 여기에 set
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👍 추천(좋아요) state
  const [like, setLike] = useState(0);
  // ⭐ 스크랩 state
  const [scrapped, setScrapped] = useState(false);
  // 👤 로그인 유저 (localStorage에서 가져옴)
  const [loginUser, setLoginUser] = useState(null);

  // swal2 컴포넌트
  const { showAlert, showToast } = useAlert();

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

  // 마운트 시 로그인/스크랩 상태 체크 및 게시글 데이터 호출
  useEffect(() => {
    setLoginUser(getLoginUser());

    const scrapList = getScrapList();
    setScrapped(scrapList.includes(postId));

    setLoading(true);
    fetchBoardDetail(postId)
      .then((data) => {
        setPost(data);
        setLike(data.likeCount ?? 0);
        // TODO: 댓글 API 호출 후 setComments(data.comments)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "게시글을 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <Typography>로딩중...</Typography>;
  if (error)
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6">❌ {error}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/board")}>
          목록으로
        </Button>
      </Box>
    );

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

  // 추천(좋아요) 클릭
  const handleLike = async () => {
    if (!loginUser) {
      await showAlert({ title: "로그인이 필요합니다", icon: "warning" });
      return;
    }
    const likedPosts = getLikedPosts(loginUser.userNickName);
    if (likedPosts.includes(postId)) {
      await showAlert({ title: "이미 추천하셨습니다.", icon: "info" });
      return;
    }
    setLike((prev) => prev + 1);
    likedPosts.push(postId);
    setLikedPosts(loginUser.userNickName, likedPosts);
    await showToast({ title: "추천 완료!", icon: "success" });
    // TODO: 서버에 추천 PATCH 요청 연동 필요
  };

  // 스크랩 클릭
  const handleScrap = async () => {
    if (!loginUser) {
      await showAlert({ title: "로그인이 필요합니다", icon: "warning" });
      return;
    }
    let scrapList = getScrapList();
    if (scrapped) {
      scrapList = scrapList.filter((pid) => pid !== postId);
      setScrapped(false);
      await showToast({ title: "스크랩이 취소되었습니다", icon: "info" });
    } else {
      scrapList.push(postId);
      setScrapped(true);
      await showToast({ title: "스크랩 되었습니다!", icon: "success" });
    }
    localStorage.setItem("scrapPosts", JSON.stringify(scrapList));
    // TODO: 서버에 스크랩 상태 PATCH 요청 연동 필요
  };

  // 신고 클릭 (목업)
  const handleReport = async () => {
    if (!loginUser) {
      await showAlert({ title: "로그인이 필요합니다", icon: "warning" });
      return;
    }
    await showAlert({ title: "🚨 신고가 접수되었습니다.", icon: "success" });
    // TODO: 서버에 신고 API 연동 필요
  };

  const handleDelete = async () => {
    const result = await showAlert({
      title: "정말 삭제하시겠습니까?",
      text: "삭제한 글은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네, 삭제합니다",
      cancelButtonText: "아니오"
    });
    if (result.isConfirmed) {
      await showToast({ title: "🗑️ 삭제 완료!", icon: "success" });
      navigate("/board");
      // TODO: 서버에 삭제 API 요청 연동 필요
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
            px: 1,
            fontWeight: 700,
            fontSize: 22
          }}
        >
          <span>{post.title}</span>
          <span style={{ fontWeight: 400, fontSize: 15, color: "#888" }}>
            {post.createdAt?.slice(0, 10)}
          </span>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 2,
            px: 1,
            fontSize: 15,
            color: "#444"
          }}
        >
          <span>작성자: <b>{post.username}</b></span>
          <span>| 추천: <b>{like}</b></span>
          <span>| 조회수: <b>{post.viewCount ?? 0}</b></span>
        </Box>

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
          <Button variant="outlined" onClick={() => navigate("/board")}>
            목록
          </Button>

          {(loginUser && (
            loginUser.username === post.username ||
            loginUser.userId === 'admin' || // AuthContext 구조에 따라 다르게 세팅
            loginUser.role === 'ADMIN'
          )) && (
              <>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/board/edit/${postId}`)}
                >
                  수정
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </>
            )}
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
              <Typography variant="subtitle2">{c.username} · {c.createdAt}</Typography>
              <Typography variant="body1">{c.content}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default BoardDetail;
