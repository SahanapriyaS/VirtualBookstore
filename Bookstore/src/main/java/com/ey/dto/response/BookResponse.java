package com.ey.dto.response;


import java.time.LocalDateTime;

import com.ey.enums.Category;


public class BookResponse {

	private Long id;
	private String title;
	private String author;
	private Category category;
	private Double price;
	private Integer stock;
	private String description;
	private Double rating;
	private LocalDateTime createdAt;

	public BookResponse() {
	}

	public BookResponse(Long id, String title, String author, Category category, Double price, Integer stock,
			String description, Double rating, LocalDateTime createdAt) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.category = category;
		this.price = price;
		this.stock = stock;
		this.description = description;
		this.rating = rating;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getAuthor() {
		return author;
	}

	public Category getCategory() {
		return category;
	}

	public Double getPrice() {
		return price;
	}

	public Integer getStock() {
		return stock;
	}

	public String getDescription() {
		return description;
	}

	public Double getRating() {
		return rating;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
}

