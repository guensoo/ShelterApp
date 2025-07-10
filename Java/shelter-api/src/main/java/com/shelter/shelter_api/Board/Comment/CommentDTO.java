package com.shelter.shelter_api.Board.Comment;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long id;
    private String content;
    private String username;  // 작성자 이름
    private String nickname;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static CommentDTO fromEntity(CommentEntity entity) {
        return CommentDTO.builder()
                .id(entity.getId())
                .content(entity.getContent())
                .username(entity.getUser().getUsername())
                .nickname(entity.getUser().getNickname())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}