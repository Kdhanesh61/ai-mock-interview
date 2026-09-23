package com.mockinterview.dto;

public class DashboardResponse {

    private long totalInterviews;
    private long completedInterviews;
    private long startedInterviews;
    private double averageScore;
    private Integer bestScore;

    public long getTotalInterviews() {
        return totalInterviews;
    }

    public void setTotalInterviews(long totalInterviews) {
        this.totalInterviews = totalInterviews;
    }

    public long getCompletedInterviews() {
        return completedInterviews;
    }

    public void setCompletedInterviews(long completedInterviews) {
        this.completedInterviews = completedInterviews;
    }

    public long getStartedInterviews() {
        return startedInterviews;
    }

    public void setStartedInterviews(long startedInterviews) {
        this.startedInterviews = startedInterviews;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public Integer getBestScore() {
        return bestScore;
    }

    public void setBestScore(Integer bestScore) {
        this.bestScore = bestScore;
    }
}