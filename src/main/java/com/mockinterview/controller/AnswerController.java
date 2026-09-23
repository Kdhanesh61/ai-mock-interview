package com.mockinterview.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mockinterview.dto.AnswerResponse;
import com.mockinterview.dto.SubmitAnswerRequest;
import com.mockinterview.service.AnswerService;

@RestController
@RequestMapping("/api/answer")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(
            AnswerService answerService) {

        this.answerService = answerService;
    }

    @PostMapping
    public ResponseEntity<AnswerResponse> submitAnswer(
            @RequestBody SubmitAnswerRequest request) {

        AnswerResponse response =
                answerService.submitAnswer(request);

        return ResponseEntity.ok(response);
    }
}