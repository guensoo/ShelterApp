import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Card, CardContent, Grid, Divider, Modal,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import { fetchReports , deleteReport } from "../../api/report"; // ✅ 만들기

const ReportAdmin = () => {
  const { isAdmin, isLoggedIn, isLoading } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        showAlert({ title: "권한이 없습니다.", icon: "warning" }).then(() => navigate("/login", { replace: true }));
        return;
      }
      if (!isAdmin) {
        showAlert({ title: "관리자만 접근 가능합니다.", icon: "error" }).then(() => navigate("/", { replace: true }));
      }
    }
  }, [isLoading, isLoggedIn, isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      fetchReports().then(setReports).catch(console.error); // ✅ 제보 목록 가져오기
    }
  }, [isAdmin]);

  const handleDelete = async (id) => {
    const confirm = await showAlert({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
    });
    if (confirm.isConfirmed) {
      try {
        await deleteReport(id);
        setReports((prev) => prev.filter((r) => r.id !== id));
        setSelected(null);
        showAlert({ title: "삭제되었습니다.", icon: "success" });
      } catch (e) {
        showAlert({ title: "삭제 실패", icon: "error" });
      }
    }
  };

  if (isLoading || !isLoggedIn || !isAdmin) return null;

  return (
    <Box sx={{ p: 4, maxWidth: "960px", mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🚨 쉼터 제보 목록
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {reports.length === 0 ? (
        <Typography color="text.secondary">등록된 제보가 없습니다.</Typography>
      ) : (
        <Grid container spacing={3}>
          {reports.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card sx={{ border: "1px solid #ddd", borderRadius: 2 }}>
                <CardContent>
                  <Typography fontWeight="bold">{item.shelterName}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    유형: {item.reportType} / 제보자: {item.username}
                  </Typography>
                  <Typography noWrap>{item.content}</Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                    <Button variant="contained" onClick={() => setSelected(item)}>
                      상세 보기
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ✅ 상세 모달 */}
      <Modal open={!!selected} onClose={() => setSelected(null)} sx={{ zIndex: 1000 }}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            📋 제보 상세 정보
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography>제보자: {selected?.username}</Typography>
          <Typography>쉼터명: {selected?.shelterName}</Typography>
          <Typography>쉼터 유형: {selected?.shelterType}</Typography>
          <Typography>제보 유형: {selected?.reportType}</Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", mt: 2 }}>
            {selected?.content}
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={() => setSelected(null)}>닫기</Button>
            <Button color="error" onClick={() => handleDelete(selected.id)}>
              삭제
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

export default ReportAdmin;
