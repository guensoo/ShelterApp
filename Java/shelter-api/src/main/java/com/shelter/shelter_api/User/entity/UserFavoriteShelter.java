package com.shelter.shelter_api.User.entity;

import com.shelter.shelter_api.User.UserFavoriteShelterId;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_favorite_shelter")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserFavoriteShelter {

    @EmbeddedId
    private UserFavoriteShelterId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // 쉼터 정보는 연관관계(@ManyToOne)로 갖지 않음
    // shelterType + shelterId로만 구분
}
