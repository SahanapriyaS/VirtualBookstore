package com.ey.exception;

public class OutOfStockException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public OutOfStockException(String title) {
        super("Book is out of stock: " + title);
    }
}

