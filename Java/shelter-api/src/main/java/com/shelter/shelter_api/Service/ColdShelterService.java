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
import com.shelter.shelter_api.DTO.ColdShelterDTO;
import com.shelter.shelter_api.Entity.ColdShelterEntity;
import com.shelter.shelter_api.Repository.ColdShelterRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ColdShelterService {

    private final ColdShelterRepository repository;
    private final ObjectMapper objectMapper;

    private static final String API_URL = 
    		  "https://www.safetydata.go.kr/V2/api/DSSP-IF-10804?serviceKey=7TH2H36WY8VW30FM&returnType=json";


    // ✅ 1. 외부 API 호출 및 저장
    public int fetchAndSaveFromApi() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String apiUrl = API_URL + "&pageNo=1&numOfRows=500"; // API_KEY 이미 포함된 상태 가정

            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
            String body = response.getBody();
            log.info("📨 외부 API 응답: {}", body);

            // JSON 파싱
            JsonNode root = objectMapper.readTree(body);
            JsonNode items = root.path("body"); // 또는 정확한 경로 확인 필요

            List<ColdShelterDTO> dtoList = objectMapper.readValue(
                items.toString(), new TypeReference<List<ColdShelterDTO>>() {}
            );

            return saveAll(dtoList); // 성공 시 저장 수 리턴

        } catch (Exception e) {
            log.error("❌ API 호출 실패: {}", e.getMessage());
            return 0;
        }
    }

    // ✅ 2. DTO → Entity 변환 후 DB 저장
    public int saveAll(List<ColdShelterDTO> dtoList) {
        List<ColdShelterEntity> entities = dtoList.stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());

        repository.saveAll(entities);
        log.info("✅ 저장 완료: {}건", entities.size());
        return entities.size();
    }

    private ColdShelterEntity convertToEntity(ColdShelterDTO dto) {
        return ColdShelterEntity.builder()
                .reareNm(dto.getReareNm())
                .reareFcltNo(dto.getReareFcltNo())
                .fcltType(dto.getFcltType())
                .fcltySclas(dto.getFcltySclas())
                .daddr(dto.getDaddr())
                .ronaDaddr(dto.getRonaDaddr())
                .lat(dto.getLat())
                .lot(dto.getLot())
                .wkdyOperBgngHr(dto.getWkdyOperBgngHr())
                .wkdyOperEndHr(dto.getWkdyOperEndHr())
                .lhhldyOperBgngHr(dto.getLhhldyOperBgngHr())
                .lhhldyOperEndHr(dto.getLhhldyOperEndHr())
                .sndyOperBgngHr(dto.getSndyOperBgngHr())
                .sndyOperEndHr(dto.getSndyOperEndHr())
                .stdyOperBgngHr(dto.getStdyOperBgngHr())
                .stdyOperEndHr(dto.getStdyOperEndHr())
                .utztnPsbltyTnop(dto.getUtztnPsbltyTnop())
                .rmrk(dto.getRmrk())
                .mdfcnHr(dto.getMdfcnHr())
                .build();
    }
    
    public List<ColdShelterDTO> fetchFromApiOnly() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = API_URL + "&returnType=json";
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode bodyArray = root.path("body");

            List<ColdShelterDTO> dtoList = objectMapper.readValue(
                bodyArray.toString(), new TypeReference<List<ColdShelterDTO>>() {}
            );

            return dtoList;
        } catch (Exception e) {
            log.error("❌ fetchOnly 실패", e);
            return Collections.emptyList();
        }
    }
}
