package com.mockinterview.service;

import org.springframework.stereotype.Service;

import com.mockinterview.dto.AnswerResponse;
import com.mockinterview.dto.SubmitAnswerRequest;
import com.mockinterview.entity.Answer;
import com.mockinterview.entity.Question;
import com.mockinterview.repository.AnswerRepository;
import com.mockinterview.repository.QuestionRepository;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final QuestionRepository questionRepository;

    private final AiInterviewService aiInterviewService;

    public AnswerService(
            AnswerRepository answerRepository,
            QuestionRepository questionRepository,
            AiInterviewService aiInterviewService) {

        this.answerRepository = answerRepository;

        this.questionRepository = questionRepository;

        this.aiInterviewService = aiInterviewService;
    }

    public AnswerResponse submitAnswer(
            SubmitAnswerRequest request) {

        Question question = questionRepository
                .findById(request.getQuestionId())
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));

        String evaluation =
                aiInterviewService.evaluateAnswer(
                        question.getQuestion(),
                        request.getAnswerText()
                );

        Integer score = extractScore(evaluation);

        String feedback = extractFeedback(evaluation);

        String strengths = extractStrengths(evaluation);

        String improvements =
                extractImprovements(evaluation);

        Answer answer = new Answer();

        answer.setAnswerText(
                request.getAnswerText()
        );

        answer.setScore(score);

        answer.setFeedback(feedback);

        answer.setStrengths(strengths);

        answer.setImprovements(improvements);

        answer.setQuestion(question);

        Answer savedAnswer =
                answerRepository.save(answer);

        AnswerResponse response =
                new AnswerResponse();

        response.setAnswerId(
                savedAnswer.getId()
        );

        response.setQuestionId(
                question.getId()
        );

        response.setAnswerText(
                savedAnswer.getAnswerText()
        );

        response.setScore(
                savedAnswer.getScore()
        );

        response.setFeedback(
                savedAnswer.getFeedback()
        );

        response.setStrengths(
                savedAnswer.getStrengths()
        );

        response.setImprovements(
                savedAnswer.getImprovements()
        );

        return response;
    }

    private Integer extractScore(String evaluation) {

        try {

            int scoreIndex =
                    evaluation.indexOf("Score:");

            if (scoreIndex == -1) {
                return 0;
            }

            String scoreText =
                    evaluation
                            .substring(scoreIndex + 6)
                            .trim();

            String number =
                    scoreText
                            .split("/")[0]
                            .trim();

            return Integer.parseInt(number);

        } catch (Exception e) {

            return 0;
        }
    }

    private String extractFeedback(
            String evaluation) {

        return extractSection(
                evaluation,
                "Feedback:",
                "Strengths:"
        );
    }

    private String extractStrengths(
            String evaluation) {

        return extractSection(
                evaluation,
                "Strengths:",
                "Improvements:"
        );
    }

    private String extractImprovements(
            String evaluation) {

        return extractSection(
                evaluation,
                "Improvements:",
                null
        );
    }

    private String extractSection(
            String text,
            String startMarker,
            String endMarker) {

        int start =
                text.indexOf(startMarker);

        if (start == -1) {
            return "";
        }

        start += startMarker.length();

        int end;

        if (endMarker != null) {

            end = text.indexOf(
                    endMarker,
                    start
            );

        } else {

            end = text.length();
        }

        if (end == -1) {
            end = text.length();
        }

        return text
                .substring(start, end)
                .trim();
    }
}