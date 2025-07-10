package com.shelter.shelter_api.Board.LikeLog;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.userdetails.UserDetails;

import com.shelter.shelter_api.User.entity.UserEntity;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardLikeController {

    private final BoardLikeService boardLikeService;

    // 추천 여부 체크 API 추가
    @GetMapping("/{boardId}/liked")
    public ResponseEntity<?> isLiked(@PathVariable("boardId") Long boardId, @AuthenticationPrincipal UserDetails user) {
        if (user == null) {
            return ResponseEntity.status(403).body(Map.of("message", "로그인 필요"));
        }
        boolean liked = boardLikeService.isLiked(boardId, user.getUsername());
        return ResponseEntity.ok(Map.of("liked", liked));
    }
    
    @PostMapping("/{boardId}/like")
    public ResponseEntity<?> likePost(@PathVariable("boardId") Long boardId, @AuthenticationPrincipal UserEntity user) {
        boardLikeService.likeBoard(boardId, user.getUsername());
        return ResponseEntity.ok(Map.of("message", "추천 완료"));
    }

    @DeleteMapping("/{boardId}/unlike")
    public ResponseEntity<?> unlikePost(@PathVariable("boardId") Long boardId, @AuthenticationPrincipal UserEntity user) {
        boardLikeService.unlikeBoard(boardId, user.getUsername());
        return ResponseEntity.ok(Map.of("message", "추천 취소"));
    }
}