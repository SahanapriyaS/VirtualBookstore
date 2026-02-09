package com.ey.dto.response;

import java.time.LocalDateTime;

import com.ey.enums.TransactionType;

public class TransactionResponse {

	private Long id;
	private String customerName;
	private String bookTitle;
	private TransactionType type;
	private LocalDateTime transactionDate;
	private LocalDateTime returnDate;

	public TransactionResponse() {
	}

	public TransactionResponse(Long id, String customerName, String bookTitle, TransactionType type,
			LocalDateTime transactionDate, LocalDateTime returnDate) {
		this.id = id;
		this.customerName = customerName;
		this.bookTitle = bookTitle;
		this.type = type;
		this.transactionDate = transactionDate;
		this.returnDate = returnDate;
	}

	public Long getId() {
		return id;
	}

	public String getCustomerName() {
		return customerName;
	}

	public String getBookTitle() {
		return bookTitle;
	}

	public TransactionType getType() {
		return type;
	}

	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}

	public LocalDateTime getReturnDate() {
		return returnDate;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public void setBookTitle(String bookTitle) {
		this.bookTitle = bookTitle;
	}

	public void setType(TransactionType type) {
		this.type = type;
	}

	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}

	public void setReturnDate(LocalDateTime returnDate) {
		this.returnDate = returnDate;
	}
}
