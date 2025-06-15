import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const cleanContent = content.replace(/<(.|\n)*?>/g, '').trim();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!cleanContent) {
      alert("내용을 입력해주세요.");
      return;
    }

    console.log("제목:", title);
    console.log("내용:", content);
    alert("게시글이 등록되었습니다.");
    navigate("/board");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>✏️ 게시글 작성</Typography>
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
            ['bold', 'italic', 'underline', 'list', 'align', 'fontSize'],
          ],
        }}
      />
      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Button variant="contained" onClick={handleSubmit}>
          등록
        </Button>
      </Box>
    </Box>
  );
};

export default BoardWrite;
