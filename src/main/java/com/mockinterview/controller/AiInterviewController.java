package com.mockinterview.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mockinterview.dto.AskQuestionRequest;
import com.mockinterview.service.AiInterviewService;

@RestController
@RequestMapping("/api/ai")
public class AiInterviewController {

    private final AiInterviewService aiInterviewService;

    public AiInterviewController(
            AiInterviewService aiInterviewService) {

        this.aiInterviewService =
                aiInterviewService;
    }


    @PostMapping("/question")
    public String askQuestion(
            @RequestBody AskQuestionRequest request) {

        return aiInterviewService.generateQuestion(
                request.getInterviewId(),
                request.getProgrammingLanguage(),
                request.getCategory(),
                request.getDifficulty()
        );
    }
}