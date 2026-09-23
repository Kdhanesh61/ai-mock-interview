package com.mockinterview.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mockinterview.dto.LoginRequest;
import com.mockinterview.dto.LoginResponse;
import com.mockinterview.dto.RegisterRequest;
import com.mockinterview.dto.VerifyOtpRequest;
import com.mockinterview.service.AuthService;
import com.mockinterview.service.OtpService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private OtpService otpService;


    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        otpService.sendOtp(
                request.getName(),
                request.getEmail(),
                request.getPassword()
        );

        return ResponseEntity.ok(
                "OTP sent successfully to your email"
        );
    }


    // =====================================================
    // VERIFY OTP
    // =====================================================

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        String response =
                otpService.verifyOtp(
                        request.getEmail(),
                        request.getOtp()
                );

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }
}