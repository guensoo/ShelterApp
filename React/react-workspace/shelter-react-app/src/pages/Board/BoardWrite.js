import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
  Box, TextField, Typography, Button, FormControlLabel, Switch,
} from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageDrop from "./ImageDrop";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";
import { createBoard } from '../../api/board';

const BoardWrite = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { isAdmin } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [isNotice, setIsNotice] = useState(false);

  // SunEditor ref로 강제 동기화 지원
  const editorRef = useRef(null);

  // 텍스트만 추출하는 함수 (정규식보단 DOMParser가 더 신뢰도 높음)
  const extractText = html => {
    const doc = new window.DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // 등록 버튼 누를 때 강제로 최신값 반영
  const handleSubmit = async () => {
    let latestContent = content;

    // SunEditor ref가 있다면, 최신값 강제로 가져옴
    if (editorRef.current) {
      latestContent = editorRef.current.getContents();
    }

    const cleanContent = extractText(latestContent).trim();

    if (!title.trim()) {
      await showAlert({ title: "제목을 입력해주세요.", icon: "warning" });
      return;
    }
    if (!cleanContent) {
      await showAlert({ title: "내용을 입력해주세요.", icon: "warning" });
      return;
    }
    if (isPrivate && !/^\d{4}$/.test(password)) {
      await showAlert({ title: "비밀글 비밀번호는 숫자 4자리여야 합니다.", icon: "warning" });
      return;
    }

    const postData = {
      title,
      content: latestContent, // 실제 HTML 내용 저장
      isPrivate,
      password: isPrivate ? password : null,
      isNotice: isAdmin ? isNotice : false,
    };

    try {
      const savedPost = await createBoard(postData);
      await showAlert({ title: "게시글이 등록되었습니다.", icon: "success" });
      navigate(`/board/${savedPost.postNo}`);
    } catch (error) {
      await showAlert({ title: "게시글 등록에 실패했습니다.", text: error.message, icon: "error" });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        ✏️ 게시글 작성
      </Typography>

      {isAdmin && (
        <FormControlLabel
          control={
            <Switch
              checked={isNotice}
              onChange={(e) => setIsNotice(e.target.checked)}
            />
          }
          label="📢 공지글 등록"
          sx={{ mb: 2 }}
        />
      )}

      <TextField
        fullWidth
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <SunEditor
        getSunEditorInstance={ref => editorRef.current = ref}
        defaultValue={content}
        onChange={setContent}
        height="300px"
        setOptions={{
          buttonList: [["bold", "italic", "underline", "list", "align", "fontSize"]],
        }}
      />

      <ImageDrop onFilesSelected={setUploadedFiles} />

      <FormControlLabel
        control={
          <Switch
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        }
        label="🔒 비밀글"
        sx={{ mb: 2 }}
      />

      {isPrivate && (
        <TextField
          fullWidth
          label="비밀번호 (숫자 4자리)"
          value={password}
          onChange={(e) => setPassword(e.target.value.replace(/\D/g, "").slice(0, 4))}
          inputProps={{ maxLength: 4 }}
          sx={{ mb: 2 }}
        />
      )}
      
      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Button variant="contained" onClick={handleSubmit}>
          등록
        </Button>
      </Box>
    </Box>
  );
};

export default BoardWrite;
