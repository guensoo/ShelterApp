package com.shelter.shelter_api.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cold_shelter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ColdShelterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reareFcltNo;         // 쉼터시설번호
    private String fcltType;            // 시설유형 중분류
    private String reareNm;             // 쉼터명칭
    private String daddr;               // 상세주소
    private Integer utztnPsbltyTnop;    // 이용가능인원
    private String mdfcnHr;             // 수정시간
    private String rmrk;                // 비고
    private String ronaDaddr;           // 도로명상세주소

    private String wkdyOperBgngHr;      // 평일운영시작시간
    private String wkdyOperEndHr;       // 평일운영종료시간

    private Double lot;                 // 경도
    private Double lat;                 // 위도

    private String sndyOperBgngHr;      // 일요일운영시작시간
    private String sndyOperEndHr;       // 일요일운영종료시간
    private String stdyOperBgngHr;      // 토요일운영시작시간
    private String stdyOperEndHr;       // 토요일운영종료시간
    private String lhldyOperBgngHr;     // 공휴일운영시작시간
    private String lhldyOperEndHr;      // 공휴일운영종료시간
    private String fcltySclas;          // 시설유형 소분류
}
