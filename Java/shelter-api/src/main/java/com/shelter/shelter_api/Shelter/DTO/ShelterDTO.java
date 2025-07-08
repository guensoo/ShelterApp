package com.shelter.shelter_api.Shelter.DTO;

import com.shelter.shelter_api.Shelter.Entity.ChemicalShelterEntity;
import com.shelter.shelter_api.Shelter.Entity.ColdShelterEntity;
import com.shelter.shelter_api.Shelter.Entity.DefenseShelterEntity;
import com.shelter.shelter_api.Shelter.Entity.EarthquakeShelterEntity;
import com.shelter.shelter_api.Shelter.Entity.HeatShelterEntity;
import com.shelter.shelter_api.Shelter.Enum.ShelterType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShelterDTO {
    private Long id;            // 공통 PK (없으면 null 처리)
    private String name;        // 쉼터명/대피소명
    private String address;     // 도로명(상세주소)
    private Double lat;         // 위도
    private Double lng;         // 경도
    private ShelterType type;   // 쉼터유형
    private String phone;       // 관리기관 전화 (없으면 null)
    private Integer capacity;   // 수용인원 (없으면 null)
    private String remark;      // 비고/추가정보 (옵션)

    private static Double safeParseDouble(String value) {
        if (value == null || value.trim().isEmpty() || value.equalsIgnoreCase("null")) return null;
        try { return Double.parseDouble(value); } catch (Exception e) { return null; }
    }
    private static Integer safeParseInt(String value) {
        if (value == null || value.trim().isEmpty() || value.equalsIgnoreCase("null")) return null;
        try { return Integer.parseInt(value); } catch (Exception e) { return null; }
    }

    // DefenseShelter(민방위)
    public static ShelterDTO fromCivil(DefenseShelterEntity e) {
        return ShelterDTO.builder()
            .id(e.getId())
            .name(e.getShltNm())
            .address(e.getRoadNmAddr() != null ? e.getRoadNmAddr() : e.getDaddr())
            .lat(e.getLat())
            .lng(e.getLot())
            .type(ShelterType.CIVIL_DEFENSE)
            .phone(e.getMngInstTlhn())
            .capacity(e.getFcar()) // 시설면적 또는 수용인원 해당 필드가 fcar일 때
            .remark(null) // 비고 필요하면 엔티티에 추가해서 사용
            .build();
    }

    // HeatShelter(무더위)
    public static ShelterDTO fromHeat(HeatShelterEntity e) {
        return ShelterDTO.builder()
                .id(e.getId())
                .name(e.getRstrNm())
                .address(e.getRnDtlAdres() != null ? e.getRnDtlAdres() : e.getDtlAdres())
                .lat(safeParseDouble(e.getLa()))
                .lng(safeParseDouble(e.getLo()))
                .type(ShelterType.HEAT)
                .phone(null)
                .capacity(safeParseInt(e.getUsePsblNmpr()))
                .remark(e.getRm())
                .build();
    }

    // ColdShelter(한파)
    public static ShelterDTO fromCold(ColdShelterEntity e) {
        return ShelterDTO.builder()
            .id(e.getId())
            .name(e.getReareNm())
            .address(e.getRonaDaddr() != null ? e.getRonaDaddr() : e.getDaddr())
            .lat(e.getLat())
            .lng(e.getLot())
            .type(ShelterType.COLD)
            .phone(null)
            .capacity(e.getUtztnPsbltyTnop())
            .remark(e.getRmrk())
            .build();
    }

    // ChemicalShelter(화학)
    public static ShelterDTO fromChemical(ChemicalShelterEntity e) {
        return ShelterDTO.builder()
            .id(e.getId())
            .name(e.getShntPlcNm())
            .address(e.getRonaDaddr() != null ? e.getRonaDaddr() : e.getFcltDtlnm())
            .lat(e.getLat())
            .lng(e.getLot())
            .type(ShelterType.CHEMICAL)
            .phone(null)
            .capacity(e.getActcTnop())
            .remark(e.getRmrk())
            .build();
    }

    // EarthquakeShelter(지진해일)
    public static ShelterDTO fromEarthquake(EarthquakeShelterEntity e) {
        return ShelterDTO.builder()
                .id(e.getId())
                .name(e.getThingsNm()) // 사물명
                .address(
                        (e.getRoadNm() != null ? e.getRoadNm() : "") +
                                (e.getAddrMno() != null ? " " + e.getAddrMno() : "") +
                                (e.getAddrSno() != null && e.getAddrSno() > 0 ? "-" + e.getAddrSno() : "") +
                                " " + e.getEmdNm() +
                                " " + e.getSggNm() +
                                " " + e.getCtpvNm()
                )
                .lat(e.getLat())
                .lng(e.getLon())
                .type(ShelterType.EARTHQUAKE)
                .phone(null)
                .capacity(null)
                .remark(null)
                .build();
    }
}
