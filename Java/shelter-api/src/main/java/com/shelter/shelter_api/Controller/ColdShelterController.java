package com.shelter.shelter_api.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.DTO.ColdShelterDTO;
import com.shelter.shelter_api.Service.ColdShelterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cold-shelter")
public class ColdShelterController {

    private final ColdShelterService service;

    // 외부 API → 자동 저장
    @GetMapping("/fetch")
    public ResponseEntity<List<ColdShelterDTO>> fetchFromApiAndReturn() {
        List<ColdShelterDTO> dtoList = service.fetchFromApiOnly(); // 저장 없이 리턴만
        return ResponseEntity.ok(dtoList);
    }

    // 클라이언트가 직접 DTO 전달
    @PostMapping("/save")
    public ResponseEntity<String> saveFromClient(@RequestBody List<ColdShelterDTO> dtoList) {
        service.saveAll(dtoList);
        return ResponseEntity.ok("한파쉼터 저장 완료");
    }
}
