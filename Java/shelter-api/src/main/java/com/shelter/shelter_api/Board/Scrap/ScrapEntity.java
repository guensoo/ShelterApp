package com.shelter.shelter_api.Board.Scrap;

import com.shelter.shelter_api.Board.Board.BoardEntity;
import com.shelter.shelter_api.User.entity.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "scraps")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScrapEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User와 ManyToOne 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // BoardEntity와 ManyToOne 관계 (게시글 참조)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board;

    // 생성 시간
    @Column(nullable = false)
    private java.time.LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = java.time.LocalDateTime.now();
    }
}
