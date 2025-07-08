package com.shelter.shelter_api.Board.Board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    List<BoardEntity> findAllByOrderByCreatedAtDesc();

    @Query("SELECT MAX(b.postNo) FROM BoardEntity b")
    Optional<Long> findMaxPostNo();
    
    Optional<BoardEntity> findByPostNo(Long postNo);
}