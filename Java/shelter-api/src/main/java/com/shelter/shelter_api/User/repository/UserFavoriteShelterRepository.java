package com.shelter.shelter_api.User.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.User.UserFavoriteShelterId;
import com.shelter.shelter_api.User.entity.UserFavoriteShelter;

public interface UserFavoriteShelterRepository
    extends JpaRepository<UserFavoriteShelter, UserFavoriteShelterId> {

    List<UserFavoriteShelter> findByUserId(Long userId);

    boolean existsById(UserFavoriteShelterId id);

    void deleteById(UserFavoriteShelterId id);
}
