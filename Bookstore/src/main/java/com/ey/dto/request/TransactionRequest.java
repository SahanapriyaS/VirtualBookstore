package com.ey.dto.request;



import com.ey.enums.TransactionType;

import jakarta.validation.constraints.NotNull;

public class TransactionRequest {

	@NotNull(message = "Customer ID is required")
	private Long customerId;

	@NotNull(message = "Book ID is required")
	private Long bookId;

	@NotNull(message = "Transaction type is required")
	private TransactionType type;

	public TransactionRequest() {
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Long getBookId() {
		return bookId;
	}

	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}

	public TransactionType getType() {
		return type;
	}

	public void setType(TransactionType type) {
		this.type = type;
	}
}

