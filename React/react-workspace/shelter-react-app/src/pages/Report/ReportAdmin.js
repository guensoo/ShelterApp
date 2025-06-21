import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";

const ReportAdmin = () => {
  const { isAdmin, isLoggedIn, isLoading } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        showAlert({
          title: "권한이 없습니다.",
          icon: "warning",
        }).then(() => {
          navigate("/login", { replace: true });
        });
        return;
      }
      if (!isAdmin) {
        showAlert({
          title: "관리자만 접근 가능합니다.",
          icon: "error",
        }).then(() => {
          navigate("/", { replace: true });
        });
      }
    }
  }, [isLoading, isLoggedIn, isAdmin, navigate, showAlert]);

  useEffect(() => {
    if (isAdmin) {
      const dummyReports = JSON.parse(localStorage.getItem("qnaList") || "[]");
      const reportedOnly = dummyReports.filter((q) => q.isReported);
      setReports(reportedOnly);
    }
  }, [isAdmin]);

  if (isLoading || !isLoggedIn || !isAdmin) return null;

  return (
    <Box sx={{ p: 4, maxWidth: "960px", mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🚨 신고된 Q&A
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {reports.length === 0 ? (
        <Typography color="text.secondary">신고된 게시글이 없습니다.</Typography>
      ) : (
        <Grid container spacing={3}>
          {reports.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card
                sx={{
                  transition: "all 0.3s",
                  "&:hover": { boxShadow: 6 },
                  border: "1px solid #ddd",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    작성자: {item.writer}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      mt: 1,
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.content}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      onClick={() =>
                        navigate(`/customer/qna/${item.id}/admin`)
                      }
                    >
                      상세 보기
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ReportAdmin;
