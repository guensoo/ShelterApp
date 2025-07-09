import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
    Box, Paper, Typography, TextField, Button, Alert, Stack, Divider
} from "@mui/material";
import { resetPassword } from "../api/user";

const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;

const ResetPasswordPage = () => {
    const [params] = useSearchParams();
    const token = params.get("token");
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        setMsg('');
        setError('');

        if (!pwRegex.test(pw)) {
            setError("비밀번호는 영문/숫자/특수문자 포함 8~20자여야 합니다.");
            return;
        }
        if (pw !== pw2) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        setLoading(true);
        try {
            const res = await resetPassword(token, pw);
            setSuccess(true);
            setMsg(res || "비밀번호가 성공적으로 변경되었습니다!");
        } catch (err) {
            setError(err.message || "에러");
        }
        setLoading(false);
    };

    if (!token) return (
        <Box sx={{ mt: 12, textAlign: "center" }}>
            <Alert severity="error">잘못된 접근입니다.</Alert>
        </Box>
    );

    return (
        <Box sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
            <Paper sx={{ p: 4, boxShadow: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                    🔒 비밀번호 재설정
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" mb={3}>
                    새 비밀번호를 입력해주세요.
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={2}>
                    <TextField
                        label="새 비밀번호"
                        type="password"
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                        autoComplete="new-password"
                        disabled={success}
                    />
                    <TextField
                        label="비밀번호 확인"
                        type="password"
                        value={pw2}
                        onChange={e => setPw2(e.target.value)}
                        autoComplete="new-password"
                        disabled={success}
                    />
                    {error &&
                        <Alert severity="error" onClose={() => setError("")}>
                            {error}
                        </Alert>
                    }
                    {msg &&
                        <Alert severity="success" onClose={() => setMsg("")}>
                            {msg}
                        </Alert>
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReset}
                        disabled={loading || success}
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        {loading ? "변경 중..." : "비밀번호 변경"}
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default ResetPasswordPage;
