package com.mockinterview.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.mockinterview.dto.CompleteInterviewResponse;
import com.mockinterview.dto.DashboardResponse;
import com.mockinterview.dto.InterviewResponse;
import com.mockinterview.dto.StartInterviewRequest;
import com.mockinterview.entity.Interview;
import com.mockinterview.service.InterviewService;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public InterviewController(
            InterviewService interviewService) {

        this.interviewService =
                interviewService;
    }


    // =====================================================
    // GET MY INTERVIEWS
    // =====================================================

    @GetMapping("/my")
    public ResponseEntity<List<InterviewResponse>>
            getMyInterviews(
                    Authentication authentication) {

        String email =
                authentication.getName();


        List<InterviewResponse> interviews =
                interviewService.getMyInterviews(
                        email
                );


        return ResponseEntity.ok(
                interviews
        );
    }


    // =====================================================
    // GET STATS
    // =====================================================

    @GetMapping("/stats")
    public ResponseEntity<DashboardResponse>
            getStats(
                    Authentication authentication) {

        String email =
                authentication.getName();


        DashboardResponse response =
                interviewService.getDashboard(
                        email
                );


        return ResponseEntity.ok(
                response
        );
    }


    // =====================================================
    // GET DASHBOARD
    // =====================================================

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse>
            getDashboard(
                    Authentication authentication) {

        String email =
                authentication.getName();


        DashboardResponse response =
                interviewService.getDashboard(
                        email
                );


        return ResponseEntity.ok(
                response
        );
    }


    // =====================================================
    // START INTERVIEW
    // =====================================================

    @PostMapping("/start")
    public ResponseEntity<InterviewResponse>
            startInterview(
                    @RequestBody
                    StartInterviewRequest request,

                    Authentication authentication) {


        String email =
                authentication.getName();


        InterviewResponse response =
                interviewService.startInterview(
                        request,
                        email
                );


        return ResponseEntity.ok(
                response
        );
    }


    // =====================================================
    // COMPLETE INTERVIEW
    // =====================================================

    @PostMapping("/{id}/complete")
    public ResponseEntity<CompleteInterviewResponse>
            completeInterview(
                    @PathVariable Long id) {


        Interview interview =
                interviewService.completeInterview(
                        id
                );


        CompleteInterviewResponse response =
                new CompleteInterviewResponse();


        response.setInterviewId(
                interview.getId()
        );


        response.setStatus(
                interview.getStatus()
        );


        response.setScore(
                interview.getScore()
        );


        response.setMessage(
                "Interview completed successfully"
        );


        return ResponseEntity.ok(
                response
        );
    }


    // =====================================================
    // GET INTERVIEW BY ID
    // =====================================================

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<InterviewResponse>
            getInterview(
                    @PathVariable Long id,
                    Authentication authentication) {


        String email =
                authentication.getName();


        InterviewResponse response =
                interviewService.getInterviewById(
                        id,
                        email
                );


        return ResponseEntity.ok(
                response
        );
    }
}