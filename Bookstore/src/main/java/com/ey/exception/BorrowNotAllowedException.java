package com.ey.exception;


public class BorrowNotAllowedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public BorrowNotAllowedException(String message) {
		super(message);
	}
}
