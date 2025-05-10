package com.shelter.shelter_api.DTO;


import com.shelter.shelter_api.Entity.ShelterEntity;
import com.shelter.shelter_api.Enum.ShelterType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShelterDTO {
    private Long id;
    private String name;
    private String area;
    private double lat;
    private double lng;
    private String info;
    private ShelterType type;

    // 생성자(ShelterEntity -> ShelterDTO)
    public ShelterDTO(ShelterEntity entity){
        this.id = entity.getId();
        this.name = entity.getName();
        this.area = entity.getArea();
        this.lat = entity.getLat();
        this.lng = entity.getLng();
        this.info = entity.getInfo();
        this.type = entity.getType();
    }

    // 생성자(ShelterDTO -> ShelterEntity)
    public static ShelterEntity toEntity(ShelterDTO dto){
        return ShelterEntity.builder()
                .id(dto.getId())
                .name(dto.getName())
                .area(dto.getArea())
                .lat(dto.getLat())
                .lng(dto.getLng())
                .info(dto.getInfo())
                .type(dto.getType())
                .build();
    }


}
