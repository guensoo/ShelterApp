import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: "35px",
        px: 2,
        padding: 1,
        bgcolor: "#fafafa",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 14,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} 쉼:터 | All rights reserved.
      </Typography>
      <Box sx={{ textAlign: "center", flexGrow: 1 }}>
        <Typography variant="caption" color="textSecondary">
          본 서비스는 공공데이터포털 API와 NAVER 지도 API를 기반으로 제작된 비영리 프로젝트입니다.
        </Typography>
      </Box>
      <IconButton
        component="a"
        href="https://www.instagram.com/chbk9195"
        target="_blank"
        rel="noopener"
        size="small"
      >
        <InstagramIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;
