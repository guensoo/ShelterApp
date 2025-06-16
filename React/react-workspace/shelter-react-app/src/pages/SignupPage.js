import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, TextField, Button, Typography, InputAdornment } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{5,16}$/;
const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [isValidId, setIsValidId] = useState(null);
  const [pw, setPw] = useState("");
  const [isValidPw, setIsValidPw] = useState(null);
  const [pwCheck, setPwCheck] = useState("");
  const [pwMatch, setPwMatch] = useState(null);
  const navigate = useNavigate();
  const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(val !== '' && !isValidEmail(val));
  };

  // 아이디 검사
  const handleIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
    setIsValidId(value === "" ? null : idRegex.test(value));
  };
  // 비번 검사
  const handlePwChange = (e) => {
    const value = e.target.value;
    setPw(value);
    setIsValidPw(value === "" ? null : pwRegex.test(value));
    setPwMatch(value === "" || pwCheck === "" ? null : value === pwCheck);
  };
  // 비번 확인 검사
  const handlePwCheck = (e) => {
    const value = e.target.value;
    setPwCheck(value);
    setPwMatch(pw === "" || value === "" ? null : pw === value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(isValidId && isValidPw && pwMatch)) return;
    alert("회원가입이 완료되었습니다!");
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "89.4vh", bgcolor: "#f3f6fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ minWidth: 320, maxWidth: 400, width: "100%", borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" mb={2} color="primary" fontWeight="bold" textAlign="center" marginTop="10px">
            회원가입
          </Typography>
          <form onSubmit={handleSubmit}
            style={{
              display : 'flex',
              flexDirection : 'column',
              gap : 'none',
            }}>
            <TextField
              label="아이디"
              value={userId}
              onChange={handleIdChange}
              margin="dense"
              fullWidth
              required
              error={isValidId === false}
              helperText={
                isValidId === false
                  ? "5~16자 영문/숫자만 입력"
                  : " "
              }
              InputProps={{
                endAdornment:
                  isValidId === true ? (
                    <InputAdornment position="end">
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </InputAdornment>
                  ) : isValidId === false ? (
                    <InputAdornment position="end">
                      <CancelIcon color="error" />
                    </InputAdornment>
                  ) : null,
              }}
            />
            <TextField
              label="이메일"
              fullWidth
              required
              margin="dense"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? '유효한 이메일을 입력하세요' : ' '}
              sx={{ mb: 1 }}
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
              helperText={
                isValidPw === false
                  ? "8~20자 영문+숫자+특수문자 포함"
                  : " "
              }
              InputProps={{
                endAdornment:
                  isValidPw === true ? (
                    <InputAdornment position="end">
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </InputAdornment>
                  ) : isValidPw === false ? (
                    <InputAdornment position="end">
                      <CancelIcon color="error" />
                    </InputAdornment>
                  ) : null,
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
              helperText={
                pwMatch === false
                  ? "비밀번호가 일치하지 않습니다"
                  : " "
              }
              InputProps={{
                endAdornment:
                  pwMatch === true ? (
                    <InputAdornment position="end">
                      <CheckCircleIcon sx={{ color: "green" }} />
                    </InputAdornment>
                  ) : pwMatch === false ? (
                    <InputAdornment position="end">
                      <CancelIcon color="error" />
                    </InputAdornment>
                  ) : null,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}
              disabled={!(isValidId && isValidPw && pwMatch)}
            >
              회원가입
            </Button>
          </form>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate("/login")}
            sx={{
              mt: 1,
              color: '#1976d2',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
                color: '#115293'
              }
            }}
          >
            이미 회원이신가요? 로그인
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignupPage;
