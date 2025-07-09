package com.shelter.shelter_api.Board.Scrap;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shelter.shelter_api.Board.Board.BoardEntity;
import com.shelter.shelter_api.Board.Board.BoardRepository;
import com.shelter.shelter_api.User.entity.UserEntity;
import com.shelter.shelter_api.User.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScrapService {

    private final ScrapRepository scrapRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Transactional(readOnly = true)
    public List<ScrapDTO> getScrapsByUsername(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        List<ScrapEntity> scraps = scrapRepository.findByUser(user);
        return scraps.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public void addScrapByUsername(String username, Long boardId) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        Long userId = user.getId();
        if (userId == null) {
            throw new RuntimeException("사용자 ID가 없습니다.");
        }
        
        addScrap(userId, boardId);
    }

    @Transactional
    public void removeScrapByUsername(String username, Long boardId) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        removeScrap(user.getId(), boardId);
    }

    @Transactional(readOnly = true)
    public List<ScrapDTO> getScrapsByUserId(String userId) {
    	UserEntity user = userRepository.findByUsername(userId)
    		     .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        List<ScrapEntity> scraps = scrapRepository.findByUser(user);
        return scraps.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public void addScrap(Long userId, Long boardId) {
        UserEntity user = userRepository.findById(userId) // userId는 Long이어야 하며, 이 메서드는 PK 기반 조회
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        BoardEntity board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        if (scrapRepository.existsByUserAndBoard(user, board)) {
            throw new RuntimeException("이미 스크랩한 게시글입니다.");
        }

        ScrapEntity scrap = ScrapEntity.builder()
                .user(user)
                .board(board)
                .build();

        scrapRepository.save(scrap);
    }

    @Transactional
    public void removeScrap(Long userId, Long boardId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        BoardEntity board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        scrapRepository.deleteByUserAndBoard(user, board);
    }

    private ScrapDTO toDTO(ScrapEntity scrap) {
        return ScrapDTO.builder()
                .id(scrap.getId())
                .userId(scrap.getUser().getId())
                .boardId(scrap.getBoard().getId())
                .boardTitle(scrap.getBoard().getTitle())
                .boardUsername(scrap.getBoard().getUsername())
                .createdAt(scrap.getCreatedAt().toString())
                .build();
    }
}
