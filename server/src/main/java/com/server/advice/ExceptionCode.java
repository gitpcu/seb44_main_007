package com.server.advice;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    PASSWORD_INCORRECT(405, "Password incorrect"),
    WISHLIST_NOT_FOUND(404, "Wishlist not found"),
    TRADE_NOT_FOUND(404, "Trade not found"),
    FIXED_NOT_FOUND(404, "fixed not found"),
    TOTAL_NOT_FOUND(404, "Total not found"),
    EMAIL_NOT_FOUND(404, "Email not found"),
    TRADE_CREATION_FAILED(404, "Trade_creation_failed"),
    USER_INPUT_ERROR(404, "User_input_error"),
    INVALID_USER(404, "Invalid_user");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}