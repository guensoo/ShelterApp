import { useState, useEffect, useContext } from "react";
import { Box, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { ShelterFilterContext } from "../../context/ShelterFilterContext";

const FILTER_OPTIONS = [
  { value: "ALL", label: "전체" },
  { value: "HEAT", label: "무더위쉼터" },
  { value: "COLD", label: "한파쉼터" },
  { value: "EARTHQUAKE_TSUNAMI", label: "지진/해일 대피소" },
  { value: "CHEMICAL", label: "화학 대피소" },
  { value: "CIVIL_DEFENSE", label: "민방위 대피소" },
];

const SidebarFilter = () => {
  const { selectedTypes, setSelectedTypes } = useContext(ShelterFilterContext);
  const ALL_VALUES = FILTER_OPTIONS.filter(f => f.value !== "ALL").map(f => f.value);

  const isAllSelected = ALL_VALUES.every(type => selectedTypes.includes(type));
  const [checked, setChecked] = useState(selectedTypes || []);

  useEffect(() => {
    setChecked(selectedTypes);
  }, [selectedTypes]);

  const handleToggle = (value) => {
    let newChecked = [...checked];

    if (value === "ALL") {
      if (isAllSelected) {
        newChecked = [];
      } else {
        // ✅ 전체 선택 시 confirm 조건 확인
        if (ALL_VALUES.length > 3) {
          const ok = window.confirm("전체를 선택하면 페이지가 느려질 수 있습니다.\n계속 하시겠습니까?");
          if (!ok) return;
        }
        newChecked = [...ALL_VALUES];
      }
    } else {
      if (checked.includes(value)) {
        newChecked = checked.filter(item => item !== value);
      } else {
        newChecked = [...checked, value];
        if (newChecked.length >= 3) {
          const ok = window.confirm("3개 이상 필터를 선택하면 페이지가 느려질 수 있습니다.\n계속 하시겠습니까?");
          if (!ok) return;
        }
      }
    }

    setChecked(newChecked);
    setSelectedTypes(newChecked);
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
        쉼터 필터
      </Typography>
      <FormGroup>
        {FILTER_OPTIONS.map((opt) => (
          <FormControlLabel
            key={opt.value}
            control={
              <Checkbox
                checked={
                  opt.value === "ALL"
                    ? isAllSelected
                    : checked.includes(opt.value)
                }
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
