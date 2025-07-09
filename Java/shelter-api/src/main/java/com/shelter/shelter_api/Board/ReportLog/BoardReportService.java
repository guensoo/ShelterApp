package com.shelter.shelter_api.Board.ReportLog;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shelter.shelter_api.Board.Board.BoardEntity;
import com.shelter.shelter_api.Board.Board.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardReportService {

    private final BoardReportLogRepository boardReportLogRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public void reportBoard(Long boardId, String username, String reason) {
        BoardEntity board = boardRepository.findById(boardId)
            .orElseThrow(() -> new RuntimeException("해당 게시글이 없습니다."));

        if (boardReportLogRepository.existsByBoardAndUsername(board, username)) {
            throw new IllegalStateException("이미 신고한 게시글입니다.");
        }

        BoardReportLogEntity log = BoardReportLogEntity.builder()
            .board(board)
            .username(username)
            .createdAt(LocalDateTime.now())
            .reason(reason) // reason 필드 있으면 추가
            .build();

        boardReportLogRepository.save(log);

        // (원한다면 신고수 증가 등 처리)
        board.setReportCount(board.getReportCount() + 1);
        boardRepository.save(board);
    }
}

