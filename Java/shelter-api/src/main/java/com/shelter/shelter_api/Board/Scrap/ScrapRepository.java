package com.shelter.shelter_api.Board.Scrap;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelter.shelter_api.Board.Board.BoardEntity;
import com.shelter.shelter_api.User.entity.UserEntity;

public interface ScrapRepository extends JpaRepository<ScrapEntity, Long> {

    List<ScrapEntity> findByUser(UserEntity user);
    
//    Optional<UserEntity> findByUsername(String username);

    Optional<ScrapEntity> findByUserAndBoard(UserEntity user, BoardEntity board);

    void deleteByUserAndBoard(UserEntity user, BoardEntity board);

    boolean existsByUserAndBoard(UserEntity user, BoardEntity board);
}
