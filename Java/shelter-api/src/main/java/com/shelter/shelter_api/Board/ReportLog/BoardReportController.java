package com.shelter.shelter_api.Board.ReportLog;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.User.entity.UserEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
@Tag(name = "게시글 신고 API", description = "게시글 신고 기능")
public class BoardReportController {

    private final BoardReportService boardReportService;

    @Operation(
            summary = "게시글 신고",
            description = "게시글을 신고합니다. JWT 인증 필요."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "신고 접수 성공"),
            @ApiResponse(responseCode = "409", description = "이미 신고한 게시글")
        })
    @PostMapping
    public ResponseEntity<?> reportBoard(
        @RequestBody BoardReportRequestDTO dto,
        @AuthenticationPrincipal UserEntity user
    ) {
        try {
        	boardReportService.reportBoard(dto.getBoardId(), user.getUsername(), dto.getReason());
            return ResponseEntity.ok().body("신고가 접수되었습니다.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }
}