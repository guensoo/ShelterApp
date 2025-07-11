package com.shelter.shelter_api.Report;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/report")
@Tag(name = "제보/신고 API", description = "이상/불편 신고 및 관리자 제보 관리")
public class ReportController {

    private final ReportService reportService;

    @Operation(
            summary = "이상/불편 신고 등록",
            description = "제보 내용을 등록합니다. 로그인하지 않은 사용자는 'anonymous'로 저장됩니다."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "제보 등록 성공")
        })
    @PostMapping("")
    public ResponseEntity<?> report(
        @RequestBody ReportRequestDTO dto,
        @AuthenticationPrincipal String username
    ) {
        String reporter = (username != null) ? username : "anonymous";
        reportService.saveReport(dto, reporter);
        return ResponseEntity.ok("제보가 등록되었습니다.");
    }

    @Operation(
            summary = "[관리자] 제보 전체 조회",
            description = "모든 신고/제보 목록을 조회합니다. (관리자용)"
        )
        @ApiResponse(responseCode = "200", description = "제보 목록 조회 성공")
    @GetMapping("/admin")
    public ResponseEntity<List<ReportEntity>> getAllReports() {
        return ResponseEntity.ok(reportService.findAllReports());
    }
    
    @Operation(
            summary = "[관리자] 제보 삭제",
            description = "특정 제보를 삭제합니다. (관리자용)"
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "삭제 성공"),
            @ApiResponse(responseCode = "404", description = "해당 제보 없음")
        })
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteReport(
        @PathVariable("id") Long id,
        @AuthenticationPrincipal String username
    ) {
        reportService.deleteById(id);
        return ResponseEntity.ok("삭제되었습니다.");
    }
}