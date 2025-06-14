import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";

const DUMMY_USER = {
  userId: "asdf1234",
  userNickName: "신조오사사게요",
  password: "asdf1234!",
  point: 1000
};

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || !pw) {
      setErrorMsg("아이디와 비밀번호를 모두 입력하세요.");
      return;
    }
    if (
      userId !== DUMMY_USER.userId ||
      pw !== DUMMY_USER.password
    ) {
      setErrorMsg("아이디 또는 비밀번호가 다릅니다.");
      return;
    }
    // 로그인 성공
    localStorage.setItem("loginUser", JSON.stringify(DUMMY_USER));
    setErrorMsg("");
    alert("로그인 성공!");
    navigate("/mypage");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f3f6fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ minWidth: 320, maxWidth: 400, width: "100%", borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" mb={2} color="primary" fontWeight="bold" textAlign="center" marginTop="10px">
            로그인
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              margin="normal"
              fullWidth
              required
              error={!!errorMsg}
            />
            <TextField
              label="비밀번호"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              margin="normal"
              fullWidth
              error={!!errorMsg}
              helperText={errorMsg && "아이디 또는 비밀번호가 다릅니다."}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}>
              로그인
            </Button>
          </form>
          <Button fullWidth color="secondary" sx={{ mt: 1 }} onClick={() => navigate("/signup")}>
            아직 회원이 아니신가요? 회원가입
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
