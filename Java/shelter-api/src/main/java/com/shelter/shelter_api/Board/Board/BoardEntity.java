package com.shelter.shelter_api.Board.Board;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.shelter.shelter_api.User.entity.UserEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    private Long id; // 내부 고유번호

    @Column(unique = true)
    private Long postNo; // 외부 노출 번호

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
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // 외래키 이름
    private UserEntity user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // BoardFileEntity와 1:N 관계, cascade ALL, orphanRemoval true
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BoardFileEntity> files = new ArrayList<>();
}
