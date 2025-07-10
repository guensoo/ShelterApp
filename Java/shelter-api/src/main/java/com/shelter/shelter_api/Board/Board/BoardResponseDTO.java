package com.shelter.shelter_api.Board.Board;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import lombok.Data;

@Data
public class BoardResponseDTO {
    private Long id;
    private Long postNo;
    private String title;
    private String content;
    private String username;
    private String nickname; // ✅ 추가
    private boolean isNotice;
    private boolean isPrivate;
    private int viewCount;
    private int likeCount;
    private int scrapCount;
    private int reportCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean liked;
    private boolean reported;
    private List<BoardFileDTO> files;

    public static BoardResponseDTO fromEntity(BoardEntity e) {
        return fromEntity(e, false, false);
    }

    public static BoardResponseDTO fromEntity(BoardEntity e, boolean liked, boolean reported) {
        BoardResponseDTO dto = new BoardResponseDTO();
        dto.setId(e.getId());
        dto.setPostNo(e.getPostNo());
        dto.setTitle(e.getTitle());
        dto.setContent(e.getContent());
        dto.setUsername(e.getUsername());
        dto.setNickname(
            e.getUser() != null ? e.getUser().getNickname() : "탈퇴한 사용자" // ✅ nickname 설정
        );
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

        if (e.getFiles() != null) {
            List<BoardFileDTO> fileDtos = e.getFiles().stream()
                .map(f -> new BoardFileDTO(f.getUrl(), f.getOriginalFilename()))
                .collect(Collectors.toList());
            dto.setFiles(fileDtos);
        }

        return dto;
    }
}
