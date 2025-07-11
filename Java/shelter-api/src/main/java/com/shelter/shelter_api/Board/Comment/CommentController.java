package com.shelter.shelter_api.Board.Comment;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
@Tag(name = "댓글 API", description = "게시글의 댓글 작성, 수정, 삭제, 조회")
public class CommentController {

    private final CommentService commentService;

    @Operation(
            summary = "댓글 목록 조회",
            description = "특정 게시글의 모든 댓글을 조회합니다."
        )
        @ApiResponse(responseCode = "200", description = "조회 성공")
    // 특정 게시글 댓글 목록 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable("boardId") Long boardId) {
        List<CommentDTO> comments = commentService.getCommentsByBoardId(boardId);
        return ResponseEntity.ok(comments);
    }
    
    @Operation(
            summary = "댓글 작성",
            description = "특정 게시글에 댓글을 작성합니다. JWT 인증 필요."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "작성 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패")
        })
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
    
    @Operation(
            summary = "댓글 수정",
            description = "특정 댓글을 수정합니다. 본인만 가능. JWT 인증 필요."
        )
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "수정 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "403", description = "권한 없음")
        })
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