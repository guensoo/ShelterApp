package com.shelter.shelter_api.User.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.shelter.shelter_api.User.entity.ResetTokenEntity;

public interface ResetTokenRepository extends JpaRepository<ResetTokenEntity, String> {
    ResetTokenEntity findByToken(String token);
    
    @Transactional
    @Modifying
    @Query("DELETE FROM ResetTokenEntity r WHERE r.expiresAt < :expiresAt")
    void deleteAllByExpiresAtBefore(@Param("expiresAt") LocalDateTime expiresAt);

}