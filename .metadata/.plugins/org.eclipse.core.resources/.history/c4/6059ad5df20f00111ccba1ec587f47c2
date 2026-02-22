package com.ey.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ey.dto.request.TransactionRequest;
import com.ey.dto.response.TransactionResponse;
import com.ey.entity.Book;
import com.ey.entity.Customer;
import com.ey.entity.Transaction;
import com.ey.enums.TransactionType;
import com.ey.exception.BookNotFoundException;
import com.ey.exception.BorrowNotAllowedException;
import com.ey.exception.CustomerNotFoundException;
import com.ey.exception.OutOfStockException;
import com.ey.exception.TransactionNotFoundException;
import com.ey.mapper.TransactionMapper;
import com.ey.repository.BookRepository;
import com.ey.repository.CustomerRepository;
import com.ey.repository.TransactionRepository;

@Service
public class TransactionService {

	private final TransactionRepository transactionRepository;
	private final BookRepository bookRepository;
	private final CustomerRepository customerRepository;
	private final TransactionMapper transactionMapper;

	private final List<String> allowedBorrowCities = Arrays.asList("Coimbatore", "Chennai", "Bangalore");

	public TransactionService(TransactionRepository transactionRepository, BookRepository bookRepository,
			CustomerRepository customerRepository, TransactionMapper transactionMapper) {
		this.transactionRepository = transactionRepository;
		this.bookRepository = bookRepository;
		this.customerRepository = customerRepository;
		this.transactionMapper = transactionMapper;
	}

	public ResponseEntity<TransactionResponse> createTransaction(TransactionRequest request) {

		Customer customer = customerRepository.findById(request.getCustomerId()).orElseThrow(
				() -> new CustomerNotFoundException("Customer not found with id: " + request.getCustomerId()));

		Book book = bookRepository.findById(request.getBookId())
				.orElseThrow(() -> new BookNotFoundException("Book not found with id: " + request.getBookId()));

		if (book.getStock() <= 0) {
			throw new OutOfStockException("Book is out of stock: " + book.getTitle());
		}

		if (request.getType() == TransactionType.BORROW) {
			if (!allowedBorrowCities.contains(customer.getCity())) {
				throw new BorrowNotAllowedException(
						"Customer from " + customer.getCity() + " is not allowed to borrow books");
			}
		}

		book.setStock(book.getStock() - 1);
		bookRepository.save(book);

		Transaction transaction = transactionMapper.toEntity(request, customer, book);
		if (request.getType() == TransactionType.BORROW) {
			transaction.setReturnDate(null);
		}

		Transaction savedTransaction = transactionRepository.save(transaction);

		TransactionResponse response = transactionMapper.toResponse(savedTransaction);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	
	public ResponseEntity<List<TransactionResponse>> getAllTransactions() {
		List<Transaction> transactions = transactionRepository.findAll();
		List<TransactionResponse> responseList = transactions.stream().map(transactionMapper::toResponse)
				.collect(Collectors.toList());
		return ResponseEntity.ok(responseList);
	}

	
	public ResponseEntity<TransactionResponse> getTransactionById(Long id) {
		Transaction transaction = transactionRepository.findById(id)
				.orElseThrow(() -> new TransactionNotFoundException("Transaction not found with id: " + id));
		return ResponseEntity.ok(transactionMapper.toResponse(transaction));
	}
}

