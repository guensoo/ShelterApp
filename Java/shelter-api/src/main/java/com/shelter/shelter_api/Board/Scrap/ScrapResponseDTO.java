package com.shelter.shelter_api.Board.Scrap;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScrapResponseDTO {
    private Long id;
    private Long boardId;
    private String boardTitle;
    private String boardUsername;
    private String createdAt;
}
