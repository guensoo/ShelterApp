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
@Table(name = "chemical_shelter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChemicalShelterEntity {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	 private String sn;                   // 순번
	 private String ctprvnNm;             // 시도명
	 private String sggNm;                // 시군구명
	 private String shntFcltSenu;         // 대피시설순번
	 private String fcltSe;               // 시설구분
	 private String shntPlcNm;            // 대피장소명
	 private String fcltDtlnm;            // 시설상세명
	 private String ronaDaddr;            // 도로명주소
	 private Double lat;                  // 위도
	 private Double lot;                  // 경도
	 private Double actcArea;             // 수용면적
	 private Integer actcTnop;            // 수용인원
	 private String dtinCrtrYmd;          // 데이터기준일자
	 private String sipoInstlAgre;        // 표지판설치동의
	 private String rmrk;                 // 비고
	 private String dtlCd2;               // 상세코드2
	 private String dtlCd1;               // 상세코드1
	 private String unqVl;                // 고유값
	 private String instlYr;              // 설치년도
	 private String instCd;               // 기관코드
	 private String stdgNm;               // 법정동명
	 private String stdgCd;               // 법정동코드
	 private String ronaDaddrCd;          // 도로명주소코드
	 private String instlObjeTypeCd;      // 설치물유형코드
	 private String delYn;                // 삭제여부
	 private String frstRegDt;            // 최초등록일시
	 private String cmptncInstNm;         // 관할기관명
}
