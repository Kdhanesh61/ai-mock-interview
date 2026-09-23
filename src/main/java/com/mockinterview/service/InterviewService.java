package com.mockinterview.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mockinterview.dto.DashboardResponse;
import com.mockinterview.dto.InterviewResponse;
import com.mockinterview.dto.StartInterviewRequest;
import com.mockinterview.entity.Answer;
import com.mockinterview.entity.Interview;
import com.mockinterview.entity.User;
import com.mockinterview.repository.AnswerRepository;
import com.mockinterview.repository.InterviewRepository;
import com.mockinterview.repository.UserRepository;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;

    private final UserRepository userRepository;

    private final AnswerRepository answerRepository;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public InterviewService(
            InterviewRepository interviewRepository,
            UserRepository userRepository,
            AnswerRepository answerRepository) {

        this.interviewRepository =
                interviewRepository;

        this.userRepository =
                userRepository;

        this.answerRepository =
                answerRepository;
    }


    // =====================================================
    // START INTERVIEW
    // =====================================================

    public InterviewResponse startInterview(
            StartInterviewRequest request,
            String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        Interview interview =
                new Interview();


        // -------------------------------------------------
        // Basic information
        // -------------------------------------------------

        interview.setTitle(
                request.getTitle()
        );


        // -------------------------------------------------
        // Interview type
        // -------------------------------------------------

        interview.setInterviewType(
                request.getInterviewType()
        );


        // -------------------------------------------------
        // Programming language
        // -------------------------------------------------

        interview.setProgrammingLanguage(
                request.getProgrammingLanguage()
        );


        // -------------------------------------------------
        // Category
        // -------------------------------------------------

        interview.setCategory(
                request.getCategory()
        );


        // -------------------------------------------------
        // Difficulty
        // -------------------------------------------------

        interview.setDifficulty(
                request.getDifficulty()
        );


        // -------------------------------------------------
        // Number of questions
        // -------------------------------------------------

        interview.setQuestionCount(
                request.getQuestionCount()
        );


        // -------------------------------------------------
        // Status
        // -------------------------------------------------

        interview.setStatus(
                "STARTED"
        );


        // -------------------------------------------------
        // Initial score
        // -------------------------------------------------

        interview.setScore(
                null
        );


        // -------------------------------------------------
        // Start time
        // -------------------------------------------------

        interview.setStartedAt(
                LocalDateTime.now()
        );


        // -------------------------------------------------
        // Complete time
        // -------------------------------------------------

        interview.setCompletedAt(
                null
        );


        // -------------------------------------------------
        // User
        // -------------------------------------------------

        interview.setUser(
                user
        );


        // -------------------------------------------------
        // Save
        // -------------------------------------------------

        Interview savedInterview =
                interviewRepository.save(
                        interview
                );


        // -------------------------------------------------
        // Convert response
        // -------------------------------------------------

        return convertToResponse(
                savedInterview
        );
    }


    // =====================================================
    // GET MY INTERVIEWS
    // =====================================================

    public List<InterviewResponse> getMyInterviews(
            String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        List<Interview> interviews =
                interviewRepository.findByUserId(
                        user.getId()
                );


        List<InterviewResponse> responses =
                new ArrayList<>();


        for (Interview interview : interviews) {

            responses.add(
                    convertToResponse(
                            interview
                    )
            );
        }


        return responses;
    }


    // =====================================================
    // COMPLETE INTERVIEW
    // =====================================================

    public Interview completeInterview(
            Long id) {

        Interview interview =
                interviewRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Interview not found"
                                )
                        );


        // =================================================
        // GET ALL ANSWERS
        // =================================================

        List<Answer> answers =
                answerRepository
                        .findByQuestionInterviewId(id);


        // =================================================
        // CALCULATE SCORE
        // =================================================

        int totalScore = 0;

        int scoreCount = 0;


        for (Answer answer : answers) {

            if (answer.getScore() != null) {

                totalScore +=
                        answer.getScore();

                scoreCount++;
            }
        }


        // =================================================
        // FINAL SCORE
        // =================================================

        int finalScore = 0;


        if (scoreCount > 0) {

            double averageScore =
                    (double) totalScore
                    / scoreCount;


            /*
             * AI gives each answer a score out of 10.
             *
             * Example:
             *
             * Average = 8.0
             *
             * Final percentage = 80
             */

            finalScore =
                    (int) Math.round(
                            averageScore * 10
                    );
        }


        // =================================================
        // SAVE FINAL SCORE
        // =================================================

        interview.setScore(
                finalScore
        );


        // =================================================
        // COMPLETE STATUS
        // =================================================

        interview.setStatus(
                "COMPLETED"
        );


        // =================================================
        // COMPLETION TIME
        // =================================================

        interview.setCompletedAt(
                LocalDateTime.now()
        );


        // =================================================
        // SAVE INTERVIEW
        // =================================================

        return interviewRepository.save(
                interview
        );
    }


    // =====================================================
    // GET INTERVIEW BY ID
    // =====================================================

    public InterviewResponse getInterviewById(
            Long id,
            String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        Interview interview =
                interviewRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Interview not found"
                                )
                        );


        // -------------------------------------------------
        // Security check
        // -------------------------------------------------

        if (!interview.getUser()
                .getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "You are not allowed to access this interview"
            );
        }


        return convertToResponse(
                interview
        );
    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    public DashboardResponse getDashboard(
            String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        List<Interview> interviews =
                interviewRepository.findByUserId(
                        user.getId()
                );


        int totalInterviews =
                interviews.size();


        int completedInterviews =
                0;


        int startedInterviews =
                0;


        int totalScore =
                0;


        int scoreCount =
                0;


        int bestScore =
                0;


        for (Interview interview : interviews) {

            // ---------------------------------------------
            // Completed
            // ---------------------------------------------

            if ("COMPLETED".equalsIgnoreCase(
                    interview.getStatus())) {

                completedInterviews++;
            }


            // ---------------------------------------------
            // Started
            // ---------------------------------------------

            if ("STARTED".equalsIgnoreCase(
                    interview.getStatus())) {

                startedInterviews++;
            }


            // ---------------------------------------------
            // Score
            // ---------------------------------------------

            if (interview.getScore() != null) {

                totalScore +=
                        interview.getScore();

                scoreCount++;


                if (interview.getScore()
                        > bestScore) {

                    bestScore =
                            interview.getScore();
                }
            }
        }


        // =================================================
        // AVERAGE SCORE
        // =================================================

        int averageScore =
                0;


        if (scoreCount > 0) {

            averageScore =
                    totalScore
                    / scoreCount;
        }


        // =================================================
        // RESPONSE
        // =================================================

        DashboardResponse response =
                new DashboardResponse();


        response.setTotalInterviews(
                totalInterviews
        );


        response.setCompletedInterviews(
                completedInterviews
        );


        response.setStartedInterviews(
                startedInterviews
        );


        response.setAverageScore(
                averageScore
        );


        response.setBestScore(
                bestScore
        );


        return response;
    }


    // =====================================================
    // CONVERT INTERVIEW TO RESPONSE
    // =====================================================

    private InterviewResponse convertToResponse(
            Interview interview) {

        InterviewResponse response =
                new InterviewResponse();


        response.setId(
                interview.getId()
        );


        response.setTitle(
                interview.getTitle()
        );


        response.setInterviewType(
                interview.getInterviewType()
        );


        response.setProgrammingLanguage(
                interview.getProgrammingLanguage()
        );


        response.setCategory(
                interview.getCategory()
        );


        response.setDifficulty(
                interview.getDifficulty()
        );


        response.setQuestionCount(
                interview.getQuestionCount()
        );


        response.setStatus(
                interview.getStatus()
        );


        response.setScore(
                interview.getScore()
        );


        response.setStartedAt(
                interview.getStartedAt()
        );


        response.setCompletedAt(
                interview.getCompletedAt()
        );


        // -------------------------------------------------
        // User information
        // -------------------------------------------------

        if (interview.getUser() != null) {

            response.setUserId(
                    interview.getUser().getId()
            );


            response.setUserName(
                    interview.getUser().getName()
            );


            response.setUserEmail(
                    interview.getUser().getEmail()
            );
        }


        return response;
    }
}