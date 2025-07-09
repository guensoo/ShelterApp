package com.shelter.shelter_api.Board.Board;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    
    @Transactional
    public void deleteBoard(Long boardId, String username) {
        BoardEntity board = boardRepository.findById(boardId)
            .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));

        // 관리자이거나, 본인이 작성한 글인지 체크 (예시)
        if (!board.getUsername().equals(username) && !isAdmin(username)) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        boardRepository.delete(board);
    }

    private boolean isAdmin(String username) {
        UserEntity user = userRepository.findByUsername(username).orElse(null);
        return user != null && user.getRole() == Role.ADMIN;
    }
}
