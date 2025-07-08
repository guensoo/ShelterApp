package com.shelter.shelter_api.Board.Board;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "boards")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 내부 고유번호 (예: 250708001)

    @Column(unique = true)
    private Long postNo; // 외부 노출 번호 (1부터 순차 증가)

    private String title;
    private String content;
    private String username;
    
    private boolean isNotice;   // 공지글 여부
    private boolean isPrivate;  // 비밀글 여부
    private String password;    // 비밀글 비번 (nullable)

    private int viewCount;
    private int likeCount;
    private int scrapCount;
    private int reportCount;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
