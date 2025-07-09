import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box, Typography, List, ListItem, ListItemText, Divider, Paper,
    Button, CircularProgress
} from "@mui/material";
import { useAlert } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";
import { deleteUser, fetchScrapPosts, removeScrapPost } from "../api/user";

const MyPage = () => {
    const navigate = useNavigate();
    const { loginUser, isLoggedIn, isLoading, logout } = useAuth(); // 👈 context 사용
    const [favoriteShelters] = useState([]);
    const [scrapPosts, setScrapPosts] = useState([]);
    const { showAlert, showToast } = useAlert();
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [loading, setLoading] = useState(true);


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

    // 탈퇴 확인 팝업 띄우고 확인 시 실제 탈퇴 처리 호출
    const confirmWithdraw = () => {
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

            {/* 🚩 회원탈퇴 버튼(맨 아래) */}
            <Box sx={{ width: "100%", maxWidth: 500, mt: 5 }}>
                <Divider sx={{ my: 3 }} />
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={confirmWithdraw}  // 여기만 바꿔주세요
                >
                    회원탈퇴
                </Button>
            </Box>
        </Box >
    );
};

export default MyPage;
