package com.shelter.shelter_api.Shelter.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class ShelterDetailDTO {
    private String type;   // HEAT, COLD, ...
    private Long id;       // 쉼터 PK
    private String name;   // 쉼터 이름
    private String addr;   // 주소
    // 필요시 전화번호, 위치, 등등 추가
}