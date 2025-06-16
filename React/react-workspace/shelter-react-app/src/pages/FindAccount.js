import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
} from '@mui/material';

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const FindAccount = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [authVerified, setAuthVerified] = useState(false);
  const [foundId, setFoundId] = useState(null);
  const [pwResetSent, setPwResetSent] = useState(false);
  const [showAuthField, setShowAuthField] = useState(false);

  // 이메일 유효성 실시간 체크
  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
  }, [email]);

  // 인증번호 전송 (모의)
  const handleSendAuthCode = () => {
    if (!isEmailValid) return;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    alert(`📨 인증번호 [${code}] 이메일로 보냈다고 가정함`);
    setShowAuthField(true);
  };

  // 인증번호 확인
  const handleVerifyCode = () => {
    if (authCode === sentCode) {
      setAuthVerified(true);
      alert('✅ 인증 성공!');
      setFoundId('mockUser123'); // ✅ 인증 성공과 동시에 아이디 세팅!
    } else {
      alert('❌ 인증번호가 일치하지 않습니다.');
    }
  };

  // ID 찾기 처리
  const handleFindId = () => {
    setFoundId('mockUser123'); // mock
  };

  // 비밀번호 재설정 처리
  const handleSendResetLink = () => {
    setPwResetSent(true);
    alert('🔑 비밀번호 재설정 링크를 전송했습니다.');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        🔍 ID / 비밀번호 찾기
      </Typography>

      <TextField
        label="이메일"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={email && !isEmailValid}
        helperText={
          email && !isEmailValid ? '유효한 이메일 형식을 입력하세요.' : ' '
        }
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleSendAuthCode}
        sx={{ mt: 1 }}
        disabled={!isEmailValid || authVerified}
      >
        인증번호 전송
      </Button>

      {showAuthField && !authVerified && (
        <>
          <TextField
            label="인증번호 입력"
            fullWidth
            margin="normal"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={handleVerifyCode}
            sx={{ mt: 1 }}
          >
            인증 확인
          </Button>
        </>
      )}

      {authVerified && (
        <>
          {foundId && (
            <Typography sx={{ mt: 2 }}>
              ✅ ID: <b>{foundId}</b>
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleSendResetLink}
          >
            비밀번호 재설정 링크 전송
          </Button>

          {pwResetSent && (
            <Typography sx={{ mt: 2, color: 'green' }}>
              📩 이메일로 재설정 링크를 보내드렸습니다!
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default FindAccount;
