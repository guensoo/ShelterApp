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
@Table(name = "defense_shelter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DefenseShelterEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String gid;              // GID
    private String shltNm;           // 대피소명
    private String daddr;            // 상세주소
    private String roadNmAddr;       // 도로명주소
    private Double lat;              // 위도
    private Double lot;              // 경도
    private String mngInstTlhn;      // 관리기관 전화
    private String mngInstNm;        // 관리기관명
    private Integer fcar;            // 시설면적
}
