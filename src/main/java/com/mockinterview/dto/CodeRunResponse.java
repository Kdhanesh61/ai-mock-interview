package com.mockinterview.dto;

public class CodeRunResponse {

    private boolean success;

    private String output;

    private String error;

    private long executionTime;

    public CodeRunResponse() {
    }

    public CodeRunResponse(
            boolean success,
            String output,
            String error,
            long executionTime) {

        this.success = success;
        this.output = output;
        this.error = error;
        this.executionTime = executionTime;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }
}