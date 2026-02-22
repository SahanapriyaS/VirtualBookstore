package com.ey.service;

import com.ey.dto.request.CreateBookRequest;
import com.ey.dto.request.UpdateBookRequest;
import com.ey.dto.response.BookResponse;
import com.ey.entity.Book;
import com.ey.enums.Category;
import com.ey.exception.DuplicateBookException;
import com.ey.mapper.BookMapper;
import com.ey.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookServiceTest {

    private BookRepository bookRepository;
    private BookMapper bookMapper;
    private BookService bookService;

    @BeforeEach
    void setUp() {
        bookRepository = mock(BookRepository.class);
        bookMapper = new BookMapper();
        bookService = new BookService(bookRepository, bookMapper);
    }

    @Test
    void addBook_shouldCreate_whenNotDuplicate() {
        CreateBookRequest req = new CreateBookRequest();
        req.setTitle("Clean Code");
        req.setAuthor("Robert C. Martin");
        req.setCategory(Category.PROGRAMMING);
        req.setPrice(699.0);
        req.setStock(10);
        req.setDescription("Classic");

        when(bookRepository.existsByTitleAndAuthor("Clean Code", "Robert C. Martin"))
                .thenReturn(false);

        Book saved = new Book();
        saved.setId(1L);
        saved.setTitle(req.getTitle());
        saved.setAuthor(req.getAuthor());
        saved.setCategory(req.getCategory());
        saved.setPrice(req.getPrice());
        saved.setStock(req.getStock());
        saved.setDescription(req.getDescription());

        when(bookRepository.save(any(Book.class))).thenReturn(saved);

        ResponseEntity<BookResponse> resp = bookService.addBook(req);

        assertThat(resp.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().getId()).isEqualTo(1L);

        ArgumentCaptor<Book> captor = ArgumentCaptor.forClass(Book.class);
        verify(bookRepository).save(captor.capture());
        assertThat(captor.getValue().getTitle()).isEqualTo("Clean Code");
    }

    @Test
    void addBook_shouldThrow_whenDuplicate() {
        CreateBookRequest req = new CreateBookRequest();
        req.setTitle("Clean Code");
        req.setAuthor("Robert C. Martin");
        req.setCategory(Category.PROGRAMMING);
        req.setPrice(699.0);
        req.setStock(10);

        when(bookRepository.existsByTitleAndAuthor("Clean Code", "Robert C. Martin"))
                .thenReturn(true);

        assertThatThrownBy(() -> bookService.addBook(req))
                .isInstanceOf(DuplicateBookException.class);

        verify(bookRepository, never()).save(any());
    }

    @Test
    void getByCategory_shouldReturnList() {
        Book b1 = new Book(); b1.setId(1L); b1.setTitle("K8s"); b1.setAuthor("X"); b1.setCategory(Category.DEVOPS); b1.setPrice(1.0); b1.setStock(2);
        Book b2 = new Book(); b2.setId(2L); b2.setTitle("CI/CD"); b2.setAuthor("Y"); b2.setCategory(Category.DEVOPS); b2.setPrice(2.0); b2.setStock(3);

        when(bookRepository.findByCategory(Category.DEVOPS)).thenReturn(List.of(b1, b2));

        var resp = bookService.getByCategory(Category.DEVOPS);

        assertThat(resp.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(resp.getBody()).hasSize(2);
    }

    @Test
    void updateBook_shouldModifyExisting() {
        UpdateBookRequest req = new UpdateBookRequest();
        req.setId(10L);
        req.setTitle("Refactoring 2nd Ed");
        req.setAuthor("Martin Fowler");
        req.setCategory(Category.PROGRAMMING);
        req.setPrice(799.0);
        req.setStock(5);
        req.setDescription("Updated");

        Book existing = new Book(); existing.setId(10L); existing.setTitle("Refactoring"); existing.setAuthor("Martin Fowler");
        existing.setCategory(Category.PROGRAMMING); existing.setPrice(599.0); existing.setStock(2);

        when(bookRepository.findById(10L)).thenReturn(Optional.of(existing));
        when(bookRepository.save(any(Book.class))).thenAnswer(inv -> inv.getArgument(0));

        var resp = bookService.updateBook(req);
        assertThat(resp.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(resp.getBody().getTitle()).isEqualTo("Refactoring 2nd Ed");
        assertThat(resp.getBody().getPrice()).isEqualTo(799.0);
        assertThat(resp.getBody().getStock()).isEqualTo(5);
    }
}