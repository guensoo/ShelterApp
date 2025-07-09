package com.shelter.shelter_api.Board.Scrap;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScrapDTO {
    private Long id;
    private Long userId;
    private Long boardId;
    private String boardTitle;
    private String boardUsername;
    private String createdAt;
}