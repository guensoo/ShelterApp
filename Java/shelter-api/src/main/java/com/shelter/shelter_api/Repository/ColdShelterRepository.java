package com.shelter.shelter_api.Repository;

import com.shelter.shelter_api.Entity.ColdShelterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ColdShelterRepository extends JpaRepository<ColdShelterEntity, Long> {
    Optional<ColdShelterEntity> findByReareFcltNo(String reareFcltNo);
}
