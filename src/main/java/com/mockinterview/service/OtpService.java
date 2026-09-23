package com.mockinterview.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mockinterview.entity.OtpVerification;
import com.mockinterview.entity.User;
import com.mockinterview.repository.OtpVerificationRepository;
import com.mockinterview.repository.UserRepository;

@Service
public class OtpService {

    private final OtpVerificationRepository otpRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public OtpService(
            OtpVerificationRepository otpRepository,
            UserRepository userRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder) {

        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    public void sendOtp(
            String name,
            String email,
            String password) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException(
                    "Email already registered"
            );
        }

        String otp = generateOtp();

        OtpVerification verification =
                new OtpVerification();

        verification.setName(name);
        verification.setEmail(email);

        verification.setPassword(
                passwordEncoder.encode(password)
        );

        verification.setOtp(otp);

        verification.setExpiryTime(
                LocalDateTime.now().plusMinutes(5)
        );

        verification.setVerified(false);

        otpRepository.save(verification);

        emailService.sendOtpEmail(
                email,
                otp
        );
    }

    public String verifyOtp(
            String email,
            String otp) {

        Optional<OtpVerification> optional =
                otpRepository
                        .findTopByEmailOrderByIdDesc(email);

        if (optional.isEmpty()) {

            throw new RuntimeException(
                    "OTP not found"
            );
        }

        OtpVerification verification =
                optional.get();

        if (verification.getExpiryTime()
                .isBefore(LocalDateTime.now())) {

            throw new RuntimeException(
                    "OTP has expired"
            );
        }

        if (!verification.getOtp().equals(otp)) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        User user = new User();

        user.setName(
                verification.getName()
        );

        user.setEmail(
                verification.getEmail()
        );

        user.setPassword(
                verification.getPassword()
        );

        user.setRole("USER");

        user.setEnabled(true);

        userRepository.save(user);

        verification.setVerified(true);

        otpRepository.save(verification);

        return "Email verified and registration successful";
    }

    private String generateOtp() {

        Random random = new Random();

        int number =
                100000 + random.nextInt(900000);

        return String.valueOf(number);
    }
}