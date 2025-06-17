package com.shelter.shelter_api.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.DTO.ShelterDTO;
import com.shelter.shelter_api.Service.ShelterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/shelters")
@RequiredArgsConstructor
public class ShelterController {

    private final ShelterService shelterService;

    // 무더위쉼터 전체 조회
    @GetMapping("/heat")
    public List<ShelterDTO> getAllHeatShelters() {
        return shelterService.getAllHeatShelters();
    }

    // 한파쉼터 전체 조회
    @GetMapping("/cold")
    public List<ShelterDTO> getAllColdShelters() {
        return shelterService.getAllColdShelters();
    }

    // 화학사고 대피소 전체 조회
    @GetMapping("/chemical")
    public List<ShelterDTO> getAllChemicalShelters() {
        return shelterService.getAllChemicalShelters();
    }

    // 민방위 대피소 전체 조회
    @GetMapping("/defense")
    public List<ShelterDTO> getAllDefenseShelters() {
        return shelterService.getAllDefenseShelters();
    }

    // 지진해일 대피소 전체 조회
    @GetMapping("/earthquake")
    public List<ShelterDTO> getAllEarthquakeShelters() {
        return shelterService.getAllEarthquakeShelters();
    }

    // (옵션) 모든 쉼터 한번에 다 조회
    @GetMapping("/all")
    public List<ShelterDTO> getAllShelters() {
        return shelterService.getAllShelters();
    }

    // (필요시: 상세 단건조회)
    // @GetMapping("/{type}/{id}")
    // public ShelterDTO getShelterDetail(@PathVariable String type, @PathVariable Long id) {...}

}
