package com.shelter.shelter_api.Shelter.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.Shelter.Entity.ChemicalShelterEntity;

import java.util.Optional;

public interface ChemicalShelterRepository extends JpaRepository<ChemicalShelterEntity, Long> {
    Optional<ChemicalShelterEntity> findByUnqVl(String unqVl);
}
