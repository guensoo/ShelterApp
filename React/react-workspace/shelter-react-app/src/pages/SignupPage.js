import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Card, CardContent, TextField, Button,
  Typography, InputAdornment
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { signupUser } from "../api/user"; // 🔥 백엔드 API 연동

const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{5,16}$/;
const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [isValidId, setIsValidId] = useState(null);
  const [pw, setPw] = useState("");
  const [isValidPw, setIsValidPw] = useState(null);
  const [pwCheck, setPwCheck] = useState("");
  const [pwMatch, setPwMatch] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(val !== "" && !emailRegex.test(val));
  };

  const handleIdChange = (e) => {
    const val = e.target.value;
    setUserId(val);
    setIsValidId(val === "" ? null : idRegex.test(val));
  };

  const handlePwChange = (e) => {
    const val = e.target.value;
    setPw(val);
    setIsValidPw(val === "" ? null : pwRegex.test(val));
    setPwMatch(val === "" || pwCheck === "" ? null : val === pwCheck);
  };

  const handlePwCheck = (e) => {
    const val = e.target.value;
    setPwCheck(val);
    setPwMatch(pw === "" || val === "" ? null : pw === val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(isValidId && isValidPw && pwMatch && !emailError && email)) return;

    try {
      const res = await signupUser(email, userId, userId, pw); // userId → username, nickname
      alert(res); // 서버 응답 메시지
      navigate("/login");
    } catch (err) {
      alert(err.message || "회원가입 실패");
    }
  };

  return (
    <Box sx={{ minHeight: "89.4vh", bgcolor: "#f3f6fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ minWidth: 320, maxWidth: 400, width: "100%", borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" mb={2} color="primary" fontWeight="bold" textAlign="center" mt="10px">
            회원가입
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="아이디"
              value={userId}
              onChange={handleIdChange}
              margin="dense"
              fullWidth
              required
              error={isValidId === false}
              helperText={isValidId === false ? "5~16자 영문/숫자" : " "}
              InputProps={{
                endAdornment: isValidId === true ? (
                  <InputAdornment position="end"><CheckCircleIcon sx={{ color: "green" }} /></InputAdornment>
                ) : isValidId === false ? (
                  <InputAdornment position="end"><CancelIcon color="error" /></InputAdornment>
                ) : null
              }}
            />
            <TextField
              label="이메일"
              value={email}
              onChange={handleEmailChange}
              margin="dense"
              fullWidth
              required
              error={emailError}
              helperText={emailError ? "유효한 이메일을 입력하세요" : " "}
            />
            <TextField
              label="비밀번호"
              type="password"
              value={pw}
              onChange={handlePwChange}
              margin="dense"
              fullWidth
              required
              error={isValidPw === false}
              helperText={isValidPw === false ? "8~20자 영문+숫자+특수문자 포함" : " "}
              InputProps={{
                endAdornment: isValidPw === true ? (
                  <InputAdornment position="end"><CheckCircleIcon sx={{ color: "green" }} /></InputAdornment>
                ) : isValidPw === false ? (
                  <InputAdornment position="end"><CancelIcon color="error" /></InputAdornment>
                ) : null
              }}
            />
            <TextField
              label="비밀번호 확인"
              type="password"
              value={pwCheck}
              onChange={handlePwCheck}
              margin="dense"
              fullWidth
              required
              error={pwMatch === false}
              helperText={pwMatch === false ? "비밀번호가 일치하지 않습니다" : " "}
              InputProps={{
                endAdornment: pwMatch === true ? (
                  <InputAdornment position="end"><CheckCircleIcon sx={{ color: "green" }} /></InputAdornment>
                ) : pwMatch === false ? (
                  <InputAdornment position="end"><CancelIcon color="error" /></InputAdornment>
                ) : null
              }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}
              disabled={!(isValidId && isValidPw && pwMatch && !emailError && email)}>
              회원가입
            </Button>
          </form>
          <Button fullWidth variant="text" onClick={() => navigate("/login")}
            sx={{ mt: 1, color: "#1976d2", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
            이미 회원이신가요? 로그인
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignupPage;
