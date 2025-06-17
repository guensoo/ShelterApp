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

    private String thingsMngNo;  // 사물관리번호 (THINGS_MNG_NO)
    private String thingsNm;     // 사물명 (THINGS_NM)
    private String addr;         // 주소 (ADDR)
    private String ctpvNm;       // 시도명 (CTPV_NM)
    private String sggNm;        // 시군구명 (SGG_NM)
    private String emdNm;        // 읍면동명 (EMD_NM)
    private String roadNm;       // 도로명 (ROAD_NM)

    private Double lon;          // 경도 (XMAP_CRTS or GEOM에서 파싱)
    private Double lat;          // 위도 (YMAP_CRTS or GEOM에서 파싱)

    private String geom;         // GEOM (POINT 타입 원본, 필요시)
}
