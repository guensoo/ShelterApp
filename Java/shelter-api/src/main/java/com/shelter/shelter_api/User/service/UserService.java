package com.shelter.shelter_api.User.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shelter.shelter_api.Board.Board.BoardRepository;
import com.shelter.shelter_api.Board.Comment.CommentRepository;
import com.shelter.shelter_api.Security.JwtProvider;
import com.shelter.shelter_api.User.Role;
import com.shelter.shelter_api.User.UserStatus;
import com.shelter.shelter_api.User.dto.LoginRequest;
import com.shelter.shelter_api.User.dto.SignupRequest;
import com.shelter.shelter_api.User.entity.ResetTokenEntity;
import com.shelter.shelter_api.User.entity.UserEntity;
import com.shelter.shelter_api.User.repository.ResetTokenRepository;
import com.shelter.shelter_api.User.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider; // JWT 유틸 클래스 (토큰 생성 담당)
    private final ResetTokenRepository resetTokenRepository;
    private final MailService mailService;
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    // 회원가입
    public void signup(SignupRequest dto) {
        if(userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }
        if(userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }
        UserEntity user = UserEntity.builder()
            .email(dto.getEmail())
            .username(dto.getUsername())
            .password(passwordEncoder.encode(dto.getPassword()))
            .nickname(dto.getNickname())
            .role(Role.USER)
            .status(UserStatus.ACTIVE)
            .build();
        userRepository.save(user);
    }
    
    // 로그인
    public String login(LoginRequest dto) {
        UserEntity user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return jwtProvider.createToken(user.getUsername(), user.getRole().name());
    }
    
    @Transactional
    public void deleteUserByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    // 아이디 찾기
    public String findUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserEntity::getUsername)
                .orElse(null);
    }

    // 1. 아이디+이메일 검증 후 임시토큰 발급/메일발송
    @Transactional
    public String createAndSendResetToken(String username, String email) {
        UserEntity user = userRepository.findByUsername(username).orElse(null);
        if (user == null || !user.getEmail().equals(email)) return null;
        String token = UUID.randomUUID().toString();
        LocalDateTime expires = LocalDateTime.now().plusMinutes(5);
        resetTokenRepository.save(new ResetTokenEntity(token, user.getId(), expires));
        mailService.sendResetLink(email, token);
        return token;
    }

    public boolean validateResetToken(String token) {
        ResetTokenEntity tokenEntity = resetTokenRepository.findByToken(token);
        return tokenEntity != null && tokenEntity.getExpiresAt().isAfter(LocalDateTime.now());
    }

    @Transactional
    public boolean updatePasswordByToken(String token, String newPassword) {
        ResetTokenEntity tokenEntity = resetTokenRepository.findByToken(token);
        if (tokenEntity == null || tokenEntity.getExpiresAt().isBefore(LocalDateTime.now())) return false;
        UserEntity user = userRepository.findById(tokenEntity.getUserId()).orElse(null);
        if (user == null) return false;
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        resetTokenRepository.delete(tokenEntity);
        return true;
    }
    
    @Transactional
    public void withdrawUser(String username) {
        UserEntity user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("사용자 없음"));

        user.setStatus(UserStatus.WITHDRAWN);
        user.setNickname("탈퇴한 사용자");
        userRepository.save(user);
    }
    
    @Transactional
    public void adminDeleteUserContent(String username) {
        UserEntity user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        commentRepository.deleteAllByUser(user);       // 댓글 삭제
        boardRepository.deleteAllByUsername(username); // 게시글 삭제 (username 기반)
    }
    
    @Transactional
    public void updateNickname(UserEntity user, String newNickname) {
        user.setNickname(newNickname);
        userRepository.save(user);
    }
    
    @Transactional
    public void changePassword(UserEntity user, String currentPassword, String newPassword) {
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
