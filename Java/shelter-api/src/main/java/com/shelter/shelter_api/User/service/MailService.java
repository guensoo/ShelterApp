package com.shelter.shelter_api.User.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;
    public void sendResetLink(String to, String token) {
        String link = "http://localhost:3000/reset-password?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("비밀번호 재설정 안내");
        message.setText("아래 링크를 클릭하여 비밀번호를 재설정하세요 (5분간 유효)\n" + link);
        javaMailSender.send(message);
    }
    // (아이디 찾기 메일 발송도 필요하면 유사하게 구현)
}
