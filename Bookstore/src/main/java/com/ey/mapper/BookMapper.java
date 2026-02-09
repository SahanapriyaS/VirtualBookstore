package com.ey.mapper;

import org.springframework.stereotype.Component;

import com.ey.dto.request.CreateBookRequest;
import com.ey.dto.response.BookResponse;
import com.ey.entity.Book;

@Component
public class BookMapper {

    public Book toEntity(CreateBookRequest request) {

        if (request == null) {
            return null;
        }

        Book book = new Book();

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setCategory(request.getCategory());
        book.setPrice(request.getPrice());
        book.setStock(request.getStock());
        book.setDescription(request.getDescription());
        book.setRating(0.0);

        return book;
    }


    public BookResponse toResponse(Book book) {

        if (book == null) {
            return null;
        }

        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getCategory(),
                book.getPrice(),
                book.getStock(),
                book.getDescription(),
                book.getRating(),
                book.getCreatedAt()
        );
    }
}
