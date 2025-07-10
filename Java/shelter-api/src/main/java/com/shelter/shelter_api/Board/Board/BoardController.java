package com.shelter.shelter_api.Board.Board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 게시글 등록
    @PostMapping("/write")
    public ResponseEntity<BoardResponseDTO> createPost(
            @RequestBody BoardRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails != null) {
        }

        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰 없음 or 인증 실패");
        }

        String username = userDetails.getUsername();
        BoardResponseDTO result = boardService.createPost(dto, username);
        return ResponseEntity.ok(result);
        
    }
    // 게시글 전체 조회
    @GetMapping("")
    public ResponseEntity<List<BoardResponseDTO>> getAllPosts() {
        return ResponseEntity.ok(boardService.getAllPosts());
    }

    // 게시글 상세 조회
    @GetMapping("/{postNo}")
    public ResponseEntity<BoardResponseDTO> getPostByPostNo(@PathVariable("postNo") Long postNo) {
        BoardResponseDTO post = boardService.getPostByPostNo(postNo);
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, no-store, must-revalidate")
                .body(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(
        @PathVariable("id") Long id,
        @AuthenticationPrincipal UserDetails userDetails) {

    String username = userDetails.getUsername();
    boardService.deleteBoard(id, username);  // username 검사(작성자/관리자 체크)
    return ResponseEntity.ok("게시글이 삭제되었습니다.");
}
}