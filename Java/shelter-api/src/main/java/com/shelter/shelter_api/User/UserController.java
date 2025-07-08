package com.shelter.shelter_api.User;

import com.shelter.shelter_api.Security.JwtProvider;
import com.shelter.shelter_api.jwt.JwtTokenResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

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
}
