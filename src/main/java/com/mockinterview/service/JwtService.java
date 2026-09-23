package com.mockinterview.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    private final String secret =
            "MockInterviewApp-JWT-Secret-Key-2026-Strong-Secret-987654321";

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
    }

    // ==============================
    // GENERATE TOKEN
    // ==============================

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                + 60 * 60 * 1000
                        )
                )
                .signWith(getSigningKey())
                .compact();
    }

    // ==============================
    // EXTRACT EMAIL
    // ==============================

    public String extractEmail(String token) {

        Claims claims =
                Jwts.parser()
                        .verifyWith(getSigningKey())
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

        return claims.getSubject();
    }

    // ==============================
    // VALIDATE TOKEN
    // ==============================

    public boolean isTokenValid(
            String token,
            String email) {

        try {

            String tokenEmail =
                    extractEmail(token);

            return tokenEmail.equals(email)
                    && !isTokenExpired(token);

        } catch (Exception e) {

            return false;
        }
    }

    // ==============================
    // CHECK EXPIRATION
    // ==============================

    private boolean isTokenExpired(
            String token) {

        Claims claims =
                Jwts.parser()
                        .verifyWith(getSigningKey())
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

        return claims
                .getExpiration()
                .before(new Date());
    }
}