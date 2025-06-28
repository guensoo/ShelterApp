import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { useAlert } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";
import { loginUser, fetchMe } from "../api/user"; // 🔥 백엔드 연동

const LoginPage = ({ setIsLoggedIn }) => {
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !pw) {
      setErrorMsg("아이디와 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const res = await loginUser(userId, pw);
      localStorage.setItem("token", res.token); // ✅ 토큰만 저장

      const user = await fetchMe(); // ✅ 토큰으로 유저 정보 조회
      login(user); // ✅ Context에 저장 (로컬 X)
      setIsLoggedIn(true);
      setErrorMsg("");

      await showAlert({
        title: user.username.toLowerCase() === "admin" ? "관리자로 로그인되었습니다." : "로그인 성공!",
        icon: "success",
      });

      navigate("/");
    } catch (err) {
      setErrorMsg(err.message || "로그인 실패");
    }
  };

  return (
    <Box sx={{ minHeight: "89.4vh", bgcolor: "#f3f6fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ minWidth: 320, maxWidth: 400, width: "100%", borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" mb={2} color="primary" fontWeight="bold" textAlign="center" mt="10px">
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
              helperText={errorMsg || ""}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}>
              로그인
            </Button>
          </form>
          <Button fullWidth variant="text" onClick={() => navigate("/findaccount")}
            sx={{ mt: 1, color: "#4caf50", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
            아이디 혹은 비밀번호를 잊으셨나요?
          </Button>
          <Button fullWidth variant="text" onClick={() => navigate("/signup")}
            sx={{ mt: 1, color: "#1976d2", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
            아직 회원이 아니신가요? 회원가입
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
