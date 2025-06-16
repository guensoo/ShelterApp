// src/components/Map/ShelterDetail.js
import { Box, Typography } from "@mui/material";

const ShelterDetail = ({ shelter }) => {
  if (!shelter) return null;

  return (
    <Box sx={{
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: 2,
      padding: 2,
      boxShadow: 3,
      zIndex: 1000,
      minWidth: 260,
    }}>
      <Typography variant="h6">{shelter.name}</Typography>
      <Typography variant="body2">📍 {shelter.addr || "주소 없음"}</Typography>
      <Typography variant="body2">🕒 운영시간: {shelter.openTime || "정보 없음"}</Typography>
      <Typography variant="body2">👥 수용인원: {shelter.capacity || "미확인"}</Typography>
    </Box>
  );
};

export default ShelterDetail;
