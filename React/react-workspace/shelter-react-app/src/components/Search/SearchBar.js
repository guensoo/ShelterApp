import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim() === "") return;
    onSearch(keyword.trim()); // 부모(MainPage)에 전달
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height : "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // py: 2,
        bgcolor: "#fff",
      }}
    >
      <TextField
        label="주소·지역·쉼터명 검색"
        variant="outlined"
        size="small"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ width: 320, maxWidth: "80vw" }}
      />
      <IconButton onClick={handleSearch} sx={{ ml: 1 }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
