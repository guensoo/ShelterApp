package com.shelter.shelter_api.Board.Scrap;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/scraps")
@RequiredArgsConstructor
public class ScrapController {

    private final ScrapService scrapService;

    // 1. 유저가 스크랩한 게시글 목록 조회
    @GetMapping
    public ResponseEntity<List<ScrapResponseDTO>> getScraps(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();  // String username
        List<ScrapDTO> scraps = scrapService.getScrapsByUsername(username);

        List<ScrapResponseDTO> response = scraps.stream()
                .map(s -> ScrapResponseDTO.builder()
                    .id(s.getId())
                    .boardId(s.getBoardId())
                    .boardTitle(s.getBoardTitle())
                    .boardUsername(s.getBoardUsername())
                    .createdAt(s.getCreatedAt())
                    .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // 2. 게시글 스크랩 추가
    @PostMapping
    public ResponseEntity<?> addScrap(@RequestBody Map<String, Object> payload, Principal principal) {
        Long boardId = Long.valueOf(payload.get("boardId").toString());
        String username = principal.getName();

        scrapService.addScrapByUsername(username, boardId);
        return ResponseEntity.ok().build();
    }

    // 3. 게시글 스크랩 삭제
    @DeleteMapping
    public ResponseEntity<String> removeScrap(
            @RequestBody ScrapRequestDTO request,
            @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();
        scrapService.removeScrapByUsername(username, request.getBoardId());
        return ResponseEntity.ok("스크랩이 삭제되었습니다.");
    }
}