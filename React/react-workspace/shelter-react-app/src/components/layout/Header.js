import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import SidebarFilter from "../layout/SidebarFilter";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        minHeight: "60px !important",
        px: 2,
        padding: 0,
        margin: 0,
        bgcolor: "#fafafa",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 14,
      }}
    >
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center", height: "10px",}}>
          {/* 좌측 로고 + 햄버거 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton edge="start" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <img
              src="/shelter_logo.png"
              alt="쉼:터"
              style={{
                height: "100px",
                width: "100px",
                marginLeft: 8,
                marginRight: 8,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
          </Box>

          {/* 중앙 메뉴: 제보 + 검색창 + 자유게시판 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, backgroundColor: "transparent", }}>
            <Button color="primary" onClick={() => navigate("/report")}>
              제보합니다
            </Button>

            <Box sx={{ minWidth: 240, maxWidth: 360, }}>
              <SearchBar onSearch={() => {}} />
            </Box>

            <Button color="primary" onClick={() => navigate("/board")}>
              자유게시판
            </Button>
          </Box>

          {/* 🔥 우측 조건부 렌더링 */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {isLoggedIn ? (
              <>
                <Button color="primary" onClick={() => navigate("/mypage")}>마이페이지</Button>
                <Button color="primary" onClick={handleLogout}>로그아웃</Button>
              </>
            ) : (
              <>
                <Button color="primary" onClick={() => navigate("/login")}>로그인</Button>
                <Button color="primary" onClick={() => navigate("/signup")}>회원가입</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 좌측 필터 Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, p: 2 }}>
          <SidebarFilter selected={"ALL"} onChange={() => {}} />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => setDrawerOpen(false)}>
            닫기
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
