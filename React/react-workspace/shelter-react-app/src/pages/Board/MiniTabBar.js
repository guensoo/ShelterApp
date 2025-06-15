// src/pages/Board/MiniTabBar.js

import { Box, Button } from "@mui/material";

const MiniTabBar = ({ activeTab, onTabChange }) => {
  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
      <Button
        variant={activeTab === "free" ? "contained" : "outlined"}
        onClick={() => onTabChange("free")}
      >
        전체글
      </Button>
      <Button
        variant={activeTab === "notice" ? "contained" : "outlined"}
        onClick={() => onTabChange("notice")}
      >
        공지사항
      </Button>
    </Box>
  );
};

export default MiniTabBar;
