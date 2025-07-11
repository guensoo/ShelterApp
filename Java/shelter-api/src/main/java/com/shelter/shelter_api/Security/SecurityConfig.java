package com.shelter.shelter_api.Security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.shelter.shelter_api.User.Role;
import com.shelter.shelter_api.User.entity.UserEntity;
import com.shelter.shelter_api.User.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService; // DI

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
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/user/signup",
                                "/user/login",
                                "/shelters/**",
                                "/board",
                                "/board/{boardId}",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v/api-docs/**"
                        ).permitAll()
                        .requestMatchers("/report/**").authenticated()
                        .requestMatchers("/board/write", "/board/{boardId}/liked", "/board/{boardId}/unliked", "/board/report", "/api/files/upload").authenticated()
                        .requestMatchers("/user/scraps", "/user/scraps/**").authenticated()
                        .requestMatchers("/comments").authenticated()
                        .requestMatchers("/report/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, userDetailsService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
	        		"https://www.shelter.io.kr",
	        		"http://localhost:3000",
	        		"http://192.168.3.24:3000"
        		));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
