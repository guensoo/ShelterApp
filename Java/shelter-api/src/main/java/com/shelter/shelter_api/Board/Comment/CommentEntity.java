package com.shelter.shelter_api.Board.Comment;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.shelter.shelter_api.Board.Board.BoardEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "comments")
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long commentNo; // 게시글 내 댓글 순번 (선택사항, 1부터)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board; // 어떤 게시글의 댓글인지

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private CommentEntity parent; // 대댓글일 경우 상위 댓글

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<CommentEntity> replies = new ArrayList<>();

    private String author;
    private String content;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
