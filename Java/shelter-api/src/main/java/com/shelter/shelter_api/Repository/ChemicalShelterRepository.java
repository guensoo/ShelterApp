package com.shelter.shelter_api.Repository;

import com.shelter.shelter_api.Entity.ChemicalShelterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChemicalShelterRepository extends JpaRepository<ChemicalShelterEntity, Long> {
    Optional<ChemicalShelterEntity> findByUnqVl(String unqVl);
}
