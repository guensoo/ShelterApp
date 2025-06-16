import { Box, Typography, Divider, Button, Stack } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';

const ShelterDetail = ({ shelter, onClose }) => {
  if (!shelter) return null;

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
      onClick={onClose} // 배경 클릭 시 닫힘
    >
      <Box
        sx={{
          minWidth: 320, maxWidth: 400,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 6,
          p: 3,
        }}
        onClick={e => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
          {shelter.name || "우리 무더위 쉼터"}
        </Typography>
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
              variant="contained" // ✅ 파란 배경
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
            variant="outlined" // ✅ 흰 배경 + 테두리
            size="small"
            color="inherit"    // ✅ 검정 글씨
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
