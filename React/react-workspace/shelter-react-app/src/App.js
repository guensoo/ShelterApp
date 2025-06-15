import { Box } from "@mui/material";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ReportPage from "./pages/Report/ReportPage";
import BoardMain from "./pages/Board/BoardMain";
import BoardDetail from "./pages/Board/BoardDetail";
// import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import BoardWrite from "./pages/Board/BoardWrite";
import BoardEdit from './pages/Board/BoardEdit';

function App() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Header
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/board" element={<BoardMain />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/board/edit/:id" element={<BoardEdit />} />
          <Route path="/board/write" element={<BoardWrite />} />
        </Routes>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

export default App;
