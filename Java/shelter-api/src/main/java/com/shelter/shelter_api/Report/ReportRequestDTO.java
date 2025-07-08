package com.shelter.shelter_api.Report;

import lombok.Data;

@Data
public class ReportRequestDTO {
    private String shelterName;
    private String shelterType;
    private String reportType;
    private String content;
    private boolean agreed;
}
