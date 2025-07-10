import { TextField, Box, Typography, Paper, Button, Divider, IconButton, Tooltip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState, useEffect } from 'react';
import { useAlert } from '../../context/AlertContext';
import { fetchBoardDetail } from '../../api/board'; // API 함수 import
import { fetchScrapPosts, addScrapPost, removeScrapPost } from '../../api/user';
import { deleteComment, postComment, fetchComments, getLikedStatus, likeBoardPost, reportBoardPost, deleteBoardPost, unlikeBoardPost } from '../../api/board';
import CommentSection from "./CommentSection";

const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const postId = parseInt(id);
    const initialLikeCount = 0;
    const [content, setContent] = useState('');

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 👍 추천(좋아요) state
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    // ⭐ 스크랩 state
    const [scrapped, setScrapped] = useState(false);
    // 👤 로그인 유저 (localStorage에서 가져옴)
    const [loginUser, setLoginUser] = useState(null);

    // swal2 컴포넌트
    const { showAlert, showToast } = useAlert();

    // util
    const getLoginUser = () => {
        const userStr = localStorage.getItem("loginUser");
        return userStr ? JSON.parse(userStr) : null;
    };
    const refreshScrapStatus = (username, postId) => {
        fetchScrapPosts(username)
            .then(scraps => {
                // boardId 혹은 postId로 오는지 실제 데이터 확인 필요
                setScrapped(scraps.some(sp => sp.boardId === postId || sp.postId === postId));
            })
            .catch(() => {
                setScrapped(false);
            });
    };

    // 마운트 시 로그인/스크랩 상태 체크 및 게시글 데이터 호출
    useEffect(() => {
        const user = getLoginUser();
        if (!user) {
            setLoading(false);
            return;
        }

        setLoginUser(user);

        const fetchData = async () => {
            try {
                const data = await fetchBoardDetail(postId);
                console.log('게시글 상세:', data);
                setPost(data);
                setLikeCount(data.likeCount ?? 0);

                const likedStatus = await getLikedStatus(postId); // 서버에서 추천 여부 조회
                setLiked(likedStatus);

                setLoading(false);
            } catch (err) {
                setError(err.message || "게시글을 불러오는 데 실패했습니다.");
                setLoading(false);
            }
        };

        fetchData();
        refreshScrapStatus(user.username, postId);

    }, [postId]);

    if (loading) return <Typography>로딩중...</Typography>;
    if (error)
        return (
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Typography variant="h6">❌ {error}</Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/board")}>
                    목록으로
                </Button>
            </Box>
        );

    if (!post) {
        return (
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Typography variant="h6">❌ 존재하지 않는 게시글입니다.</Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/board")}>
                    목록으로
                </Button>
            </Box>
        );
    }

    // 추천(좋아요) 클릭
    const handleLike = async () => {
        if (!loginUser) {
            await showAlert({ title: "로그인이 필요합니다", icon: "warning" });
            return;
        }
        try {
            if (liked) {
                await unlikeBoardPost(postId);
                setLikeCount((prev) => prev - 1);
                setLiked(false);
                await showToast({ title: "추천 취소 완료", icon: "success" });
            } else {
                await likeBoardPost(postId);
                setLikeCount((prev) => prev + 1);
                setLiked(true);
                await showToast({ title: "추천 완료!", icon: "success" });
            }
        } catch (err) {
            await showAlert({ title: "오류", text: err.message, icon: "error" });
        }
    };

    // 스크랩 클릭
    const handleScrap = async () => {
        if (!loginUser) {
            await showAlert({ title: "로그인이 필요합니다", icon: "warning" });
            return;
        }

        try {
            if (scrapped) {
                await removeScrapPost(postId);
                setScrapped(false);
                await showToast({ title: "스크랩이 취소되었습니다", icon: "info" });
            } else {
                await addScrapPost(postId);
                setScrapped(true);
                await showToast({ title: "스크랩 되었습니다!", icon: "success" });
            }
            refreshScrapStatus(loginUser.username, postId);
        } catch (err) {
            await showAlert({ title: "오류 발생", text: err.message, icon: "error" });
        }
    };

    // 신고 클릭
    const handleReport = async () => {
        if (!loginUser) {
            await showAlert({ title: "로그인이 필요합니다", icon: "warning" });
            return;
        }
        try {
            await reportBoardPost({ boardId: postId, reason: "부적절한 내용" });
            await showAlert({ title: "🚨 신고가 접수되었습니다.", icon: "success" });
        } catch (err) {
            // 409 Conflict 처리
            if (err.response?.status === 409) {
                await showAlert({ title: "이미 신고하셨습니다.", icon: "info" });
            } else {
                await showAlert({ title: "오류 발생", text: err.message, icon: "error" });
            }
        }
    };

    const handlePostComment = async () => {
        if (!content.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        try {
            // API 호출 예시: 댓글 등록
            await postComment(postId, content); // postId는 현재 게시글 id 변수명
            setContent('');
            // 댓글 목록 다시 불러오기 또는 상태 업데이트
            await fetchComments();
        } catch (error) {
            alert('댓글 등록에 실패했습니다.');
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
        try {
            await deleteComment(commentId);
            await fetchComments();
        } catch (error) {
            alert('댓글 삭제에 실패했습니다.');
        }
    };

    const handleDelete = async () => {
        const result = await showAlert({
            title: "정말 삭제하시겠습니까?",
            text: "삭제한 글은 복구할 수 없습니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "네, 삭제합니다",
            cancelButtonText: "아니오"
        });
        if (result.isConfirmed) {
            try {
                await deleteBoardPost(postId);
                await showToast({ title: "🗑️ 삭제 완료!", icon: "success" });
                navigate("/board");
            } catch (err) {
                await showAlert({ title: "삭제 실패", text: err.message, icon: "error" });
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
            <Paper sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                        px: 1,
                        fontWeight: 700,
                        fontSize: 22
                    }}
                >
                    <span>{post.title}</span>
                    <span style={{ fontWeight: 400, fontSize: 15, color: "#888" }}>
                        {post.createdAt?.slice(0, 10)}
                    </span>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mb: 2,
                        px: 1,
                        fontSize: 15,
                        color: "#444"
                    }}
                >
                    <span>작성자: <b>{post.nickname}</b></span>
                    <span>| 추천: <b>{likeCount}</b></span>
                    <span>| 조회수: <b>{post.viewCount ?? 0}</b></span>
                </Box>

                <Box sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: post.content }} />
                {post && post.files && post.files.length > 0 && (
                    <Box sx={{ mt: 2, mb: 2, display: "flex", gap: 2 }}>
                        {post.files.map((file, idx) => (
                            <Box
                                key={idx}
                                sx={{ border: '1px solid #eee', borderRadius: 2, overflow: 'hidden', maxWidth: 200 }}
                            >
                                <img
                                    src={file.url}
                                    alt={`첨부파일${idx + 1}`}
                                    style={{ width: '100%', height: '100%', display: 'block' }}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
                {/* 중앙 정렬: 추천/스크랩/신고 */}
                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    {/* 👍 추천(좋아요) 버튼 */}
                    <Tooltip title="추천">
                        <IconButton onClick={handleLike}>
                            <ThumbUpAltIcon sx={{ color: liked ? "#1976d2" : "#bbb" }} />
                            <span style={{ marginLeft: 6, fontWeight: 600 }}>{likeCount}</span>
                        </IconButton>
                    </Tooltip>
                    {/* ⭐ 스크랩(북마크) 버튼 */}
                    <Tooltip title={scrapped ? "스크랩 취소" : "스크랩"}>
                        <IconButton onClick={handleScrap}>
                            {scrapped ? (
                                <BookmarkIcon sx={{ color: "#ffd600" }} />
                            ) : (
                                <BookmarkBorderIcon sx={{ color: "#bbb" }} />
                            )}
                        </IconButton>
                    </Tooltip>
                    {/* 🚨 신고 버튼 */}
                    <Tooltip title="신고">
                        <IconButton onClick={handleReport}>
                            <WarningAmberIcon sx={{ color: "#ff9800" }} />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* 첨부파일 이름 목록 */}
                {post && post.files && post.files.length > 0 && (
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Box sx={{ fontWeight: 600, mb: 1 }}>첨부파일:</Box>
                        <Box>
                            {post.files.map((file, idx) => {
                                const fileName = file.originalFilename || `첨부파일_${idx + 1}`;
                                return (
                                    <a
                                        key={idx}
                                        href={file.url}
                                        download={fileName}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: 'block', color: '#1976d2', textDecoration: 'underline', cursor: 'pointer', marginBottom: 4 }}
                                        onClick={e => {
                                            console.log('다운로드 시도:', file.url, fileName);
                                        }}
                                    >
                                        {fileName}
                                    </a>
                                );
                            })}
                        </Box>
                    </Box>
                )}

                {/* 우측 정렬: 목록/수정/삭제 */}
                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                    }}
                >
                    <Button variant="outlined" onClick={() => navigate("/board")}>
                        목록
                    </Button>

                    {(loginUser && (
                        loginUser.nickname === post.nickname ||
                        loginUser.userId === 'admin' || // AuthContext 구조에 따라 다르게 세팅
                        loginUser.role === 'ADMIN'
                    )) && (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate(`/board/edit/${postId}`)}
                                >
                                    수정
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleDelete}
                                >
                                    삭제
                                </Button>
                            </>
                        )}
                </Box>
            </Paper>

            {/* 💬 댓글 영역 */}
            <CommentSection boardId={postId} loginUser={loginUser} />
        </Box>
    );
};

export default BoardDetail;
