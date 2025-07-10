import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box, Typography, List, ListItem, ListItemText, Divider, Paper,
    Button, CircularProgress, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField,
} from "@mui/material";
import { useAlert } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";
import { changePassword, deleteUser, fetchScrapPosts, removeScrapPost, updateNickname } from "../api/user";

const MyPage = () => {
    const navigate = useNavigate();
    const { loginUser, isLoggedIn, isLoading, logout } = useAuth(); // 👈 context 사용
    const [favoriteShelters] = useState([]);
    const [scrapPosts, setScrapPosts] = useState([]);

    // 알람
    const { showAlert, showToast } = useAlert();
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [loading, setLoading] = useState(true);

    // 회원정보수정
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [nickname, setNickname] = useState(loginUser?.nickname || "");
    const [selected, setSelected] = useState("nickname");
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newPwConfirm, setNewPwConfirm] = useState("");


    const handleWithdraw = async () => {
        setIsWithdrawing(true);
        try {
            const msg = await deleteUser();
            navigate("/");
            await showAlert({
                title: "탈퇴 완료",
                text: msg || "탈퇴되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
            });
            logout();
            localStorage.removeItem("token");
        } catch (err) {
            await showAlert({
                title: "오류 발생",
                text: err.message || "오류가 발생했습니다.",
                icon: "error",
                confirmButtonText: "확인",
            });
        } finally {
            setIsWithdrawing(false);
        }
    };

    // 🚩 1. 비동기 로그인 체크 (완전 안전)
    useEffect(() => {
        if (isWithdrawing) return; // 탈퇴 중엔 로그인 체크 스킵
        if (isLoading) return;
        if (!isLoggedIn || !loginUser) {
            showAlert({
                title: "로그인이 필요합니다.",
                text: "로그인 후 이용해주세요.",
                icon: "warning",
            }).then(() => {
                navigate("/login");
            });
        }
    }, [isLoading, isLoggedIn, loginUser, navigate, showAlert, isWithdrawing]);

    // 로그인 유저 정보 가져오기
    const username = loginUser?.username;

    // 스크랩 목록 불러오기
    const loadScraps = async () => {
        try {
            if (username) {
                setLoading(true);
                const scraps = await fetchScrapPosts(username);
                setScrapPosts(scraps);
            }
        } catch (err) {
            await showAlert({ title: "스크랩 목록 불러오기 실패", text: err.message, icon: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadScraps();
        // eslint-disable-next-line
    }, [username]);

    // 스크랩 삭제
    const handleRemoveScrap = async (boardId) => {
        try {
            setLoading(true); // 삭제 버튼 누를 때 바로 로딩 표시
            await removeScrapPost(boardId);
            await showToast({ title: "스크랩 삭제 완료", icon: "info" });
            await loadScraps(); // 이 함수 안에서 setLoading(false) 해주면 됨
        } catch (err) {
            await showAlert({ title: "삭제 실패", text: err.message, icon: "error" });
            setLoading(false); // 에러 났을 때도 꼭 false!
        }
    };

    if (isLoading || !isLoggedIn || !loginUser || isWithdrawing) return null;

    const handleProfileEdit = () => {
        setOpenEditDialog(true);
    };

    const handleEditClose = () => {
        setOpenEditDialog(false);
    };

    const handleSaveNickname = async () => {
        try {
            await updateNickname(nickname); // API 연동 함수 따로 정의해야 함
            await showAlert({ title: "닉네임이 수정되었습니다.", icon: "success" });
            setOpenEditDialog(false);
            // TODO: 사용자 상태 갱신 필요 시 추가
        } catch (err) {
            await showAlert({ title: "수정 실패", icon: "error" });
        }
    };

    // 탈퇴 확인 팝업 띄우고 확인 시 실제 탈퇴 처리 호출
    const handleDeleteUser = () => {
        showAlert({
            title: "탈퇴하시겠습니까?",
            text: "모든 데이터가 즉시 삭제되며 복구할 수 없습니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "탈퇴",
            cancelButtonText: "취소",
        }).then(result => {
            if (result.isConfirmed) {
                handleWithdraw();
            }
        });
    };

    // 비밀번호 변경 함수
    const handleChangePassword = async () => {
        if (!currentPw || !newPw || !newPwConfirm) {
            await showAlert({ title: "모든 항목을 입력해주세요.", icon: "warning" });
            return;
        }

        if (newPw !== newPwConfirm) {
            await showAlert({ title: "새 비밀번호가 일치하지 않습니다.", icon: "error" });
            return;
        }

        try {
            await changePassword({ currentPassword: currentPw, newPassword: newPw });
            await showAlert({ title: "비밀번호가 변경되었습니다.", icon: "success" });

            setCurrentPw("");
            setNewPw("");
            setNewPwConfirm("");
            setSelected("nickname");
        } catch (err) {
            await showAlert({ title: "변경 실패", text: err, icon: "error" }); // ✅ 문자열 그대로
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                px: 2,
                pt: 8,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: 500,
                    mb: 3,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    반갑습니다 {loginUser.nickname || loginUser.username || "회원"} 님
                </Typography>
                <Typography variant="h6" sx={{ color: "gray" }}>
                    보유 포인트 : {loginUser.point ?? 0}P
                </Typography>
            </Box>

            {/* 즐겨찾기 쉼터 영역 */}
            <Paper elevation={3} sx={{ width: "100%", maxWidth: 500, p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    ⭐ 즐겨찾기 쉼터 목록
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* 즐겨찾기 쉼터 */}
                {favoriteShelters.length === 0 ? (
                    <Typography color="text.secondary">아직 즐겨찾기한 쉼터가 없습니다.</Typography>
                ) : (
                    <List>
                        {favoriteShelters.map(shelter => (
                            <Box key={`${shelter.type}_${shelter.id}`}>
                                <ListItem
                                    button
                                    component="a"
                                    href={`https://map.naver.com/p/search/${encodeURIComponent(shelter.addr || "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ListItemText
                                        primary={shelter.name || "이름 없음"}
                                        secondary={`[${shelter.type}] ${shelter.addr || "주소 없음"}`}
                                    />
                                </ListItem>
                                <Divider />
                            </Box>
                        ))}
                    </List>
                )}
            </Paper>

            {/* 스크랩 게시글 영역 */}
            <Paper elevation={3} sx={{ width: "100%", maxWidth: 500, p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    📌 스크랩 게시글 목록
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
                        <CircularProgress />
                    </Box>
                ) : scrapPosts.length === 0 ? (
                    <Typography color="text.secondary">
                        아직 스크랩한 게시글이 없습니다.
                    </Typography>
                ) : (
                    <List>
                        {scrapPosts.map(post => (
                            <Box key={post.boardId}>
                                <ListItem
                                    secondaryAction={
                                        <Button
                                            color="error"
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveScrap(post.boardId);
                                            }}
                                        >
                                            삭제
                                        </Button>
                                    }
                                    button
                                    onClick={() => navigate(`/board/${post.boardId}`)}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <ListItemText
                                        primary={post.boardTitle || "제목 없음"}
                                        secondary={`${post.boardUsername} · ${post.createdAt?.slice(0, 10)}`}
                                    />
                                </ListItem>
                                <Divider />
                            </Box>
                        ))}
                    </List>
                )}
            </Paper>

            {/* 🚩 회원정보수정, 회원탈퇴 버튼(맨 아래) */}
            <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ flex: 1 }}
                    onClick={handleProfileEdit} // 회원정보수정 페이지로 이동 또는 다이얼로그 열기
                >
                    회원정보수정
                </Button>
            </Box>
            <Dialog open={openEditDialog} onClose={handleEditClose} fullWidth maxWidth="sm" sx={{ zIndex: 1000 }}>
                <DialogTitle>회원정보 관리</DialogTitle>
                <DialogContent dividers>
                    {/* 상단 기능 선택 버튼 */}
                    <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                        <Button
                            variant={selected === "nickname" ? "contained" : "outlined"}
                            onClick={() => setSelected("nickname")}
                        >
                            닉네임 변경
                        </Button>
                        <Button
                            variant={selected === "password" ? "contained" : "outlined"}
                            onClick={() => setSelected("password")}
                        >
                            비밀번호 변경
                        </Button>
                        <Button
                            variant={selected === "withdraw" ? "contained" : "outlined"}
                            color="error"
                            onClick={() => setSelected("withdraw")}
                        >
                            회원 탈퇴
                        </Button>
                    </Box>

                    {/* 본문 내용 영역 */}
                    {selected === "nickname" && (
                        <>
                            <TextField
                                margin="dense"
                                label="아이디"
                                fullWidth
                                variant="standard"
                                value={loginUser?.username || ""}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                margin="dense"
                                label="이메일"
                                fullWidth
                                variant="standard"
                                value={loginUser?.email || ""}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                margin="dense"
                                label="닉네임"
                                fullWidth
                                variant="standard"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </>
                    )}

                    {selected === "password" && (
                        <>
                            <TextField
                                margin="dense"
                                label="현재 비밀번호"
                                type="password"
                                fullWidth
                                variant="standard"
                                value={currentPw}
                                onChange={(e) => setCurrentPw(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="새 비밀번호"
                                type="password"
                                fullWidth
                                variant="standard"
                                value={newPw}
                                onChange={(e) => setNewPw(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="새 비밀번호 확인"
                                type="password"
                                fullWidth
                                variant="standard"
                                value={newPwConfirm}
                                onChange={(e) => setNewPwConfirm(e.target.value)}
                            />
                        </>
                    )}

                    {selected === "withdraw" && (
                        <Box sx={{ mt: 2 }}>
                            <Typography color="error" sx={{ mb: 1 }}>
                                정말 탈퇴하시겠습니까?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                탈퇴 시 모든 데이터가 삭제되며 복구가 불가능합니다.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleEditClose} color="inherit">취소</Button>
                    {selected === "nickname" && (
                        <Button onClick={handleSaveNickname} color="primary" variant="contained">저장</Button>
                    )}
                    {selected === "password" && (
                        <Button onClick={handleChangePassword} color="primary" variant="contained">변경</Button>
                    )}
                    {selected === "withdraw" && (
                        <Button onClick={handleDeleteUser} color="error" variant="contained">회원 탈퇴</Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default MyPage;
