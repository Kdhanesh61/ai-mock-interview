package com.mockinterview.dto;

public class AnswerResponse {

    private Long answerId;

    private Long questionId;

    private String answerText;

    private Integer score;
    
    private String strengths;

    private String improvements;

    private String feedback;

    public Long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Long answerId) {
        this.answerId = answerId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
    
    public String getStrengths() {
        return strengths;
    }

    public String getImprovements() {
        return improvements;
    }
    
    public void setStrengths(String strengths) {
        this.strengths = strengths;
    }

    public void setImprovements(String improvements) {
        this.improvements = improvements;
    }
}