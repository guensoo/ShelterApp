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

        // ① user 조회
        UserEntity user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("사용자 없음"));

        // ② DTO → Entity 변환 (user 필드 포함)
        BoardEntity entity = dto.toEntity(username, user, maxPostNo + 1);

        // ③ 첨부파일 처리 (files가 null 아니면)
        if (dto.getFiles() != null && !dto.getFiles().isEmpty()) {
            for (BoardFileDTO fileDto : dto.getFiles()) {
                BoardFileEntity fileEntity = BoardFileEntity.builder()
                    .url(fileDto.getUrl())
                    .originalFilename(fileDto.getOriginalFilename())
                    .board(entity)
                    .build();
                entity.getFiles().add(fileEntity);
            }
        }

        // ④ 저장
        BoardEntity saved = boardRepository.save(entity);

        // ⑤ DTO 변환 및 nickname 세팅
        BoardResponseDTO responseDto = BoardResponseDTO.fromEntity(saved);
        responseDto.setNickname(user.getNickname());

        return responseDto;
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

        System.out.println("[DEBUG] 요청자 username: " + username);
        System.out.println("[DEBUG] 게시글 작성자: " + board.getUsername());
        System.out.println("[DEBUG] isAdmin: " + isAdmin(username));
        
        if (!board.getUsername().equals(username) && !isAdmin(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
        }

        boardRepository.delete(board);
    }

    @Transactional
    public BoardResponseDTO updatePost(Long postNo, BoardRequestDTO dto, String username) {
        // 1. 기존 게시글 찾기
        BoardEntity board = boardRepository.findByPostNoWithFiles(postNo)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글이 존재하지 않습니다."));

        // 2. 권한 체크 (작성자 또는 관리자만 수정 가능)
        if (!board.getUsername().equals(username) && !isAdmin(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
        }

        // 3. 제목/내용 업데이트
        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());
        board.setNotice(dto.isNotice());
        board.setPrivate(dto.isPrivate());

        // 4. 저장 후 DTO 변환
        BoardEntity updated = boardRepository.save(board);

        // 5. 닉네임 최신화
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));
        BoardResponseDTO response = BoardResponseDTO.fromEntity(updated);
        response.setNickname(user.getNickname());

        return response;
    }
    
    private boolean isAdmin(String username) {
        UserEntity user = userRepository.findByUsername(username).orElse(null);

        // 🟡 이 부분에서 값 확인
        System.out.println("[DEBUG] isAdmin 호출 username: " + username);
        System.out.println("[DEBUG] isAdmin user: " + user);
        System.out.println("[DEBUG] isAdmin user.getRole(): " + (user != null ? user.getRole() : "null"));

        return user != null && user.getRole() == Role.ADMIN;
    }
}
