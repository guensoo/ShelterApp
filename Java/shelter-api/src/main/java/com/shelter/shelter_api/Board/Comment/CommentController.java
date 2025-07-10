package com.shelter.shelter_api.Board.Comment;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    // 특정 게시글 댓글 목록 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable("boardId") Long boardId) {
        List<CommentDTO> comments = commentService.getCommentsByBoardId(boardId);
        return ResponseEntity.ok(comments);
    }

    // 댓글 작성
    @PostMapping("/{boardId}")
    public ResponseEntity<CommentDTO> addComment(
        @PathVariable("boardId") Long boardId,
        @RequestBody CommentDTO commentDto,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        CommentDTO savedComment = commentService.addComment(
            boardId, userDetails.getUsername(), commentDto.getContent()
        );
        return ResponseEntity.ok(savedComment);
    }
    
    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(
        @PathVariable("commentId") Long commentId,
        @RequestBody CommentDTO commentDto,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        CommentDTO updated = commentService.updateComment(
            commentId, userDetails.getUsername(), commentDto.getContent()
        );
        return ResponseEntity.ok(updated);
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
        @PathVariable("commentId") Long commentId,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        commentService.deleteComment(commentId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}