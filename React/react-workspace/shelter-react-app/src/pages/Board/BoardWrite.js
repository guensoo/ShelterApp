import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageDrop from "./ImageDrop";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";
import { createBoard } from '../../api/board';

const BoardWrite = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { isAdmin } = useAuth(); // 실제 권한 체크
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [isNotice, setIsNotice] = useState(false);

    const handleSubmit = async () => {
    const cleanContent = content.replace(/<(.|\n)*?>/g, "").trim();

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
      content,
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
      

      {/* ✅ 관리자만 공지글 스위치 표시 */}
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
        setContents={content}
        onChange={setContent}
        height="300px"
        setOptions={{
          buttonList: [
            ["bold", "italic", "underline", "list", "align", "fontSize"],
          ],
        }}
      />

      <ImageDrop onFilesSelected={setUploadedFiles} />
            {/* ✅ 비밀글 스위치 */}
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

      {/* ✅ 비밀번호 입력란 */}
      {isPrivate && (
        <TextField
          fullWidth
          label="비밀번호 (숫자 4자리)"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value.replace(/\D/g, "").slice(0, 4))
          }
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
