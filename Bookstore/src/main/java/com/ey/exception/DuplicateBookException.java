package com.ey.exception;


public class DuplicateBookException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DuplicateBookException(String title) {
		super("Book already exists: " + title);
	}
}
