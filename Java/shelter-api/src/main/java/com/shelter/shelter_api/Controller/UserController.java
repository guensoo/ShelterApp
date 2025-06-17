package com.shelter.shelter_api.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.DTO.LoginRequest;
import com.shelter.shelter_api.DTO.SignupRequest;
import com.shelter.shelter_api.Service.UserService;
import com.shelter.shelter_api.jwt.JwtTokenResponse;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest dto) {
        userService.signup(dto);
        return ResponseEntity.ok("회원가입 완료");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dto) {
        String token = userService.login(dto); // JWT 토큰 발급
        return ResponseEntity.ok(new JwtTokenResponse(token));
    }
}
