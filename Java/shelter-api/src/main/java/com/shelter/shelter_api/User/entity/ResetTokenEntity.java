package com.shelter.shelter_api.User.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reset_token")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Data
public class ResetTokenEntity {
    @Id
    private String token;        // 랜덤 UUID
    private Long userId;
    private LocalDateTime expiresAt;
    private boolean used = false;
    
    // 생성자 추가 (token, userId, expiresAt)
    public ResetTokenEntity(String token, Long userId, LocalDateTime expiresAt) {
        this.token = token;
        this.userId = userId;
        this.expiresAt = expiresAt;
    }
}