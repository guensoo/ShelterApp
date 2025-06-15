import {
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  TextareaAutosize,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    shelterName: '',
    shelterType: '',
    reportType: '',
    description: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("제보 내용 수집에 동의해야 제출할 수 있습니다.");
      return;
    }

    console.log("📨 제출된 제보:", formData);
    alert("제보가 성공적으로 제출되었습니다!");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {/* 쉼터 이름 */}
      <TextField
        name="shelterName"
        label="쉼터 이름"
        fullWidth
        required
        value={formData.shelterName}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      {/* 쉼터 종류 */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="shelter-type-label">쉼터 종류</InputLabel>
        <Select
          labelId="shelter-type-label"
          name="shelterType"
          value={formData.shelterType}
          label="쉼터 종류"
          onChange={handleChange}
          required
        >
          <MenuItem value="HEAT">무더위쉼터</MenuItem>
          <MenuItem value="COLD">한파쉼터</MenuItem>
          <MenuItem value="CIVIL_DEFENSE">민방위 대피소</MenuItem>
          <MenuItem value="CHEMICAL">화학재난 대피소</MenuItem>
          <MenuItem value="EARTHQUAKE_TSUNAMI">지진해일 대피소</MenuItem>
        </Select>
      </FormControl>

      {/* 제보 유형 */}
      <FormControl sx={{ mb: 2 }}>
        <FormLabel>제보 유형</FormLabel>
        <RadioGroup
          name="reportType"
          value={formData.reportType}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="closed" control={<Radio />} label="운영 종료" />
          <FormControlLabel value="wrong_location" control={<Radio />} label="위치 오류" />
          <FormControlLabel value="info_update" control={<Radio />} label="정보 수정 요청" />
        </RadioGroup>
      </FormControl>

      {/* 상세 내용 */}
      <TextareaAutosize
        name="description"
        placeholder="상세 내용을 입력해주세요"
        minRows={5}
        style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '16px' }}
        value={formData.description}
        onChange={handleChange}
        required
      />

      {/* 동의 체크 */}
      <FormControlLabel
        control={
          <Checkbox
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
        }
        label="제보 내용 수집에 동의합니다."
      />

      {/* 제출 버튼 */}
      <Box mt={2}>
        <Button type="submit" variant="contained">제보하기</Button>
      </Box>
    </Box>
  );
};

export default ReportForm;
