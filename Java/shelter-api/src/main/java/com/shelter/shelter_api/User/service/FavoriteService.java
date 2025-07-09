package com.shelter.shelter_api.User.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shelter.shelter_api.User.UserFavoriteShelterId;
import com.shelter.shelter_api.User.entity.UserEntity;
import com.shelter.shelter_api.User.entity.UserFavoriteShelter;
import com.shelter.shelter_api.User.repository.UserFavoriteShelterRepository;
import com.shelter.shelter_api.User.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final UserFavoriteShelterRepository favoriteRepo;
    private final UserRepository userRepo;
    // ShelterRepository 계열은 여기서 직접 사용 X

    // 즐겨찾기 추가
    public void addFavorite(Long userId, String shelterType, Long shelterId) {
        UserEntity user = userRepo.findById(userId).orElseThrow();
        UserFavoriteShelterId favId = new UserFavoriteShelterId(userId, shelterType, shelterId);
        if (!favoriteRepo.existsById(favId)) {
            UserFavoriteShelter fav = UserFavoriteShelter.builder()
                .id(favId)
                .user(user)
                .build();
            favoriteRepo.save(fav);
        }
    }

    // 즐겨찾기 삭제
    public void removeFavorite(Long userId, String shelterType, Long shelterId) {
        UserFavoriteShelterId favId = new UserFavoriteShelterId(userId, shelterType, shelterId);
        if (favoriteRepo.existsById(favId)) {
            favoriteRepo.deleteById(favId);
        }
    }

    // 내 즐겨찾기 (shelterType, shelterId) 리스트 반환
    public List<UserFavoriteShelterId> getMyFavoriteShelterIds(Long userId) {
        return favoriteRepo.findByUserId(userId)
                .stream()
                .map(UserFavoriteShelter::getId)
                .collect(Collectors.toList());
    }
    
    
}
