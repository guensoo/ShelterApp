import { useState, useEffect, useContext } from "react";
import { Box, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { ShelterFilterContext } from "../../context/ShelterFilterContext";
import { useAlert } from "../../context/AlertContext";

// 전역에서 한 번만 스타일 추가
if (typeof window !== "undefined" && !document.getElementById("swal-zindex-style")) {
  const style = document.createElement("style");
  style.id = "swal-zindex-style";
  style.innerHTML = `
    .custom-swal-popup {
      z-index: 20000 !important;
    }
  `;
  document.head.appendChild(style);
}

const FILTER_OPTIONS = [
  { value: "ALL", label: "전체" },
  { value: "HEAT", label: "무더위쉼터" },
  { value: "COLD", label: "한파쉼터" },
  { value: "EARTHQUAKE", label: "지진/해일 대피소" },
  { value: "CHEMICAL", label: "화학 대피소" },
  { value: "CIVIL_DEFENSE", label: "민방위 대피소" },
];

const SidebarFilter = () => {
  const { selectedTypes, setSelectedTypes } = useContext(ShelterFilterContext);
  const { showAlert } = useAlert();
  const ALL_VALUES = FILTER_OPTIONS.filter(f => f.value !== "ALL").map(f => f.value);

  const isAllSelected = ALL_VALUES.every(type => selectedTypes.includes(type));
  const [checked, setChecked] = useState(selectedTypes || []);

  useEffect(() => {
    setChecked(selectedTypes);
  }, [selectedTypes]);

  const handleToggle = async (value) => {
    // 1. 지진/해일 클릭 시 안내만 (토글X)
    if (value === "EARTHQUAKE") {
      await showAlert({
        icon: "info",
        title: "서비스 준비 중",
        text: "지진/해일 대피소는 현재 서비스 준비 중입니다.",
        confirmButtonText: "확인",
        didOpen: () => {
            const popup = document.querySelector('.swal2-popup');
            if (popup) popup.style.zIndex = '99999';
        }
      });
      return;
    }

    let newChecked = [...checked];

    if (value === "ALL") {
      if (isAllSelected) {
        newChecked = [];
      } else {
        newChecked = [...ALL_VALUES].filter(v => v !== "EARTHQUAKE"); // EARTHQUAKE는 강제 제외
      }
    } else {
      if (checked.includes(value)) {
        newChecked = checked.filter(item => item !== value);
      } else {
        newChecked = [...checked, value];
      }
    }

    // 2개 이상 선택시 경고
    if (newChecked.length > 1) {
      await showAlert({
        icon: "warning",
        title: "알림",
        text: "2개 이상 선택 시 지도가 느려질 수 있습니다.",
        confirmButtonText: "확인",
        didOpen: () => {
            const popup = document.querySelector('.swal2-popup');
            if (popup) popup.style.zIndex = '99999';
        }
      });
    }

    setChecked(newChecked);
    setSelectedTypes(newChecked);
  };

  return (
    <Box sx={{ minWidth: 140, maxWidth: 220, p: 2, borderRight: "1px solid #eee", bgcolor: "#fafafa", height: "100%" }}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>쉼터 필터</Typography>
      <FormGroup>
        {FILTER_OPTIONS.map((opt) => (
          <FormControlLabel
            key={opt.value}
            control={
              <Checkbox
                checked={opt.value === "ALL" ? isAllSelected : checked.includes(opt.value)}
                onChange={() => handleToggle(opt.value)}
              />
            }
            label={opt.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SidebarFilter;
