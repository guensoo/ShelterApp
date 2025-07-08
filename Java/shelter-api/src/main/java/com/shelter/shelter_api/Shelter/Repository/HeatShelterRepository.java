package com.shelter.shelter_api.Shelter.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.Shelter.Entity.HeatShelterEntity;

import java.util.List;

public interface HeatShelterRepository extends JpaRepository<HeatShelterEntity, Long> {
    List<HeatShelterEntity> findByRstrFcltyNo(String rstrFcltyNo);


}
