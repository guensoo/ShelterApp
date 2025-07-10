package com.shelter.shelter_api.Board.Comment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shelter.shelter_api.Board.Board.BoardEntity;
import com.shelter.shelter_api.Board.Board.BoardRepository;
import com.shelter.shelter_api.User.entity.UserEntity;
import com.shelter.shelter_api.User.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CommentDTO> getCommentsByBoardId(Long boardId) {
        List<CommentEntity> comments = commentRepository.findByBoardIdOrderByCreatedAtAsc(boardId);
        return comments.stream()
                .map(CommentDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public CommentDTO addComment(Long boardId, String username, String content) {
        BoardEntity board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        CommentEntity comment = CommentEntity.builder()
                .board(board)
                .user(user)
                .content(content)
                .build();

        CommentEntity saved = commentRepository.save(comment);
        return CommentDTO.fromEntity(saved);
    }
    
    @Transactional
    public CommentDTO updateComment(Long commentId, String username, String content) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
        if (!comment.getUser().getUsername().equals(username)) {
            throw new RuntimeException("댓글 수정 권한이 없습니다.");
        }
        comment.setContent(content);
        comment.setUpdatedAt(LocalDateTime.now());
        // 저장 필요 없음 (영속성 컨텍스트에서 자동 반영)
        return CommentDTO.fromEntity(comment);
    }

    @Transactional
    public void deleteComment(Long commentId, String username) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
        // 작성자 본인만 삭제 가능
        if (!comment.getUser().getUsername().equals(username)) {
            throw new RuntimeException("댓글 삭제 권한이 없습니다.");
        }
        commentRepository.delete(comment);
    }
}