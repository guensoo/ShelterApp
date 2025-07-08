package com.shelter.shelter_api.Shelter.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.Shelter.Entity.EarthquakeShelterEntity;

import java.util.Optional;

public interface EarthquakeShelterRepository extends JpaRepository<EarthquakeShelterEntity, Long> {
    Optional<EarthquakeShelterEntity> findByThingsMngNo(String thingsMngNo);
}
