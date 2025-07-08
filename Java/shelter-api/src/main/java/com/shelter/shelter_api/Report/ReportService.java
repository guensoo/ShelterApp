package com.shelter.shelter_api.Report;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    @Transactional
    public ReportEntity saveReport(ReportRequestDTO dto, String username) {
    	ReportEntity report = ReportEntity.builder()
            .username(username)
            .shelterName(dto.getShelterName())
            .shelterType(dto.getShelterType())
            .reportType(dto.getReportType())
            .content(dto.getContent())
            .agreed(dto.isAgreed())
            .build();
        return reportRepository.save(report);
    }

    @Transactional(readOnly = true)
    public List<ReportEntity> findAllReports() {
        return reportRepository.findAll();
    }
    
    @Transactional
    public void deleteById(Long id) {
        reportRepository.deleteById(id);
    }
}
