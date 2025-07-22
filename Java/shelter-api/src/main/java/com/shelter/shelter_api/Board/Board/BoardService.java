package com.shelter.shelter_api.Board.Board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.shelter.shelter_api.User.Role;
import com.shelter.shelter_api.User.entity.UserEntity;
import com.shelter.shelter_api.User.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional
    public BoardResponseDTO createPost(BoardRequestDTO dto, String username) {
        Long maxPostNo = boardRepository.findMaxPostNo().orElse(0L);

        // 1. BoardEntity 생성
        BoardEntity entity = dto.toEntity(username, maxPostNo + 1);

        // 2. 첨부파일 리스트 처리 (files가 null 또는 비어있으면 skip)
        if (dto.getFiles() != null && !dto.getFiles().isEmpty()) {
            for (BoardFileDTO fileDto : dto.getFiles()) {
                BoardFileEntity fileEntity = BoardFileEntity.builder()
                        .url(fileDto.getUrl())
                        .originalFilename(fileDto.getOriginalFilename())
                        .board(entity)
                        .build();
                entity.getFiles().add(fileEntity); // BoardEntity의 files에 추가
            }
        }

        BoardEntity saved = boardRepository.save(entity); // cascade ALL이므로 파일도 함께 저장됨
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
        BoardEntity entity = boardRepository.findByPostNoWithFiles(postNo)
                .orElseThrow(() -> new RuntimeException("해당 게시글을 찾을 수 없습니다."));
        return BoardResponseDTO.fromEntity(entity);
    }
    
    @Transactional
    public void deleteBoard(Long boardId, String username) {
        BoardEntity board = boardRepository.findById(boardId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글이 존재하지 않습니다."));

        if (!board.getUsername().equals(username) && !isAdmin(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
        }

        boardRepository.delete(board);
    }

    private boolean isAdmin(String username) {
        UserEntity user = userRepository.findByUsername(username).orElse(null);
        return user != null && user.getRole() == Role.ADMIN;
    }
}
