package com.ey.exception;

public class BookNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public BookNotFoundException(String string) {
        super("Book not found with id: " + string);
    }
}

