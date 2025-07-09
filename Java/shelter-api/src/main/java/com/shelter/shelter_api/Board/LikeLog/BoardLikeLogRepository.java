package com.shelter.shelter_api.Board.LikeLog;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.Board.Board.BoardEntity;

public interface BoardLikeLogRepository extends JpaRepository<BoardLikeLogEntity, Long> {
    boolean existsByBoardAndUsername(BoardEntity board, String username);
    BoardLikeLogEntity findByBoardAndUsername(BoardEntity board, String username);
}
