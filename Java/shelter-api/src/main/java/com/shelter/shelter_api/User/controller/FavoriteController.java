package com.shelter.shelter_api.User.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.Shelter.DTO.ShelterDetailDTO;
import com.shelter.shelter_api.User.service.FavoriteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/favorite")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    // 즐겨찾기 추가
    @PostMapping("/add")
    public ResponseEntity<?> addFavorite(
            @RequestParam Long userId,
            @RequestParam String shelterType,  // ★ shelterType 추가 (ex: "HEAT")
            @RequestParam Long shelterId) {
        favoriteService.addFavorite(userId, shelterType, shelterId);
        return ResponseEntity.ok("즐겨찾기 추가 완료");
    }

    // 즐겨찾기 삭제
    @PostMapping("/remove")
    public ResponseEntity<?> removeFavorite(
            @RequestParam Long userId,
            @RequestParam String shelterType,  // ★ shelterType 추가
            @RequestParam Long shelterId) {
        favoriteService.removeFavorite(userId, shelterType, shelterId);
        return ResponseEntity.ok("즐겨찾기 삭제 완료");
    }
}