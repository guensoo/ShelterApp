import { useCallback, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { fetchComments, postComment, deleteComment, updateComment } from "../../api/board"; // API 함수
import { useAlert } from "../../context/AlertContext";

const CommentSection = ({ boardId, loginUser }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();
    const [editingId, setEditingId] = useState(null);        // 수정 중인 댓글 id
    const [editContent, setEditContent] = useState("");      // 수정 중인 댓글 내용


    // 댓글 목록 불러오기
    const loadComments = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchComments(boardId);
            setComments(data);
        } catch (err) {
            console.error("댓글 불러오기 실패", err);
        } finally {
            setLoading(false);
        }
    }, [boardId]);  // boardId가 바뀔 때만 함수 새로 만듦

    useEffect(() => {
        loadComments();
    }, [loadComments]);  // 이제 의존성 배열에 loadComments만 있어도 됨

    // 댓글 등록
    const handlePostComment = async () => {
        if (!content.trim()) return;
        try {
            await postComment(boardId, content);
            setContent("");
            await loadComments();
        } catch (err) {
            await showAlert({ title: "댓글 등록에 실패하였습니다.", icon: "error" });
        }
    };

    const startEditComment = (comment) => {
        setEditingId(comment.id);
        setEditContent(comment.content);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditContent("");
    };

    const handleUpdateComment = async (commentId) => {
        if (!editContent.trim()) return;
        try {
            await updateComment(commentId, editContent);
            await loadComments();
            setEditingId(null);
            setEditContent("");
        } catch (err) {
            await showAlert({ title: "댓글 수정에 실패하였습니다.", icon: "error" });
        }
    };

    // 댓글 삭제
    const handleDeleteComment = async (commentId) => {
        const result = await showAlert({
            title: "댓글을 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
        });
        if (!result) return;
        try {
            await deleteComment(commentId);
            await loadComments();
        } catch (err) {
            await showAlert({ title: "댓글 삭제에 실패하였습니다.", icon: "error" });
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" mb={2}>
                댓글 ({comments.length})
            </Typography>

            {loading ? (
                <Typography>댓글을 불러오는 중...</Typography>
            ) : (
                <>
                    {comments.map((comment) => (
                        <Box
                            key={comment.id}
                            sx={{
                                mb: 1,
                                p: 1,
                                borderBottom: "1px solid #ddd",
                                display: "flex",  // 추가!
                                alignItems: "flex-start",
                                justifyContent: "space-between", // 추가!
                                gap: 2           // 필요하면 버튼과 내용 사이 여백
                            }}
                        >
                            {/* 왼쪽: 작성자 + 내용(혹은 수정 폼) */}
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2">{comment.nickname}</Typography>
                                {editingId === comment.id ? (
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <TextField
                                            value={editContent}
                                            onChange={e => setEditContent(e.target.value)}
                                            size="small"
                                            multiline
                                            minRows={1}
                                            sx={{ flex: 1 }}
                                        />
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => handleUpdateComment(comment.id)}
                                        >
                                            완료
                                        </Button>
                                        <Button
                                            size="small"
                                            color="inherit"
                                            onClick={cancelEdit}
                                        >
                                            취소
                                        </Button>
                                    </Box>
                                ) : (
                                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                                        {comment.content}
                                    </Typography>
                                )}
                            </Box>
                            {/* 오른쪽: 수정/삭제 버튼 */}
                            {loginUser && loginUser.username === comment.username && (
                                <Box sx={{ minWidth: 90, textAlign: "right" }}>
                                    {/* 수정 중이 아닐 때만 버튼 노출 */}
                                    {editingId !== comment.id && (
                                        <>
                                            <Button size="small" onClick={() => startEditComment(comment)}>
                                                수정
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleDeleteComment(comment.id)}>
                                                삭제
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            )}
                        </Box>
                    ))}

                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="댓글을 입력하세요"
                        />
                        <Button variant="contained" onClick={handlePostComment}>
                            등록
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default CommentSection;
