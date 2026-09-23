package com.mockinterview.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mockinterview.dto.GenerateQuestionsRequest;
import com.mockinterview.dto.QuestionResponse;
import com.mockinterview.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(
            QuestionService questionService) {

        this.questionService = questionService;
    }

    @GetMapping("/interview/{interviewId}")
    public ResponseEntity<List<QuestionResponse>>
            getQuestionsByInterview(
                    @PathVariable Long interviewId) {

        List<QuestionResponse> questions =
                questionService
                        .getQuestionsByInterview(interviewId);

        return ResponseEntity.ok(questions);
    }
    
    @PostMapping("/generate")
    public ResponseEntity<List<QuestionResponse>> generateQuestions(
            @RequestBody GenerateQuestionsRequest request) {

        List<QuestionResponse> questions =
                questionService.generateQuestions(
                        request.getInterviewId(),
                        request.getCount()
                );

        return ResponseEntity.ok(questions);
    }
}