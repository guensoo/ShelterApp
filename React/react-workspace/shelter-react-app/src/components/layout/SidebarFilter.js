import { useState } from "react";
import { Box, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";

// 필터 항목 (추후 type, label, icon 등 확장 가능)
const FILTER_OPTIONS = [
  { value: "HEAT", label: "무더위쉼터" },
  { value: "COLD", label: "한파쉼터" },
  { value: "EARTHQUAKE_TSUNAMI", label: "지진/해일 대피소" },
  { value: "CHEMICAL", label: "화학 대피소" },
  { value: "CIVIL_DEFENSE", label: "민방위 대피소" },
];

const SidebarFilter = ({ selected, onChange }) => {
  const [checked, setChecked] = useState(selected ? [selected] : []);

  const handleToggle = (value) => {
    let newChecked;
    if (checked.includes(value)) {
      newChecked = checked.filter((item) => item !== value);
    } else {
      newChecked = [...checked, value];
      if (newChecked.length > 3) {
        const ok = window.confirm("3개 이상 필터를 선택하면 페이지가 느려집니다.\n계속 하시겠습니까?");
        if (!ok) return;
      }
    }
    setChecked(newChecked);
    onChange(newChecked.join(","));
  };

  return (
    <Box
      sx={{
        minWidth: 140,
        maxWidth: 220,
        p: 2,
        borderRight: "1px solid #eee",
        bgcolor: "#fafafa",
        height: "100%",
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        쉼터 유형 필터
      </Typography>
      <FormGroup>
        {FILTER_OPTIONS.map((opt) => (
          <FormControlLabel
            key={opt.value}
            control={
              <Checkbox
                checked={checked.includes(opt.value)}
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
