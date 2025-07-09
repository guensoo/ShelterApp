package com.shelter.shelter_api.User.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.shelter.shelter_api.Security.JwtProvider;
import com.shelter.shelter_api.User.Role;
import com.shelter.shelter_api.User.dto.FindIdRequest;
import com.shelter.shelter_api.User.dto.FindIdResponse;
import com.shelter.shelter_api.User.dto.LoginRequest;
import com.shelter.shelter_api.User.dto.ResetLinkRequest;
import com.shelter.shelter_api.User.dto.ResetPasswordRequest;
import com.shelter.shelter_api.User.dto.SignupRequest;
import com.shelter.shelter_api.User.dto.UserDTO;
import com.shelter.shelter_api.User.entity.UserEntity;
import com.shelter.shelter_api.User.repository.UserRepository;
import com.shelter.shelter_api.User.service.UserService;
import com.shelter.shelter_api.jwt.JwtTokenResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body("이미 사용 중인 이메일입니다.");
        }
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body("이미 사용 중인 아이디입니다.");
        }

        UserEntity user = UserEntity.builder()
                .email(signupRequest.getEmail())
                .username(signupRequest.getUsername())
                .nickname(signupRequest.getNickname())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        UserEntity user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        String token = jwtProvider.createToken(user.getUsername(), user.getRole().name());
        return ResponseEntity.ok(new JwtTokenResponse(token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        String token = jwtProvider.resolveToken(request);
        if (token == null || !jwtProvider.validateToken(token)) {
            return ResponseEntity.status(401).body("유효하지 않은 토큰입니다.");
        }

        String username = jwtProvider.getUsernameFromToken(token);
        UserEntity user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        UserDTO userDTO = UserDTO.builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .role(user.getRole())
                .build();

        return ResponseEntity.ok(userDTO);
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        String token = jwtProvider.resolveToken(request);
        if (token == null || !jwtProvider.validateToken(token)) {
            return ResponseEntity.status(401).body("유효하지 않은 토큰입니다.");
        }
        String username = jwtProvider.getUsernameFromToken(token);
        userService.deleteUserByUsername(username);
        return ResponseEntity.ok("회원탈퇴가 완료되었습니다.");
    }
    
    // 1. 아이디 찾기
    @PostMapping("/find-id")
    public ResponseEntity<?> findUserId(@RequestBody FindIdRequest request) {
        String username = userService.findUserIdByEmail(request.getEmail());
        if (username == null) return ResponseEntity.badRequest().body("해당 이메일로 가입된 계정이 없습니다.");
        // 보안상: 이메일로 아이디 발송을 권장!
        return ResponseEntity.ok(new FindIdResponse(username));
    }

    // 2. 비밀번호 재설정 링크 이메일 발송
    @PostMapping("/send-reset-link")
    public ResponseEntity<?> sendResetLink(@RequestBody ResetLinkRequest request) {
        String token = userService.createAndSendResetToken(request.getUsername(), request.getEmail());
        if (token == null) return ResponseEntity.badRequest().body("입력 정보가 일치하지 않습니다.");
        return ResponseEntity.ok("비밀번호 재설정 링크를 메일로 보냈습니다. 5분 내에 이용해주세요.");
    }

    // 3. 비밀번호 재설정(토큰으로)
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean ok = userService.updatePasswordByToken(request.getToken(), request.getNewPassword());
        if (!ok) return ResponseEntity.badRequest().body("토큰이 유효하지 않거나 만료되었습니다.");
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }
}
