package com.shelter.shelter_api.Shelter.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.Shelter.Entity.DefenseShelterEntity;

import java.util.Optional;

public interface DefenseShelterRepository extends JpaRepository<DefenseShelterEntity, Long> {
    Optional<DefenseShelterEntity> findByGid(String gid);
}
