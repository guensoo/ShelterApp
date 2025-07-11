package com.shelter.shelter_api.User.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.User.service.FavoriteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/favorite")
@RequiredArgsConstructor
@Tag(name = "즐겨찾기 API", description = "쉼터 즐겨찾기 추가 및 삭제")
public class FavoriteController {

    private final FavoriteService favoriteService;

    // 즐겨찾기 추가
    @Operation(
            summary = "즐겨찾기 추가",
            description = "사용자가 특정 쉼터를 즐겨찾기에 추가합니다."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "즐겨찾기 추가 완료")
        })
    @PostMapping("/add")
    public ResponseEntity<?> addFavorite(
            @RequestParam Long userId,
            @RequestParam String shelterType,  // ★ shelterType 추가 (ex: "HEAT")
            @RequestParam Long shelterId) {
        favoriteService.addFavorite(userId, shelterType, shelterId);
        return ResponseEntity.ok("즐겨찾기 추가 완료");
    }

    // 즐겨찾기 삭제
    @Operation(
            summary = "즐겨찾기 삭제",
            description = "사용자가 특정 쉼터를 즐겨찾기에서 삭제합니다."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "즐겨찾기 삭제 완료")
        })
    @PostMapping("/remove")
    public ResponseEntity<?> removeFavorite(
            @RequestParam Long userId,
            @RequestParam String shelterType,  // ★ shelterType 추가
            @RequestParam Long shelterId) {
        favoriteService.removeFavorite(userId, shelterType, shelterId);
        return ResponseEntity.ok("즐겨찾기 삭제 완료");
    }
}