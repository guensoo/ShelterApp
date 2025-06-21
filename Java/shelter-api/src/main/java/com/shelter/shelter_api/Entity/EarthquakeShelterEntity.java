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
@Table(name = "earthquake_shelter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EarthquakeShelterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String thingsMngNo;  // 사물관리번호
    private String thingsNm;     // 사물명

    private String ctpvNm;       // 시도명
    private String sggNm;        // 시군구명
    private String emdNm;        // 읍면동명
    private String roadNm;       // 도로명

    private Integer addrMno;     // 주소 본번
    private Integer addrSno;     // 주소 부번

    private Double lon;          // 경도 (XMAP_CRTS)
    private Double lat;          // 위도 (YMAP_CRTS)

    private String geom;         // GEOM 원본 저장
}
