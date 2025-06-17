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
@Table(name = "heat_shelter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeatShelterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rstrFcltyNo;          // 쉼터시설번호
    private String year;                 // 년도
    private String arcd;                 // 지역코드
    private String fcltyTy;              // 시설유형 중분류
    private String rstrNm;               // 쉼터명칭
    private String dtlAdres;             // 상세주소
    private String ar;                   // 면적
    private String usePsblNmpr;          // 이용가능인원
    private String colrHoldElefn;        // 냉방기보유선풍기
    private String colrHoldArcntdn;      // 냉방기보유에어컨
    private String chckMatterNightOpnAt; // 점검사항야간개방여부
    private String inptTime;             // 입력시간
    private String modfTime;             // 수정시간
    private String useAt;                // 사용여부
    private String rm;                   // 비고
    private String rnDtlAdres;           // 도로명상세주소
    private String chckMatterWkendHdayOpnAt; // 점검사항주말휴일개방여부
    private String operBeginDe;          // 운영시작일자
    private String operEndDe;            // 운영종료일자
    private String mngdptCd;             // 관리부서코드
    private String chckMatterStayngPsblAt;   // 점검사항숙박가능여부
    private String xcord;                // X좌표
    private String ycord;                // Y좌표
    private String lo;                   // 경도
    private String la;                   // 위도
    private String fcltyOprnAt;          // 운영여부
    private String dtlPosition;          // 위치상세
    private String wkdayOperBeginTime;   // 평일운영시작시간
    private String wkdayOperEndTime;     // 평일운영종료시간
    private String wkendHdayOperBeginTime;   // 주말휴일운영시작시간
    private String wkendHdayOperEndTime; // 주말휴일운영종료시간
    private String fcltySclas;           // 시설유형 소분류
}
