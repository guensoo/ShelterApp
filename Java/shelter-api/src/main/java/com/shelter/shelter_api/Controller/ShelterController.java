package com.shelter.shelter_api.Controller;

import com.shelter.shelter_api.DTO.ShelterDTO;
import com.shelter.shelter_api.Entity.ShelterEntity;
import com.shelter.shelter_api.Service.ShelterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shelter")
@RequiredArgsConstructor
public class ShelterController {
    // 서비스 주입
    private final ShelterService shelterService;

    // 사용자 페이지
    // GET
    @GetMapping
    public ResponseEntity<?> getAllLocForUser(@RequestParam(required=false) String area) {
        ShelterDTO dto = new ShelterDTO();
        dto.setArea(area);
        List<ShelterDTO> shelters = shelterService.getFilteredShelter(dto);
        return ResponseEntity.ok(shelters);
    }

    // 관리자 페이지
    // POST
    @PostMapping("/admin")
    public ResponseEntity<?> createShelter(@RequestBody ShelterDTO dto) {
        ShelterEntity entity = ShelterDTO.toEntity(dto);
        shelterService.create(dto);  // 서비스에 저장 위임
        return ResponseEntity.ok("쉼터 등록 완료!");
    }

    // PUT
//    public ResponseEntity<?>

    // GET
    @GetMapping("/admin")
    public ResponseEntity<?> getAllLocForAdmin(@RequestParam(required=false) String area) {
        ShelterDTO dto = new ShelterDTO();
        dto.setArea(area);
        List<ShelterDTO> shelters = shelterService.getFilteredShelter(dto);
        return ResponseEntity.ok(shelters);
    }

    // DELETE
//    public ResponseEntity<?>
}
