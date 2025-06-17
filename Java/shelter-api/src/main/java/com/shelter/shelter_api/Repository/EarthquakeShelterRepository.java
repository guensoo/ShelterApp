package com.shelter.shelter_api.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.Entity.EarthquakeShelterEntity;

public interface EarthquakeShelterRepository extends JpaRepository<EarthquakeShelterEntity, Long> {

}
