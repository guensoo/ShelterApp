import { useDropzone } from 'react-dropzone';
import { Box, Typography, Grid } from '@mui/material';
import { useState, useCallback } from 'react';
import { uploadFileToS3 } from '../../api/board';

const ImageDrop = ({ onFilesSelected }) => {
    const [previews, setPreviews] = useState([]);

    const uploadToS3 = async (file) => {
        return await uploadFileToS3(file); // 내부에서 await 처리
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        setPreviews(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        try {
            const uploadPromises = acceptedFiles.map(file => uploadToS3(file));
            const uploadedUrls = await Promise.all(uploadPromises);

            // URL과 파일명 같이 객체 배열로 만들기
            const filesWithNames = uploadedUrls.map((url, idx) => ({
                url,
                originalFilename: acceptedFiles[idx].name,
            }));

            onFilesSelected(filesWithNames);
        } catch (err) {
            console.error("파일 업로드 중 오류:", err);
            alert("파일 업로드에 실패했습니다.");
        }
    }, [onFilesSelected]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] }
    });

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