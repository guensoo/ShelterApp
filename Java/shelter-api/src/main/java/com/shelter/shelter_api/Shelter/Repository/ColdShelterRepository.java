package com.shelter.shelter_api.Shelter.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.Shelter.Entity.ColdShelterEntity;

import java.util.Optional;

public interface ColdShelterRepository extends JpaRepository<ColdShelterEntity, Long> {
    Optional<ColdShelterEntity> findByReareFcltNo(String reareFcltNo);
}
