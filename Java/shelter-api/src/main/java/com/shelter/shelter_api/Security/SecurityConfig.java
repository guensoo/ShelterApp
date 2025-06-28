package com.shelter.shelter_api.Security;

import com.shelter.shelter_api.Enum.Role;
import com.shelter.shelter_api.User.UserEntity;
import com.shelter.shelter_api.User.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @PostConstruct
    public void createAdminUserIfNotExists() {
        if (!userRepository.existsByUsername("admin")) {
            PasswordEncoder encoder = new BCryptPasswordEncoder(); // 직접 생성
            UserEntity admin = UserEntity.builder()
                    .email("admin@example.com")
                    .username("admin")
                    .password(encoder.encode("admin123"))
                    .nickname("관리자")
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
        }
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // ✅ cors만 단독으로 호출하거나 커스터마이저 붙이기
                .csrf(csrf -> csrf.disable())    // ✅ cors랑 체이닝 안 함
                .httpBasic(httpBasic -> httpBasic.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/user/signup", "/user/login").permitAll()
                        .requestMatchers("/shelters/**").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
