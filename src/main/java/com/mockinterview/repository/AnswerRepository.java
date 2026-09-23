package com.mockinterview.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.entity.Answer;

public interface AnswerRepository
        extends JpaRepository<Answer, Long> {

    List<Answer> findByQuestionInterviewId(Long interviewId);
}