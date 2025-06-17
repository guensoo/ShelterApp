package com.shelter.shelter_api.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shelter.shelter_api.DTO.ShelterDTO;
import com.shelter.shelter_api.Repository.ChemicalShelterRepository;
import com.shelter.shelter_api.Repository.ColdShelterRepository;
import com.shelter.shelter_api.Repository.DefenseShelterRepository;
import com.shelter.shelter_api.Repository.EarthquakeShelterRepository;
import com.shelter.shelter_api.Repository.HeatShelterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShelterService {
    private final HeatShelterRepository heatShelterRepo;
    private final ColdShelterRepository coldShelterRepo;
    private final ChemicalShelterRepository chemicalShelterRepo;
    private final DefenseShelterRepository defenseShelterRepo;
    private final EarthquakeShelterRepository earthquakeShelterRepo;

    // 무더위쉼터 전체 조회
    public List<ShelterDTO> getAllHeatShelters() {
        return heatShelterRepo.findAll().stream()
                .map(ShelterDTO::fromHeat)
                .collect(Collectors.toList());
    }

    // 한파쉼터 전체 조회
    public List<ShelterDTO> getAllColdShelters() {
        return coldShelterRepo.findAll().stream()
                .map(ShelterDTO::fromCold)
                .collect(Collectors.toList());
    }

    // 화학대피소 전체 조회
    public List<ShelterDTO> getAllChemicalShelters() {
        return chemicalShelterRepo.findAll().stream()
                .map(ShelterDTO::fromChemical)
                .collect(Collectors.toList());
    }

    // 민방위(일반) 대피소 전체 조회
    public List<ShelterDTO> getAllDefenseShelters() {
        return defenseShelterRepo.findAll().stream()
                .map(ShelterDTO::fromCivil)
                .collect(Collectors.toList());
    }

    // 지진해일 대피소 전체 조회
    public List<ShelterDTO> getAllEarthquakeShelters() {
        return earthquakeShelterRepo.findAll().stream()
                .map(ShelterDTO::fromEarthquake)
                .collect(Collectors.toList());
    }

    // 통합 전체 조회 (필터링)
    public List<ShelterDTO> getAllShelters() {
        List<ShelterDTO> all = new ArrayList<>();
        all.addAll(getAllHeatShelters());
        all.addAll(getAllColdShelters());
        all.addAll(getAllChemicalShelters());
        all.addAll(getAllDefenseShelters());
        all.addAll(getAllEarthquakeShelters());
        return all;
    }
}
