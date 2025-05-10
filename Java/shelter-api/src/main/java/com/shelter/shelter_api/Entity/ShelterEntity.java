package com.shelter.shelter_api.Entity;

import com.shelter.shelter_api.Enum.ShelterType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shelter")
public class ShelterEntity {

    @Id
    // ORACLE 쓸지 MySQL 쓸지 몰라서 AUTO로 둡니다...
    @GeneratedValue(strategy = GenerationType.AUTO)
    // PK 사용합니다.
    private Long id;

    // 대피소, 쉼터 이름
    @Column(name = "name")
    private String name;

    // 지역명
    @Column(name = "area")
    private String area;

    // 위도
    private double lat;

    // 경도
    private double lng;

    // 설명
    @Column(name = "info")
    private String info;

    // 쉼터 타입(더위, 한파, 대피소)
    @Enumerated(EnumType.STRING)
    private ShelterType type;

}
