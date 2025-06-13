package com.shelter.shelter_api.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shelter.shelter_api.DTO.HeatShelterDTO;
import com.shelter.shelter_api.Entity.HeatShelterEntity;
import com.shelter.shelter_api.Repository.HeatShelterRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class HeatShelterService {

    private final HeatShelterRepository repository;
    private final ObjectMapper objectMapper;

    private static final String API_URL = 
    		  "https://www.safetydata.go.kr/V2/api/DSSP-IF-10942?serviceKey=KSYDEX371R6B5I07&returnType=json";

    // ✅ 1. 외부 API 호출 및 저장
    public int fetchAndSaveFromApi() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = API_URL + "&numOfRows=1000&pageNo=1";

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            String body = response.getBody();
            log.info("📨 더위쉼터 API 응답: {}", body);

            JsonNode root = objectMapper.readTree(body);
            JsonNode bodyArray = root.path("body");

            List<HeatShelterDTO> dtoList = objectMapper.readValue(
                    bodyArray.toString(),
                    new TypeReference<List<HeatShelterDTO>>() {}
            );

            return saveAll(dtoList);
        } catch (Exception e) {
            log.error("❌ 더위쉼터 API 호출 실패: {}", e.getMessage());
            return 0;
        }
    }

    // ✅ 2. 저장
    public int saveAll(List<HeatShelterDTO> dtoList) {
        List<HeatShelterEntity> entities = dtoList.stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());

        repository.saveAll(entities);
        log.info("✅ 저장 완료: {}건", entities.size());
        return entities.size();
    }

    // ✅ 3. 변환
    private HeatShelterEntity convertToEntity(HeatShelterDTO dto) {
        return HeatShelterEntity.builder()
                .name(dto.getName())
                .address(dto.getAddress())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .weekdayStartTime(dto.getWeekdayStartTime())
                .weekdayEndTime(dto.getWeekdayEndTime())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .capacity(dto.getCapacity())
                .isOperating(dto.getIsOperating())
                .hasWeekendOp(dto.getHasWeekendOp())
                .hasNightOp(dto.getHasNightOp())
                .hasStay(dto.getHasStay())
                .airconCount(dto.getAirconCount())
                .facilityType(dto.getFacilityType())
                .facilitySubType(dto.getFacilitySubType())
                .build();
    }

    // ✅ 4. 저장 없이 불러오기만
    public List<HeatShelterDTO> fetchFromApiOnly() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = API_URL + "&numOfRows=1000&pageNo=1";

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode bodyArray = root.path("body");

            return objectMapper.readValue(
                    bodyArray.toString(),
                    new TypeReference<List<HeatShelterDTO>>() {}
            );
        } catch (Exception e) {
            log.error("❌ fetchOnly 실패", e);
            return Collections.emptyList();
        }
    }
}