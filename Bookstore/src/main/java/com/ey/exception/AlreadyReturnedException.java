package com.ey.exception;

public class AlreadyReturnedException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public AlreadyReturnedException(String message) {
        super(message);
    }
}