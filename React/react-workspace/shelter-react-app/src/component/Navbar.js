// components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, TextField, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
  axios.get(`http://localhost:10000/shelter?area=${keyword}`)
    .then(res => {
      console.log("🔥 검색 결과:", res.data);
    })
    .catch(err => {
      console.error("❌ 검색 에러:", err);
    });
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* 좌측: 로고 이미지 클릭 시 메인으로 */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="/logo.png" alt="쉼:터" style={{ height: 32, marginRight: 8 }} />
          <Typography variant="h6" fontWeight="bold">쉼:터</Typography>
        </Box>

        {/* 중앙: 검색창 */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
          label="주소나 지역 검색"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{ margin: 0 }}
        />
          <IconButton onClick={handleSearch}
          sx={{ p: '8px', marginLeft: '-4px' }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* 우측: 로그인 / 회원가입 / 즐겨찾기 */}
        <Box>
          <Button onClick={() => navigate('/login')}>로그인</Button>
          <Button onClick={() => navigate('/signup')}>회원가입</Button>
          <Button onClick={() => navigate('/favorites')}>즐겨찾기</Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
