package com.shelter.shelter_api.Board.ReportLog;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.User.entity.UserEntity;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class BoardReportController {

    private final BoardReportService boardReportService;

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