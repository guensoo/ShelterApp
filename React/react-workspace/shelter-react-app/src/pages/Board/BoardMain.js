import { Box, Typography, Button } from "@mui/material";
import MiniTabBar from "./MiniTabBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mockPosts from "../../data/mockPosts"; // ✅ 통일된 mock 데이터 사용
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";

const BoardMain = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("free");
  const { showAlert } = useAlert();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (tabFromUrl === "notice") setActiveTab("notice");
    else setActiveTab("free");
  }, [tabFromUrl]);

  const noticePosts = mockPosts
    .filter((post) => post.isNotice)
    .sort((a, b) => b.id - a.id);

  const generalPosts = mockPosts
    .filter((post) => !post.isNotice)
    .sort((a, b) => b.id - a.id);

  const handlePostClick = (id) => navigate(`/board/${id}`);

    // 글쓰기 버튼 클릭
	const handleWriteClick = async () => {
		if (isLoading) return; // 로딩중은 대기
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
    <Box sx={{ px: 3, py: 5, maxWidth: 1000, mx: "auto", minHeight : "857px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        📌 자유게시판
      </Typography>

      <MiniTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 리스트 헤더 */}
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
              key={post.id}
              onClick={() => handlePostClick(post.id)}
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
              <Box sx={{ flex: 2, textAlign: "center" }}>{post.createdAt}</Box>
              <Box sx={{ flex: 1, textAlign: "right" }}>{post.views}</Box>
            </Box>
          ))}

        {activeTab === "free" && (
          <>
            {noticePosts.map((post) => (
              <Box
                key={post.id}
                onClick={() => handlePostClick(post.id)}
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
                <Box sx={{ flex: 2, textAlign: "center" }}>{post.createdAt}</Box>
                <Box sx={{ flex: 1, textAlign: "right" }}>{post.views}</Box>
              </Box>
            ))}

            {generalPosts.map((post) => (
              <Box
                key={post.id}
                onClick={() => handlePostClick(post.id)}
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
                <Box sx={{ flex: 2, textAlign: "center" }}>{post.createdAt}</Box>
                <Box sx={{ flex: 1, textAlign: "right" }}>{post.views}</Box>
              </Box>
            ))}
          </>
        )}
      </Box>

		{/* 글쓰기 버튼 */}
		<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
			<Button variant="contained" onClick={handleWriteClick}>
			글쓰기
			</Button>
		</Box>
    </Box>
  );
};

export default BoardMain;
