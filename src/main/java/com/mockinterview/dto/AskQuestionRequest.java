package com.mockinterview.dto;

public class AskQuestionRequest {

    private Long interviewId;

    private String programmingLanguage;

    private String category;

    private String difficulty;


    // Interview ID

    public Long getInterviewId() {
        return interviewId;
    }

    public void setInterviewId(Long interviewId) {
        this.interviewId = interviewId;
    }


    // Programming Language

    public String getProgrammingLanguage() {
        return programmingLanguage;
    }

    public void setProgrammingLanguage(
            String programmingLanguage) {

        this.programmingLanguage =
                programmingLanguage;
    }


    // Category

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    // Difficulty

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {

        this.difficulty = difficulty;
    }
}