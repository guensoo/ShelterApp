package com.shelter.shelter_api.Service;

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
                    .filter(shelter -> shelter.getArea().equals(area.getArea()))
                    .collect(Collectors.toList());
        }

        return shelters.stream().map(ShelterDTO::new).collect(Collectors.toList());
    }
}
