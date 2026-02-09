package com.ey.exception;

public class CustomerValidationException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CustomerValidationException(String message) {
		super(message);
	}
}
