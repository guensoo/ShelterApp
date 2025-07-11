package com.shelter.shelter_api.Board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
@Tag(name = "파일 업로드 API", description = "S3 파일 업로드")
public class FileController {

    private final S3Service s3Service;

    @Operation(
            summary = "파일 업로드",
            description = "단일 파일을 S3에 업로드합니다. 성공 시 파일의 URL을 반환합니다."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "업로드 성공(파일 URL 반환)"),
            @ApiResponse(responseCode = "500", description = "서버 오류/업로드 실패")
        })
    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        try {
            String url = s3Service.uploadFile(file);
            return ResponseEntity.ok(url); // 이 URL을 DB에 저장해도 되고 바로 사용해도 됨
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("업로드 실패: " + e.getMessage());
        }
    }
}