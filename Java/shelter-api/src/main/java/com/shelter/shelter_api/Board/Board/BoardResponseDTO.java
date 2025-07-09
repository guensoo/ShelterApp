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
    private boolean liked;      // ← 로그인한 유저가 추천한 글이면 true
    private boolean reported;   // ← 로그인한 유저가 신고한 글이면 true
    
    public static BoardResponseDTO fromEntity(BoardEntity e) {
        return fromEntity(e, false, false); // 기본값: liked=false, reported=false
    }

    public static BoardResponseDTO fromEntity(BoardEntity e, boolean liked, boolean reported) {
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
        dto.setLiked(liked);
        dto.setReported(reported);
        return dto;
    }
    
}
