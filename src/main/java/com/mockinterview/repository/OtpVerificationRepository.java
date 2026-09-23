package com.mockinterview.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.entity.OtpVerification;

public interface OtpVerificationRepository
        extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findTopByEmailOrderByIdDesc(String email);

    Optional<OtpVerification> findByEmail(String email);

    void deleteByEmail(String email);
}