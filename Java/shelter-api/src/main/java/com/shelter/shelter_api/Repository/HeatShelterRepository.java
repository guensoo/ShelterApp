package com.shelter.shelter_api.Repository;

import com.shelter.shelter_api.Entity.HeatShelterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HeatShelterRepository extends JpaRepository<HeatShelterEntity, Long> {
    Optional<HeatShelterEntity> findByRstrFcltyNo(String rstrFcltyNo);
}
