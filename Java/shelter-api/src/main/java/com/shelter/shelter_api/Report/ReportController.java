package com.shelter.shelter_api.Report;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/report")
public class ReportController {

    private final ReportService reportService;

    @PostMapping("")
    public ResponseEntity<?> report(
        @RequestBody ReportRequestDTO dto,
        @AuthenticationPrincipal String username
    ) {
        String reporter = (username != null) ? username : "anonymous";
        reportService.saveReport(dto, reporter);
        return ResponseEntity.ok("제보가 등록되었습니다.");
    }

    @GetMapping("/admin")
    public ResponseEntity<List<ReportEntity>> getAllReports() {
        return ResponseEntity.ok(reportService.findAllReports());
    }
    
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteReport(
        @PathVariable("id") Long id,
        @AuthenticationPrincipal String username
    ) {
        reportService.deleteById(id);
        return ResponseEntity.ok("삭제되었습니다.");
    }
}