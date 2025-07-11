package com.shelter.shelter_api.Shelter.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.Shelter.DTO.ShelterDTO;
import com.shelter.shelter_api.Shelter.Service.ShelterService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/shelters")
@RequiredArgsConstructor
@Tag(name = "쉼터/대피소 API", description = "무더위/한파/화학/민방위/지진해일 대피소 조회")
public class ShelterController {

    private final ShelterService shelterService;

    // 무더위쉼터 전체 조회
    @Operation(
            summary = "무더위쉼터 전체 조회",
            description = "무더위쉼터 목록 전체를 반환합니다."
        )
        @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping("/heat")
    public List<ShelterDTO> getAllHeatShelters() {
        return shelterService.getAllHeatShelters();
    }

    // 한파쉼터 전체 조회
    @Operation(
            summary = "한파쉼터 전체 조회",
            description = "한파쉼터 목록 전체를 반환합니다."
        )
        @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping("/cold")
    public List<ShelterDTO> getAllColdShelters() {
        return shelterService.getAllColdShelters();
    }

    // 화학사고 대피소 전체 조회
    @Operation(
            summary = "화학사고 대피소 전체 조회",
            description = "화학사고 대피소 목록 전체를 반환합니다."
        )
        @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping("/chemical")
    public List<ShelterDTO> getAllChemicalShelters() {
        return shelterService.getAllChemicalShelters();
    }

    // 민방위 대피소 전체 조회
    @Operation(
            summary = "민방위 대피소 전체 조회",
            description = "민방위 대피소 목록 전체를 반환합니다."
        )
        @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping("/defense")
    public List<ShelterDTO> getAllDefenseShelters() {
        return shelterService.getAllDefenseShelters();
    }

    // 지진해일 대피소 전체 조회
    @Operation(
            summary = "지진해일 대피소 전체 조회",
            description = "지진해일 대피소 목록 전체를 반환합니다."
        )
        @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping("/earthquake")
    public List<ShelterDTO> getAllEarthquakeShelters() {
        return shelterService.getAllEarthquakeShelters();
    }

    // (옵션) 모든 쉼터 한번에 다 조회
    @Operation(
            summary = "모든 쉼터 전체 조회",
            description = "전체 쉼터(무더위/한파/화학/민방위/지진해일) 목록을 한 번에 반환합니다."
        )
        @ApiResponse(responseCode = "200", description = "조회 성공")
    @GetMapping("/all")
    public List<ShelterDTO> getAllShelters() {
        return shelterService.getAllShelters();
    }

    // (필요시: 상세 단건조회)
//    @Operation(summary = "쉼터 단건 상세 조회", description = "타입, ID로 쉼터 상세 조회")
//    @GetMapping("/{type}/{id}")
//    public ShelterDTO getShelterDetail(@PathVariable String type, @PathVariable Long id) {...}

}
