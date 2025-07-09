import { Box, Typography, Paper } from "@mui/material";
import ReportForm from "./ReportForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext"
import { useAlert } from "../../context/AlertContext";

const ReportPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  const { showAlert } = useAlert();
  const [isLoginChecked, setIsLoginChecked] = useState(false); // 🔑

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        showAlert({
          icon: "warning",
          title: "로그인이 필요합니다.",
          text: "로그인 후 이용해주세요.",
        }).then(() => {
          navigate("/login");
        });
      } else {
        setIsLoginChecked(true);
      }
    }
  }, [isLoading, isLoggedIn, navigate, showAlert]);

  if (!isLoginChecked) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 4,
          bgcolor: "#ffffff",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          📢 제보합니다
        </Typography>
        <Typography mb={3} align="center">
          운영 종료, 잘못된 위치 등 이상이 있는 쉼터를 알려주세요.
        </Typography>

        <ReportForm />
      </Paper>
    </Box>
  );
};

export default ReportPage;
