import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";
import { usePrompt } from "../../hooks/usePrompt"; // usePrompt 훅 임포트
import mockPosts from "../../data/mockPosts";

const BoardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDirty, setIsDirty] = useState(false); // 입력값 변경 감지

  // 게시글 초기 제목과 내용을 저장하기 위한 ref
  // useRef를 사용하면 리렌더링 시에도 값이 유지되며, 불필요한 리렌더링을 유발하지 않습니다.
  const originalTitleRef = useRef("");
  const originalContentRef = useRef("");

  // 1. React Router를 통한 내부 라우팅 시 경고 (`usePrompt` 사용)
  // usePrompt 훅이 isDirty가 true일 때 "수정을 취소하시겠습니까?"를 띄웁니다.
  usePrompt("⚠️ 수정을 취소하시겠습니까?", isDirty);

  // 2. 브라우저 레벨 이동 (탭 닫기, 새로고침 등) 시 경고 (`beforeunload` 이벤트 사용)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        // 일부 브라우저에서는 이 메시지가 사용자에게 직접 표시되지 않을 수 있습니다.
        // 하지만 빈 문자열이 아니면 경고창이 뜨도록 트리거합니다.
        e.preventDefault();
        e.returnValue = "⚠️ 수정을 취소하시겠습니까?";
        return "⚠️ 수정을 취소하시겠습니까?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]); // isDirty 상태가 변경될 때마다 이펙트를 다시 실행합니다.

  // 컴포넌트 마운트 시 게시글 데이터를 불러와 상태 초기화 및 원본 데이터 저장
  useEffect(() => {
    const post = mockPosts.find((p) => p.id === postId);
    if (post) {
      const cleanedContent = post.content.replace(/<[^>]+>/g, ""); // HTML 태그 제거
      setTitle(post.title);
      setContent(cleanedContent);
      // 원본 내용을 ref에 저장하여 나중에 변경 여부 감지 시 사용
      originalTitleRef.current = post.title;
      originalContentRef.current = cleanedContent;
      setIsDirty(false); // 초기 로드 시에는 변경된 것이 없으므로 false
    } else {
      // NOTE: Canvas 환경에서는 window.alert()이 동작하지 않습니다.
      // 사용자에게 메시지를 보여주려면 커스텀 모달 UI를 사용해야 합니다.
      console.warn("존재하지 않는 게시글입니다. 게시판 목록으로 이동합니다.");
      navigate("/board");
    }
  }, [postId, navigate]);

  // 입력 필드 변경 시 isDirty 상태를 업데이트하는 함수
  // useCallback을 사용하여 함수가 불필요하게 재생성되는 것을 방지합니다.
  const checkDirty = useCallback(() => {
    // 현재 입력된 제목/내용이 원본과 다르면 isDirty를 true로 설정
    const currentIsDirty =
      title !== originalTitleRef.current || content !== originalContentRef.current;
    setIsDirty(currentIsDirty);
  }, [title, content]);

  // 제목 입력 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 내용 입력 변경 핸들러
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // 제목 또는 내용이 변경될 때마다 checkDirty 함수 호출
  useEffect(() => {
    checkDirty();
  }, [title, content, checkDirty]);


  // 게시글 수정 완료 핸들러
  const handleUpdate = () => {
    // 실제로는 여기에 DB 업데이트 로직이 들어갑니다.
    console.log("✏️ 게시글 수정 완료 →", { title, content });
    // NOTE: Canvas 환경에서는 window.alert()이 동작하지 않습니다.
    // 사용자에게 메시지를 보여주려면 커스텀 모달 UI를 사용해야 합니다.
    console.log("게시글이 성공적으로 수정되었습니다."); // 콘솔 로그로 대체
    setIsDirty(false); // 수정 완료 후에는 변경된 내용이 없으므로 false로 설정
    navigate(`/board/${id}`); // 수정된 게시글 상세 페이지로 이동
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>✏️ 게시글 수정</Typography>

      <TextField
        fullWidth
        label="제목"
        value={title}
        onChange={handleTitleChange} // 변경된 핸들러 사용
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="내용"
        multiline
        rows={6}
        value={content}
        onChange={handleContentChange} // 변경된 핸들러 사용
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          onClick={() => {
            // "목록" 버튼 클릭 시 usePrompt 훅에 의해 변경사항이 있으면 경고창이 뜹니다.
            // 사용자가 "확인"을 누르면 navigate가 실행됩니다.
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
