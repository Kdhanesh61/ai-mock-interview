package com.mockinterview.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mockinterview.dto.CodeRunRequest;
import com.mockinterview.dto.CodeRunResponse;
import com.mockinterview.service.CodeExecutionService;

@RestController
@RequestMapping("/api/code")
public class CodeController {

    private final CodeExecutionService codeExecutionService;

    public CodeController(
            CodeExecutionService codeExecutionService) {

        this.codeExecutionService =
                codeExecutionService;
    }

    @PostMapping("/run")
    public ResponseEntity<CodeRunResponse> runCode(
            @RequestBody CodeRunRequest request) {

        CodeRunResponse response =
                codeExecutionService.runCode(request);

        return ResponseEntity.ok(response);
    }
}