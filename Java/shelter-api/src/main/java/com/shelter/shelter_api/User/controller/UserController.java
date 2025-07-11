package com.shelter.shelter_api.User.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelter.shelter_api.Security.JwtProvider;
import com.shelter.shelter_api.User.Role;
import com.shelter.shelter_api.User.dto.ChangePasswordRequest;
import com.shelter.shelter_api.User.dto.FindIdRequest;
import com.shelter.shelter_api.User.dto.FindIdResponse;
import com.shelter.shelter_api.User.dto.LoginRequest;
import com.shelter.shelter_api.User.dto.ResetLinkRequest;
import com.shelter.shelter_api.User.dto.ResetPasswordRequest;
import com.shelter.shelter_api.User.dto.SignupRequest;
import com.shelter.shelter_api.User.dto.UpdateNicknameRequest;
import com.shelter.shelter_api.User.dto.UserDTO;
import com.shelter.shelter_api.User.entity.UserEntity;
import com.shelter.shelter_api.User.repository.UserRepository;
import com.shelter.shelter_api.User.service.UserService;
import com.shelter.shelter_api.jwt.JwtTokenResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "회원/계정 API", description = "회원가입, 로그인, 내정보, 탈퇴, 아이디/비번 찾기 등")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final UserService userService;

    @Operation(summary = "회원가입", description = "신규 회원 가입")
    @ApiResponse(responseCode = "200", description = "회원가입 성공")
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

    @Operation(summary = "로그인", description = "아이디/비밀번호로 로그인 후 JWT 토큰 반환")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "로그인 성공(JWT 반환)"),
        @ApiResponse(responseCode = "401", description = "아이디/비밀번호 불일치")
    })
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

    @Operation(summary = "내 정보 조회", description = "JWT 토큰 기반 내 정보(UserDTO) 반환")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "조회 성공"),
        @ApiResponse(responseCode = "401", description = "유효하지 않은 토큰"),
        @ApiResponse(responseCode = "404", description = "사용자 없음")
    })
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
    
    @Operation(summary = "회원 탈퇴", description = "로그인한 사용자의 계정 탈퇴")
    @ApiResponse(responseCode = "200", description = "회원 탈퇴 완료")
    @DeleteMapping("/delete")
    public ResponseEntity<?> withdraw(@AuthenticationPrincipal UserDetails userDetails) {
        userService.withdrawUser(userDetails.getUsername());
        return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
    }
    
    @Operation(summary = "[관리자] 유저의 게시글+댓글 전체 삭제", description = "관리자가 특정 유저의 게시글+댓글 일괄 삭제")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "삭제 완료"),
        @ApiResponse(responseCode = "403", description = "권한 없음")
    })
    @DeleteMapping("/admin/delete-content/{username}")
    @PreAuthorize("hasRole('ADMIN')") // 이거 있으면 권한 체크됨
    public ResponseEntity<?> deleteUserContent(@PathVariable String username) {
        userService.adminDeleteUserContent(username);  // 댓글 + 글 삭제
        return ResponseEntity.ok("해당 사용자의 게시글과 댓글이 삭제되었습니다.");
    }
    
    // 1. 아이디 찾기
    @Operation(summary = "아이디 찾기", description = "이메일로 가입된 아이디(아이디 찾기)")
    @PostMapping("/find-id")
    public ResponseEntity<?> findUserId(@RequestBody FindIdRequest request) {
        String username = userService.findUserIdByEmail(request.getEmail());
        if (username == null) return ResponseEntity.badRequest().body("해당 이메일로 가입된 계정이 없습니다.");
        // 보안상: 이메일로 아이디 발송을 권장!
        return ResponseEntity.ok(new FindIdResponse(username));
    }

    // 2. 비밀번호 재설정 링크 이메일 발송
    @Operation(summary = "비밀번호 재설정 링크 이메일 발송", description = "비밀번호 재설정 링크를 메일로 발송")
    @PostMapping("/send-reset-link")
    public ResponseEntity<?> sendResetLink(@RequestBody ResetLinkRequest request) {
        String token = userService.createAndSendResetToken(request.getUsername(), request.getEmail());
        if (token == null) return ResponseEntity.badRequest().body("입력 정보가 일치하지 않습니다.");
        return ResponseEntity.ok("비밀번호 재설정 링크를 메일로 보냈습니다. 5분 내에 이용해주세요.");
    }

    // 3. 비밀번호 재설정(토큰으로)
    @Operation(summary = "비밀번호 재설정", description = "토큰을 통한 비밀번호 재설정")
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean ok = userService.updatePasswordByToken(request.getToken(), request.getNewPassword());
        if (!ok) return ResponseEntity.badRequest().body("토큰이 유효하지 않거나 만료되었습니다.");
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }
    
    @Operation(summary = "닉네임 변경", description = "로그인 사용자의 닉네임 변경")
    @PutMapping("/nickname")
    public ResponseEntity<?> updateNickname(@RequestBody UpdateNicknameRequest dto,
                                            @AuthenticationPrincipal UserEntity user) {
        userService.updateNickname(user, dto.getNickname());
        return ResponseEntity.ok().body(Map.of("message", "닉네임 변경 완료"));
    }

    @Operation(summary = "비밀번호 변경", description = "로그인 사용자의 비밀번호 변경")
    @PatchMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest dto,
                                            @AuthenticationPrincipal UserEntity user) {
        userService.changePassword(user, dto.getCurrentPassword(), dto.getNewPassword());
        return ResponseEntity.ok().body(Map.of("message", "비밀번호 변경 완료"));
    }
}
