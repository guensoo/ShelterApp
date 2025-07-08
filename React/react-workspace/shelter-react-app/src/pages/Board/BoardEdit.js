import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";
import { usePrompt } from "../../hooks/usePrompt"; // usePrompt 훅 임포트
import { fetchBoardEdit } from "../../api/board";  // 실제 API 호출 함수 임포트

const BoardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDirty, setIsDirty] = useState(false); // 입력값 변경 감지

  const originalTitleRef = useRef("");
  const originalContentRef = useRef("");

  usePrompt("⚠️ 수정을 취소하시겠습니까?", isDirty);

  // 실제 API에서 게시글 데이터 불러오기
  useEffect(() => {
    async function loadPost() {
      try {
        const post = await fetchBoardEdit(postId);
        const cleanedContent = post.content.replace(/<[^>]+>/g, "");
        setTitle(post.title);
        setContent(cleanedContent);
        originalTitleRef.current = post.title;
        originalContentRef.current = cleanedContent;
        setIsDirty(false);
      } catch (error) {
        console.warn("게시글을 불러오지 못했습니다.", error);
        navigate("/board");
      }
    }
    loadPost();
  }, [postId, navigate]);

  // 변경 감지
  const checkDirty = useCallback(() => {
    const currentIsDirty =
      title !== originalTitleRef.current || content !== originalContentRef.current;
    setIsDirty(currentIsDirty);
  }, [title, content]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    checkDirty();
  }, [title, content, checkDirty]);

  const handleUpdate = () => {
    // TODO: 여기에 수정 API 호출 구현하기
    console.log("✏️ 게시글 수정 완료 →", { title, content });
    setIsDirty(false);
    navigate(`/board/${id}`);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        ✏️ 게시글 수정
      </Typography>

      <TextField
        fullWidth
        label="제목"
        value={title}
        onChange={handleTitleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="내용"
        multiline
        rows={6}
        value={content}
        onChange={handleContentChange}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/board");
          }}
        >
          목록
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          수정 완료
        </Button>
      </Box>
    </Box>
  );
};

export default BoardEdit;
