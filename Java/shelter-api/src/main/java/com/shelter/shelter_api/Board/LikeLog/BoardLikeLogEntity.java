package com.shelter.shelter_api.Board.LikeLog;

import java.time.LocalDateTime;

import com.shelter.shelter_api.Board.Board.BoardEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "board_like_log", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"board_id", "username"})
})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class BoardLikeLogEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board;

    private String username; // 추천한 유저(로그인 아이디)

    private LocalDateTime createdAt;
}