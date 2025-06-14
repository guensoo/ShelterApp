import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Button, Box, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import SidebarFilter from "../layout/SidebarFilter";

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* 좌측: 햄버거+로고 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1, 
              height : "5px",
          }}>
            <IconButton edge="start" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <img
              src="/shelter_logo.png"
              alt="쉼:터"
              style={{
                height: 80,         // 이미지 높이 키움
                width: "100px",      // 가로 자동 비율
                marginLeft: 8,
                marginRight: 8,
                cursor: "pointer",  // 커서 포인터
              }}
              onClick={() => navigate("/")}
            />
            <span style={{ fontWeight: "bold", fontSize: 24, color: "#2196f3", marginLeft: 4 }}>
            </span>
          </Box>
          {/* 중앙: 제보/검색/자유게시판 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button color="primary" onClick={() => navigate("/report")}>제보합니다</Button>
            <Box sx={{ minWidth: 240, maxWidth: 360 }}>
              <SearchBar onSearch={() => {}} />
            </Box>
            <Button color="primary" onClick={() => navigate("/board")}>자유게시판</Button>
          </Box>
          {/* 우측: 로그인/회원가입 */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="primary" onClick={() => navigate("/login")}>로그인</Button>
            <Button color="primary" onClick={() => navigate("/signup")}>회원가입</Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Drawer에 SidebarFilter 넣음 */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, p: 2 }}>
          <SidebarFilter selected={"ALL"} onChange={() => {}} />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => setDrawerOpen(false)}>
            닫기
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
