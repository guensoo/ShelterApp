import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const MyPage = () => {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  useEffect(() => {
    if (!loginUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate, loginUser]);

  if (!loginUser) return null;

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        👋 {loginUser.userNickName}님, 환영합니다!
      </Typography>
      <Typography variant="body1">💰 보유 포인트: {loginUser.point}P</Typography>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={handleLogout}>
        로그아웃
      </Button>
    </Box>
  );
};

export default MyPage;
