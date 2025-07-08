import { Box, Typography, Button } from "@mui/material";
import MiniTabBar from "./MiniTabBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";
import { fetchBoardList } from "../../api/board";

const BoardMain = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("free");
  const { showAlert } = useAlert();
  const { isLoggedIn, isLoading } = useAuth();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (tabFromUrl === "notice") setActiveTab("notice");
    else setActiveTab("free");
  }, [tabFromUrl]);

  // 게시글 불러오기

  useEffect(() => {
    fetchBoardList()
      .then(setPosts)
      .catch((err) => {
        console.error("게시글 불러오기 실패", err);
      });
  }, []);

  const noticePosts = posts.filter((post) => post.notice);
  const generalPosts = posts.filter((post) => !post.notice);

  const handlePostClick = (postNo) => navigate(`/board/${postNo}`);

  const handleWriteClick = async () => {
    if (isLoading) return;
    if (!isLoggedIn) {
      await showAlert({
        title: "로그인이 필요합니다.",
        text: "로그인 후 이용해 주세요.",
        icon: "warning",
      });
      navigate("/login");
      return;
    }
    navigate("/board/write");
  };

  return (
    <Box sx={{ px: 3, py: 5, maxWidth: 1000, mx: "auto", minHeight: "857px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        📌 자유게시판
      </Typography>

      <MiniTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          borderBottom: "2px solid #555",
          px: 2,
          py: 1,
          mt: 3,
        }}
      >
        <Box sx={{ flex: 3 }}>제목</Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>작성자</Box>
        <Box sx={{ flex: 2, textAlign: "center" }}>작성일</Box>
        <Box sx={{ flex: 1, textAlign: "right" }}>조회수</Box>
      </Box>

      {/* 게시글 리스트 */}
      <Box>
        {activeTab === "notice" &&
          noticePosts.map((post) => (
            <Box
              key={post.postNo}
              onClick={() => handlePostClick(post.postNo)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                py: 1,
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <Box sx={{ flex: 3, fontWeight: "bold", color: "#1976d2" }}>
                📣 {post.title}
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>{post.author}</Box>
              <Box sx={{ flex: 2, textAlign: "center" }}>{post.createdAt?.split("T")[0]}</Box>
              <Box sx={{ flex: 1, textAlign: "right" }}>{post.viewCount}</Box>
            </Box>
          ))}

        {activeTab === "free" && (
          <>
            {noticePosts.map((post) => (
              <Box
                key={post.postNo}
                onClick={() => handlePostClick(post.postNo)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  borderBottom: "1px solid #ccc",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <Box sx={{ flex: 3, fontWeight: "bold", color: "#1976d2" }}>
                  📣 {post.title}
                </Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>{post.author}</Box>
                <Box sx={{ flex: 2, textAlign: "center" }}>{post.createdAt?.split("T")[0]}</Box>
                <Box sx={{ flex: 1, textAlign: "right" }}>{post.viewCount}</Box>
              </Box>
            ))}

            {generalPosts.map((post) => (
              <Box
                key={post.postNo}
                onClick={() => handlePostClick(post.postNo)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#fafafa" },
                }}
              >
                <Box sx={{ flex: 3 }}>📝 {post.title}</Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>{post.author}</Box>
                <Box sx={{ flex: 2, textAlign: "center" }}>{post.createdAt?.split("T")[0]}</Box>
                <Box sx={{ flex: 1, textAlign: "right" }}>{post.viewCount}</Box>
              </Box>
            ))}
          </>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button variant="contained" onClick={handleWriteClick}>
          글쓰기
        </Button>
      </Box>
    </Box>
  );
};

export default BoardMain;
