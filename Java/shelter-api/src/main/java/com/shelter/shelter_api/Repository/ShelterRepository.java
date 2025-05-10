package com.shelter.shelter_api.Repository;

import com.shelter.shelter_api.Entity.ShelterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterRepository extends JpaRepository<ShelterEntity, Long> {
}
