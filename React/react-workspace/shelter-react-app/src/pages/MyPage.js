import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from "@mui/material";
import { useFavorite } from "../context/FavoriteContext";
import mockPosts from "../data/mockPosts";
import DUMMY_HEAT_SHELTERS from "../data/DUMMY_HEAT_SHELTERS";
import DUMMY_COLD_SHELTERS from "../data/DUMMY_COLD_SHELTERS";
import DUMMY_CHEMICAL_SHELTERS from "../data/DUMMY_CHEMICAL_SHELTERS";
import DUMMY_CIVIL_DEFENSE_SHELTERS from "../data/DUMMY_CIVIL_DEFENSE_SHELTERS";
import DUMMY_EARTHQUAKE_TSUNAMI_SHELTERS from "../data/DUMMY_EARTHQUAKE_TSUNAMI_SHELTERS";

const allShelters = [
  ...DUMMY_HEAT_SHELTERS,
  ...DUMMY_COLD_SHELTERS,
  ...DUMMY_CHEMICAL_SHELTERS,
  ...DUMMY_CIVIL_DEFENSE_SHELTERS,
  ...DUMMY_EARTHQUAKE_TSUNAMI_SHELTERS,
];

const MyPage = () => {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const { favorites } = useFavorite();
  const [favoriteShelterIds, setFavoriteShelterIds] = useState([]);

  // [스크랩한 게시글 id 배열]
  const [scrapPostIds, setScrapPostIds] = useState([]);

  useEffect(() => {
    if (!loginUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setScrapPostIds(JSON.parse(localStorage.getItem("scrapPosts") || "[]"));
  }, [navigate]);

  useEffect(() => {
    setFavoriteShelterIds(JSON.parse(localStorage.getItem("favoriteShelters") || "[]"));
  }, []);

  if (!loginUser) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
        pt: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: 500,
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          반갑습니다 {loginUser.userNickName} 님
        </Typography>
        <Typography variant="h6" sx={{ color: "gray" }}>
          보유 포인트 : {loginUser.point}P
        </Typography>
      </Box>

      {/* 즐겨찾기 쉼터 영역 */}
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 500, p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          ⭐ 즐겨찾기 쉼터 목록
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {favoriteShelterIds.length === 0 ? (
          <Typography color="text.secondary">
            아직 즐겨찾기한 쉼터가 없습니다.
          </Typography>
        ) : (
          <List>
            {favoriteShelterIds.map((sid) => {
              const shelter = allShelters.find((s) => s.id === sid);
              if (!shelter) return null;
              return (
                <Box key={shelter.id}>
                  <ListItem
                    button
                    component="a"
                    href={`https://map.naver.com/p/search/${encodeURIComponent(shelter.addr || "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ListItemText
                      primary={shelter.name || "이름 없음"}
                      secondary={shelter.addr || "주소 없음"}
                    />
                  </ListItem>
                  <Divider />
                </Box>
              );
            })}
          </List>
        )}
      </Paper>

      {/* 스크랩 게시글 영역 */}
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 500, p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          📌 스크랩 게시글 목록
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {scrapPostIds.length === 0 ? (
          <Typography color="text.secondary">
            아직 스크랩한 게시글이 없습니다.
          </Typography>
        ) : (
          <List>
            {scrapPostIds.map((postId) => {
              const post = mockPosts.find((p) => p.id === postId);
              if (!post) return null;
              return (
                 <Box key={post.id}>
                  <ListItem sx={{ cursor: "default" }}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          color="primary"
                          sx={{ cursor: "pointer", textDecoration: "underline" }}
                          onClick={() => navigate(`/board/${post.id}`)}
                        >
                          {post.title}
                        </Typography>
                      }
                      secondary={`${post.author} · ${post.createdAt}`}
                    />
                  </ListItem>
                  <Divider />
                </Box>
              );
            })}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default MyPage;
