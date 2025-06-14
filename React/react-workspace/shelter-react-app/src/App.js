import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Footer from './components/layout/Footer';

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",              // 전체 높이를 화면에 맞춤
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",             // 좌우 스크롤 제거
      }}
    >
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* 이 안에 실제 페이지들 */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
