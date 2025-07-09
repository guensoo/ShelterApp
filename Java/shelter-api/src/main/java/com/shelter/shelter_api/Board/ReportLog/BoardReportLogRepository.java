package com.shelter.shelter_api.Board.ReportLog;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.Board.Board.BoardEntity;

public interface BoardReportLogRepository extends JpaRepository<BoardReportLogEntity, Long> {
    boolean existsByBoardAndUsername(BoardEntity board, String username);
}
