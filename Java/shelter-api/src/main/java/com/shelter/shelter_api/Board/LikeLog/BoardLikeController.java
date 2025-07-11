package com.shelter.shelter_api.Board.LikeLog;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.User.entity.UserEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
@Tag(name = "게시글 추천 API", description = "게시글 추천(Like) 및 추천여부 확인, 취소 등")
public class BoardLikeController {

    private final BoardLikeService boardLikeService;

    @Operation(
            summary = "게시글 추천 여부 확인",
            description = "로그인한 사용자가 특정 게시글을 추천(Like)했는지 여부를 반환합니다."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "추천 여부 반환(liked=true/false)"),
            @ApiResponse(responseCode = "403", description = "로그인 필요")
        })
    // 추천 여부 체크 API 추가
    @GetMapping("/{boardId}/liked")
    public ResponseEntity<?> isLiked(@PathVariable("boardId") Long boardId, @AuthenticationPrincipal UserDetails user) {
        if (user == null) {
            return ResponseEntity.status(403).body(Map.of("message", "로그인 필요"));
        }
        boolean liked = boardLikeService.isLiked(boardId, user.getUsername());
        return ResponseEntity.ok(Map.of("liked", liked));
    }
    
    @Operation(
            summary = "게시글 추천(Like)",
            description = "특정 게시글에 추천(Like)합니다. JWT 인증 필요."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "추천 완료"),
            @ApiResponse(responseCode = "403", description = "로그인 필요")
        })
    @PostMapping("/{boardId}/like")
    public ResponseEntity<?> likePost(@PathVariable("boardId") Long boardId, @AuthenticationPrincipal UserEntity user) {
        boardLikeService.likeBoard(boardId, user.getUsername());
        return ResponseEntity.ok(Map.of("message", "추천 완료"));
    }

    @Operation(
            summary = "게시글 추천 취소(Unlike)",
            description = "특정 게시글의 추천(Like)을 취소합니다. JWT 인증 필요."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "추천 취소 완료"),
            @ApiResponse(responseCode = "403", description = "로그인 필요")
        })
    @DeleteMapping("/{boardId}/unlike")
    public ResponseEntity<?> unlikePost(@PathVariable("boardId") Long boardId, @AuthenticationPrincipal UserEntity user) {
        boardLikeService.unlikeBoard(boardId, user.getUsername());
        return ResponseEntity.ok(Map.of("message", "추천 취소"));
    }
}