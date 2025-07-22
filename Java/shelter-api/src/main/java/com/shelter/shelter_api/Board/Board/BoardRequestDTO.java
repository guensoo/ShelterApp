package com.shelter.shelter_api.Board.Board;

import java.util.List;

import com.shelter.shelter_api.User.entity.UserEntity;

import lombok.Data;

@Data
public class BoardRequestDTO {
    private String title;
    private String content;
    private boolean isNotice;
    private boolean isPrivate;
    private String password;
    private List<BoardFileDTO> files;  // 첨부파일 리스트

    // DTO → Entity 변환 (files는 여기서 직접 추가하지 않고 서비스단에서 처리하는게 좋음)
    public BoardEntity toEntity(String username, UserEntity user, Long postNo) {
        BoardEntity entity = new BoardEntity();
        entity.setTitle(this.title);
        entity.setContent(this.content);
        entity.setUsername(username);
        entity.setUser(user);
        entity.setNotice(this.isNotice);
        entity.setPrivate(this.isPrivate);
        entity.setPassword(this.password);
        entity.setPostNo(postNo);
        // files는 서비스에서 연동
        return entity;
    }
}