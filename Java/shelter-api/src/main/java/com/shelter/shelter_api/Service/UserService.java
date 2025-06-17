package com.shelter.shelter_api.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shelter.shelter_api.DTO.LoginRequest;
import com.shelter.shelter_api.DTO.SignupRequest;
import com.shelter.shelter_api.Entity.UserEntity;
import com.shelter.shelter_api.Repository.UserRepository;
import com.shelter.shelter_api.Security.JwtProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider; // JWT 유틸 클래스 (토큰 생성 담당)

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
            .role("USER")
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

        return jwtProvider.createToken(user.getUsername(), user.getRole());
    }
}
