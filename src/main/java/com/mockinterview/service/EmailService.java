package com.mockinterview.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String email, String otp) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "AI Mock Interview - Email Verification OTP"
        );

        message.setText(
                "Hello,\n\n"
                + "Your OTP for AI Mock Interview registration is:\n\n"
                + otp
                + "\n\n"
                + "This OTP is valid for 5 minutes.\n\n"
                + "If you did not request this OTP, please ignore this email.\n\n"
                + "AI Mock Interview Team"
        );

        mailSender.send(message);
    }
}