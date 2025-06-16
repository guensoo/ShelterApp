// src/components/common/ImageDropzone.js
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Grid } from '@mui/material';
import { useState, useCallback } from 'react';

const ImageDrop = ({ onFilesSelected }) => {
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setPreviews(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  return (
    <Box {...getRootProps()} sx={{
      p: 3,
      border: '2px dashed #aaa',
      borderRadius: 2,
      textAlign: 'center',
      backgroundColor: isDragActive ? '#eee' : '#fafafa',
      cursor: 'pointer'
    }}>
      <input {...getInputProps()} />
      <Typography>
        {isDragActive ? '여기에 이미지 드롭!' : '여기로 이미지 드래그 또는 클릭해서 선택'}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {previews.map((file, idx) => (
          <Grid item xs={4} key={idx}>
            <img
              src={file.preview}
              alt="preview"
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageDrop;
