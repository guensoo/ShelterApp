package com.shelter.shelter_api.Board.Board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardFileDTO {
    private String url;               // S3 업로드 후 받은 파일 URL
    private String originalFilename;  // 사용자가 업로드한 원본 파일명
}
