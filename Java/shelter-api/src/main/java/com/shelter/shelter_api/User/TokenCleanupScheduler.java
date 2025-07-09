package com.shelter.shelter_api.User;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.shelter.shelter_api.User.repository.ResetTokenRepository;

@Component
public class TokenCleanupScheduler {

    private final ResetTokenRepository resetTokenRepository;

    public TokenCleanupScheduler(ResetTokenRepository resetTokenRepository) {
        this.resetTokenRepository = resetTokenRepository;
    }

    @Scheduled(cron = "0 0 * * * *") // 매 정시마다 실행
    @Transactional
    public void deleteExpiredTokens() {
        resetTokenRepository.deleteAllByExpiresAtBefore(LocalDateTime.now());
        System.out.println("만료된 토큰 삭제 완료!");
    }
}