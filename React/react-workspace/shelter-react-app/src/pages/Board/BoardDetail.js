import { Box, Typography, Paper, Button, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import mockPosts from "../../data/mockPosts";
import mockComments from "../../data/mockComments";

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id);
  const post = mockPosts.find((p) => p.id === postId);
  const comments = mockComments[postId] || [];

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

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      alert("🗑️ 삭제 완료 (목업이므로 실제 삭제는 구현 필요)");
      navigate("/board");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>{post.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          작성자: {post.author} | {post.createdAt}
        </Typography>

        <Box sx={{ mt: 3 }} dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* 버튼들 */}
        <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
          <Button variant="outlined" onClick={() => navigate("/board")}>목록</Button>
          <Button variant="contained" onClick={() => navigate(`/board/edit/${postId}`)}>수정</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>삭제</Button>
        </Box>
      </Paper>

      {/* 💬 댓글 영역 */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>💬 댓글</Typography>
        <Divider sx={{ mb: 2 }} />
        {comments.length === 0 ? (
          <Typography>아직 댓글이 없습니다.</Typography>
        ) : (
          comments.map((c) => (
            <Box key={c.id} sx={{ mb: 2, p: 1.5, border: "1px solid #eee", borderRadius: 1 }}>
              <Typography variant="subtitle2">{c.author} · {c.createdAt}</Typography>
              <Typography variant="body1">{c.content}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default BoardDetail;
