package com.shelter.shelter_api.Board.Board;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public BoardResponseDTO createPost(BoardRequestDTO dto, String username) {
        Long maxPostNo = boardRepository.findMaxPostNo().orElse(0L);
        BoardEntity entity = dto.toEntity(username, maxPostNo + 1);
        BoardEntity saved = boardRepository.save(entity);
        return BoardResponseDTO.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<BoardResponseDTO> getAllPosts() {
        return boardRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(BoardResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public BoardResponseDTO getPostByPostNo(Long postNo) {
        BoardEntity entity = boardRepository.findByPostNo(postNo)
                .orElseThrow(() -> new RuntimeException("해당 게시글을 찾을 수 없습니다."));
        return BoardResponseDTO.fromEntity(entity);
    }
}
