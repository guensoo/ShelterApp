package com.shelter.shelter_api.Board.Comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.User.entity.UserEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    // 게시글 id로 댓글 목록 조회
    List<CommentEntity> findByBoardIdOrderByCreatedAtAsc(Long boardId);
    void deleteAllByUser(UserEntity user);
}
