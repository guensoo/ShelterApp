package com.shelter.shelter_api.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.DTO.HeatShelterDTO;
import com.shelter.shelter_api.Service.HeatShelterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/heat-shelter")
public class HeatShelterController {

    private final HeatShelterService heatShelterService;

    // 🔁 1. API → DB 저장
    @PostMapping("/fetch")
    public ResponseEntity<String> fetchAndSave() {
        int savedCount = heatShelterService.fetchAndSaveFromApi();
        return ResponseEntity.ok("저장 완료: " + savedCount + "건");
    }

    // 👀 2. API 조회만 (저장 X)
    @GetMapping("/view")
    public ResponseEntity<List<HeatShelterDTO>> fetchOnly() {
        List<HeatShelterDTO> dtoList = heatShelterService.fetchFromApiOnly();
        return ResponseEntity.ok(dtoList);
    }
}