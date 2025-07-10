package com.shelter.shelter_api.Board.LikeLog;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shelter.shelter_api.Board.Board.BoardEntity;
import com.shelter.shelter_api.Board.Board.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardLikeService {

    private final BoardLikeLogRepository boardLikeLogRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public void likeBoard(Long boardId, String username) {
        BoardEntity board = boardRepository.findById(boardId)
            .orElseThrow(() -> new RuntimeException("해당 게시글이 없습니다."));

        boolean exists = boardLikeLogRepository.existsByBoardAndUsername(board, username);
        if (exists) {
            throw new IllegalStateException("이미 추천한 게시글입니다.");
        }

        BoardLikeLogEntity newLog = BoardLikeLogEntity.builder()
            .board(board)
            .username(username)
            .createdAt(LocalDateTime.now())
            .build();

        boardLikeLogRepository.save(newLog);
        board.setLikeCount(board.getLikeCount() + 1);
        boardRepository.save(board);
    }

    // 추천 여부 조회 추가
    @Transactional(readOnly = true)
    public boolean isLiked(Long postNo, String username) {
        BoardEntity board = boardRepository.findByPostNo(postNo)
            .orElseThrow(() -> new RuntimeException("해당 게시글이 없습니다."));
        return boardLikeLogRepository.existsByBoardAndUsername(board, username);
    }
    
    @Transactional
    public void unlikeBoard(Long boardId, String username) {
        BoardEntity board = boardRepository.findById(boardId)
            .orElseThrow(() -> new RuntimeException("해당 게시글이 없습니다."));

        BoardLikeLogEntity log = boardLikeLogRepository.findByBoardAndUsername(board, username);
        if (log == null) {
            throw new IllegalStateException("추천하지 않은 게시글입니다.");
        }

        boardLikeLogRepository.delete(log);
        board.setLikeCount(board.getLikeCount() - 1);
        boardRepository.save(board);
    }
    
    
}