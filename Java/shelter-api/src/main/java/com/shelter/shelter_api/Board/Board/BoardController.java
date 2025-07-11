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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@Tag(name = "게시판 API", description = "게시글 등록, 조회, 삭제 등 게시판 관련 API") // 전체 API 묶음 설명
public class BoardController {

    private final BoardService boardService;
    @Operation(
            summary = "게시글 등록",
            description = "새로운 게시글을 등록합니다. JWT 인증 필요."
        )
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
    
    @Operation(
            summary = "게시글 전체 조회",
            description = "등록된 모든 게시글을 조회합니다."
        )
    // 게시글 전체 조회
    @GetMapping("")
    public ResponseEntity<List<BoardResponseDTO>> getAllPosts() {
        return ResponseEntity.ok(boardService.getAllPosts());
    }
    
    @Operation(
            summary = "게시글 상세 조회",
            description = "특정 게시글을 postNo로 조회합니다."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "404", description = "게시글 없음")
        })
    // 게시글 상세 조회
    @GetMapping("/{postNo}")
    public ResponseEntity<BoardResponseDTO> getPostByPostNo(@PathVariable("postNo") Long postNo) {
        BoardResponseDTO post = boardService.getPostByPostNo(postNo);
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, no-store, must-revalidate")
                .body(post);
    }

    @Operation(
            summary = "게시글 삭제",
            description = "게시글을 id로 삭제합니다. 작성자 또는 관리자만 삭제 가능. JWT 인증 필요."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "삭제 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "403", description = "권한 없음")
        })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(
        @PathVariable("id") Long id,
        @AuthenticationPrincipal UserDetails userDetails) {

    String username = userDetails.getUsername();
    boardService.deleteBoard(id, username);  // username 검사(작성자/관리자 체크)
    return ResponseEntity.ok("게시글이 삭제되었습니다.");
}
}