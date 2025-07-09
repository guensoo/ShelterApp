import { useState } from 'react';
import {
  Box, Paper, TextField, Button, Typography, Divider, Collapse, Alert, Stack
} from '@mui/material';

import { findUserId, sendResetLink } from '../api/user';

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const FindAccount = () => {
  // --- 아이디 찾기 ---
  const [findEmail, setFindEmail] = useState('');
  const [findAuth, setFindAuth] = useState('');
  const [findVerified, setFindVerified] = useState(false);
  const [foundId, setFoundId] = useState(null);
  const [findAlert, setFindAlert] = useState({ type: '', msg: '' });

  // --- 비밀번호 찾기 ---
  const [pwId, setPwId] = useState('');
  const [pwEmail, setPwEmail] = useState('');
  const [pwAlert, setPwAlert] = useState({ type: '', msg: '' });
  const [pwResetSent, setPwResetSent] = useState(false);
  const [sendingPwMail, setSendingPwMail] = useState(false);

  // 아이디 찾기 - 이메일 인증 및 서버 연동
  const handleFindVerify = async () => {
    setFindAlert({ type: '', msg: '' });
    if (!isValidEmail(findEmail)) return;
    try {
      const result = await findUserId(findEmail);
      setFoundId(result.username);
      setFindVerified(true);
      setFindAlert({ type: 'success', msg: `이메일 인증 성공! (아이디: ${result.username})` });
    } catch (err) {
      setFoundId(null);
      setFindVerified(false);
      setFindAlert({ type: 'error', msg: err.message || '아이디 찾기 실패' });
    }
  };

  // 비밀번호 찾기 - 서버 연동
  const handleSendPwReset = async () => {
    setPwAlert({ type: '', msg: '' });
    setSendingPwMail(true);
    try {
      const msg = await sendResetLink(pwId, pwEmail);
      setPwResetSent(true);
      setPwAlert({ type: 'success', msg });
    } catch (err) {
      setPwResetSent(false);
      setPwAlert({ type: 'error', msg: err.message || '메일 발송 실패' });
    }
    setSendingPwMail(false);
  };

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: 8 }}>
      <Paper sx={{ p: 4, boxShadow: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          🔍 아이디/비밀번호 찾기
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mb={3}>
          이메일 인증이 필요합니다.
        </Typography>

        {/* ---------------- 아이디 찾기 ---------------- */}
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
          아이디 찾기
        </Typography>
        <Stack spacing={1} mt={1} mb={2}>
          <TextField
            label="가입 이메일"
            value={findEmail}
            onChange={e => setFindEmail(e.target.value)}
            disabled={findVerified}
          />
          <Collapse in={!!findAlert.msg}>
            <Alert
              severity={findAlert.type || 'info'}
              sx={{ mb: 1 }}
              onClose={() => setFindAlert({ type: '', msg: '' })}
            >
              {findAlert.msg}
            </Alert>
          </Collapse>
          <Button
            variant="contained"
            onClick={handleFindVerify}
            disabled={!isValidEmail(findEmail) || findVerified}
          >
            아이디 찾기
          </Button>
          <Collapse in={findVerified && foundId}>
            <Box sx={{ my: 1, textAlign: 'center' }}>
              {/* 아이디 찾은 결과 출력 */}
            </Box>
          </Collapse>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* ---------------- 비밀번호 찾기 ---------------- */}
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
          비밀번호 재설정
        </Typography>
        <Stack spacing={1} mt={1} mb={2}>
          <TextField
            label="아이디"
            value={pwId}
            onChange={e => setPwId(e.target.value)}
            disabled={pwResetSent && !sendingPwMail}
          />
          <TextField
            label="이메일"
            value={pwEmail}
            onChange={e => setPwEmail(e.target.value)}
            disabled={pwResetSent && !sendingPwMail}
          />
          <Collapse in={!!pwAlert.msg}>
            <Alert
              severity={pwAlert.type || 'info'}
              sx={{ mb: 1 }}
              onClose={() => setPwAlert({ type: '', msg: '' })}
            >
              {pwAlert.msg}
            </Alert>
          </Collapse>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSendPwReset}
            disabled={!pwId || !isValidEmail(pwEmail) || sendingPwMail}
          >
            {sendingPwMail
              ? "전송 중..."
              : pwResetSent
                ? "재발송"
                : "비밀번호 재설정 메일 전송"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default FindAccount;
