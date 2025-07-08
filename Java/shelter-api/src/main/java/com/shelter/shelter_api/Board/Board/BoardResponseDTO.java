package com.shelter.shelter_api.Board.Board;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BoardResponseDTO {
    private Long id;
    private Long postNo;
    private String title;
    private String content;
    private String username;
    private boolean isNotice;
    private boolean isPrivate;
    private int viewCount;
    private int likeCount;
    private int scrapCount;
    private int reportCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BoardResponseDTO fromEntity(BoardEntity e) {
        BoardResponseDTO dto = new BoardResponseDTO();
        dto.setId(e.getId());
        dto.setPostNo(e.getPostNo());
        dto.setTitle(e.getTitle());
        dto.setContent(e.getContent());
        dto.setUsername(e.getUsername());
        dto.setNotice(e.isNotice());
        dto.setPrivate(e.isPrivate());
        dto.setViewCount(e.getViewCount());
        dto.setLikeCount(e.getLikeCount());
        dto.setScrapCount(e.getScrapCount());
        dto.setReportCount(e.getReportCount());
        dto.setCreatedAt(e.getCreatedAt());
        dto.setUpdatedAt(e.getUpdatedAt());
        return dto;
    }
}
