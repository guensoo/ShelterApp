package com.shelter.shelter_api.Board.Board;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BoardRequestDTO {
    private String title;
    private String content;
    private boolean isNotice;
    private boolean isPrivate;
    private String password;
    
    // ✅ DTO → Entity 변환
    public BoardEntity toEntity(String username, Long postNo) {
        BoardEntity entity = new BoardEntity();
        entity.setTitle(this.title);
        entity.setContent(this.content);
        entity.setUsername(username);
        entity.setNotice(this.isNotice);
        entity.setPrivate(this.isPrivate);
        entity.setPassword(this.password);
        entity.setPostNo(postNo);
        return entity;
    }
}