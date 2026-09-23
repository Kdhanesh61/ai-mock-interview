package com.mockinterview.dto;

public class LoginResponse {

    private String message;

    private String token;


    // =========================================
    // CONSTRUCTOR
    // =========================================

    public LoginResponse() {
    }


    public LoginResponse(
            String message,
            String token) {

        this.message = message;
        this.token = token;
    }


    // =========================================
    // GETTERS
    // =========================================

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }


    // =========================================
    // SETTERS
    // =========================================

    public void setMessage(String message) {
        this.message = message;
    }

    public void setToken(String token) {
        this.token = token;
    }
}