import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim() === "") return;
    onSearch(keyword.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 🔥 기본 제출 막기
    handleSearch();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit} // 🔥 Enter 누를 때 실행됨
      sx={{
        width: "100%",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fff",
      }}
    >
      <TextField
        label="주소·지역·쉼터명 검색"
        variant="outlined"
        size="small"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ width: 320, maxWidth: "80vw" }}
      />
      <IconButton
        type="submit" // 🔥 이 버튼도 form 제출용
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: 0,
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
