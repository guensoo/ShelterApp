package com.shelter.shelter_api.Repository;

import com.shelter.shelter_api.Entity.HeatShelterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HeatShelterRepository extends JpaRepository<HeatShelterEntity, Long> {
    List<HeatShelterEntity> findByRstrFcltyNo(String rstrFcltyNo);


}
