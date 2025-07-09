package com.shelter.shelter_api.Board.ReportLog;

import lombok.Data;

@Data
public class BoardReportRequestDTO {
    private Long boardId;
    private String reason; // (필요하면 신고 사유)
}
