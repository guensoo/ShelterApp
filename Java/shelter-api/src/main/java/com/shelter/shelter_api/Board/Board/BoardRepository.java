package com.shelter.shelter_api.Board.Board;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.shelter.shelter_api.User.entity.UserEntity;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    List<BoardEntity> findAllByOrderByCreatedAtDesc();

    @Query("SELECT MAX(b.postNo) FROM BoardEntity b")
    Optional<Long> findMaxPostNo();

    Optional<BoardEntity> findByPostNo(Long postNo);

    @Query("SELECT b FROM BoardEntity b LEFT JOIN FETCH b.files WHERE b.postNo = :postNo")
    Optional<BoardEntity> findByPostNoWithFiles(@Param("postNo") Long postNo);

    void deleteAllByUsername(String username);
}