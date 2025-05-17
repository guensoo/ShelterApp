package com.shelter.shelter_api.Service;

import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import com.shelter.shelter_api.DTO.ShelterDTO;
import com.shelter.shelter_api.Entity.ShelterEntity;
import com.shelter.shelter_api.Repository.ShelterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShelterService {

    // 생성자 주입!(레파지토리 -> 인터페이스입니다.)
    private final ShelterRepository repository;

    // Shelter 추가 메서드
    public List<ShelterDTO> create(ShelterDTO dto){
        // DTO로 받은 객체 dto를 entity타입으로 변경
        ShelterEntity entity = ShelterDTO.toEntity(dto);
        // 데이터베이스에 저장
        repository.save(entity);
        return repository.findAll().stream().map(ShelterDTO::new).collect(Collectors.toList());
    }

    //모든 쉘터 조회(지역명이 들어가 있다면 지역명에 대해서만 조회)
    public List<ShelterDTO> getFilteredShelter(ShelterDTO area){
        // 일단 전체 조회를 한다.
        List<ShelterEntity> shelters = repository.findAll();
        // 가격 필터링(minPrice가 있을 경우)
        if(area != null && area.getArea() != null) {
            shelters = shelters
                    .stream()
                    .filter(shelter -> shelter.getArea() != null && shelter.getArea().contains(area.getArea()))
                    .collect(Collectors.toList());
        }

        return shelters.stream().map(ShelterDTO::new).collect(Collectors.toList());
    }

    public void fetchSheltersFromGov() {
        String apiKey = "T7QQZrCmgbCm2X9dLNzQljBdOAdh9EmUUzFTsd2N4FMVjB7LvhX06T9JLO2WW1jFYsIJlp2D%2FNaXweMt13Axyw%3D%3D";
        String url = "https://apis.data.go.kr/1741000/HealthSheltersForEachRegion";

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("serviceKey", apiKey)
                .queryParam("pageNo", 1)
                .queryParam("numOfRows", 100)
                .queryParam("type", "xml");

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(builder.toUriString(), String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            System.out.println("✅ XML 응답 확인:\n" + response.getBody());
            // 여기서 JacksonXmlMapper로 파싱 예정
        } else {
            System.out.println("❌ 요청 실패: " + response.getStatusCode());
        }
    }
}
