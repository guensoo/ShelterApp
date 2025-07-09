package com.shelter.shelter_api.User.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shelter.shelter_api.User.entity.UserEntity;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByUsername(String username); // 아이디 중복확인
    boolean existsByEmail(String email);       // 이메일 중복확인

    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findById(Long id);
    void deleteByUsername(String username);
}
