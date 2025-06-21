package com.shelter.shelter_api.Repository;

import com.shelter.shelter_api.Entity.EarthquakeShelterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EarthquakeShelterRepository extends JpaRepository<EarthquakeShelterEntity, Long> {
    Optional<EarthquakeShelterEntity> findByThingsMngNo(String thingsMngNo);
}
