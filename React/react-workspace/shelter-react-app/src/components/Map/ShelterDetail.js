import { Box, Typography, Divider, Button, Stack } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useFavorite } from "../../context/FavoriteContext";
import { useNavigate } from "react-router-dom"; // ✅ 추가

const ShelterDetail = ({ shelter, onClose }) => {
  const navigate = useNavigate(); // ✅ 추가
  const { toggleFavorite, isFavorited } = useFavorite();
  if (!shelter) return null;

  const isLiked = isFavorited(shelter.id);

  const handleFavoriteClick = () => {
    const isLoggedIn = Boolean(localStorage.getItem("user")); // ✅ 로그인 여부 판단 (예시)
    if (!isLoggedIn) {
      const confirmLogin = window.confirm("로그인이 필요합니다. 로그인하시겠습니까?");
      if (confirmLogin) {
        navigate("/login"); // ✅ 로그인 페이지로 이동
      }
      return;
    }

    toggleFavorite(shelter); // 로그인 된 경우만 즐겨찾기 동작
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          minWidth: 320, maxWidth: 400,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 6,
          p: 3,
        }}
        onClick={e => e.stopPropagation()}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {shelter.name || "우리 무더위 쉼터"}
          </Typography>
          <Button
            onClick={handleFavoriteClick} // ✅ 여기에 핸들러 연결
            sx={{ minWidth: "auto", padding: 0 }}
          >
            {isLiked ? <StarIcon sx={{ color: "#FFD700" }} /> : <StarBorderIcon sx={{ color: "#999" }} />}
          </Button>
        </Box>

        <Divider sx={{ mb: 1 }} />

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <RoomIcon fontSize="small" color="action" />
          <Typography variant="body2">{shelter.addr || "주소 없음"}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <PeopleIcon fontSize="small" color="action" />
          <Typography variant="body2">수용인원: {shelter.capacity || "미확인"}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <InfoIcon fontSize="small" color="action" />
          <Typography variant="body2">운영시간: {shelter.openTime || "정보 없음"}</Typography>
        </Stack>
        {shelter.phone && (
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
            <PhoneIcon fontSize="small" color="action" />
            <Typography variant="body2">{shelter.phone}</Typography>
          </Stack>
        )}
        {shelter.note && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {shelter.note}
          </Typography>
        )}
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {shelter.addr && (
            <Button
              variant="contained"
              size="small"
              color="primary"
              href={`https://map.naver.com/p/search/${encodeURIComponent(shelter.addr)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              길찾기
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
          >
            닫기
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ShelterDetail;
