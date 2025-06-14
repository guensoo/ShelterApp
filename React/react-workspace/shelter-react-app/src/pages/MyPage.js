import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const MyPage = () => {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  if (!loginUser) {
    alert("로그인 정보가 없습니다.");
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    // 1. (실전에서는 여기서 localStorage/쿠키/JWT 등 삭제!)
    // 2. 알림
    alert("로그아웃되었습니다.");
    // 3. 메인으로 이동
    navigate("/");
  };

  const handlePoint = () => {
    // 1. (실전에서는 여기서 localStorage/쿠키/JWT 등 삭제!)
    alert("포인트 상점으로 이동");
    // 포인트상점으로 이동
    navigate("/");
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width : '100%',
      maxWidth : '100vw',
      overflowX : 'hidden',
      bgcolor: "#f3f6fa",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      pt: 8
    }}>
      <Card sx={{
        width: "100%",
        maxWidth: 420,
        width: "100%",
        borderRadius: 4,
        boxShadow: 6,
        p: 3,
        background: "#fff"
      }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#2196f3", mb: 2 }}>
            마이페이지
          </Typography>
          <Typography sx={{ fontSize: 18, mb: 2 }}>닉네임: <b>{loginUser.userNickName}</b></Typography>
          <Typography sx={{ fontSize: 18, mb: 2 }}>포인트: <b>{loginUser.point} P</b></Typography>
          {/* 내 제보 내역 등 */}
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}
            onClick={handlePoint}
          >
            포인트 상점으로 이동
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyPage;
