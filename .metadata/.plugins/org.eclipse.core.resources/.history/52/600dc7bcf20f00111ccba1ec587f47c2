package com.ey.controller;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ey.dto.request.TransactionRequest;
import com.ey.dto.response.TransactionResponse;
import com.ey.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

	private final TransactionService transactionService;

	public TransactionController(TransactionService transactionService) {
		this.transactionService = transactionService;
	}

	@PostMapping
	public ResponseEntity<TransactionResponse> createTransaction(@Valid @RequestBody TransactionRequest request) {
		return transactionService.createTransaction(request);
	}

	@GetMapping
	public ResponseEntity<List<TransactionResponse>> getAllTransactions() {
		return transactionService.getAllTransactions();
	}

	@GetMapping("/{id}")
	public ResponseEntity<TransactionResponse> getTransactionById(@PathVariable Long id) {
		return transactionService.getTransactionById(id);
	}
}
