package com.shelter.shelter_api.Board.LikeLog;

import com.shelter.shelter_api.Board.Board.BoardEntity;

import lombok.Data;

@Data
public class BoardResponseDTO {
    private Long id;
    private boolean liked;
    
    public static BoardResponseDTO fromEntity(BoardEntity board, String username, BoardLikeLogRepository likeRepo) {
        BoardResponseDTO dto = new BoardResponseDTO();
        boolean liked = likeRepo.existsByBoardAndUsername(board, username);
        dto.setLiked(liked);
        return dto;
    }
}