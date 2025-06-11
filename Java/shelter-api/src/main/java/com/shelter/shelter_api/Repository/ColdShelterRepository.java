package com.shelter.shelter_api.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shelter.shelter_api.Entity.ColdShelterEntity;


@Repository
public interface ColdShelterRepository extends JpaRepository<ColdShelterEntity, Long>{

}
