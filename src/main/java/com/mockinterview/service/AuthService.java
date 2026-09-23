package com.mockinterview.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mockinterview.dto.LoginRequest;
import com.mockinterview.dto.LoginResponse;
import com.mockinterview.entity.User;
import com.mockinterview.repository.UserRepository;
import com.mockinterview.service.JwtService;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;


    // =====================================================
    // LOGIN
    // =====================================================

    public LoginResponse login(
            LoginRequest request) {

        // ---------------------------------------------
        // Find user
        // ---------------------------------------------

        User user =
                userRepository
                        .findByEmail(request.getEmail())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Invalid email or password"
                                )
                        );


        // ---------------------------------------------
        // Check password
        // ---------------------------------------------

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );


        if (!passwordMatches) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }


        // ---------------------------------------------
        // Check account
        // ---------------------------------------------

        if (!user.isEnabled()) {

            throw new RuntimeException(
                    "Account is not verified. Please verify your email first."
            );
        }


        // ---------------------------------------------
        // Generate JWT
        // ---------------------------------------------

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );


        System.out.println(
                "JWT generated successfully for: "
                        + user.getEmail()
        );


        // ---------------------------------------------
        // Return JSON response
        // ---------------------------------------------

        return new LoginResponse(
                "Login successful",
                token
        );
    }
}