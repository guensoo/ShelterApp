package com.shelter.shelter_api.Report;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "report")
public class ReportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 제보자 정보 (선택)
    private String username; // userId(혹은 username) 저장

    @Column(nullable = false)
    private String shelterName;   // 쉼터 이름

    @Column(nullable = false)
    private String shelterType;   // 쉼터 종류 (예: 한파쉼터, 무더위쉼터 등)

    @Column(nullable = false)
    private String reportType;    // 제보 유형 (운영종료, 위치 오류, 정보 수정 요청 등)

    @Column(nullable = false, length = 2000)
    private String content;       // 상세 내용

    private boolean agreed;       // 수집 동의 체크

    @Column(nullable = false, updatable = false)
    private java.time.LocalDateTime createdAt;
    
    // 생성시 자동 입력
    @PrePersist
    public void prePersist() {
        this.createdAt = java.time.LocalDateTime.now();
    }
}