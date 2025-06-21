package com.shelter.shelter_api.Repository;

import com.shelter.shelter_api.Entity.DefenseShelterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DefenseShelterRepository extends JpaRepository<DefenseShelterEntity, Long> {
    Optional<DefenseShelterEntity> findByGid(String gid);
}
