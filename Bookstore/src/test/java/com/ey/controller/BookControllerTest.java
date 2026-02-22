package com.ey.controller;

import com.ey.dto.response.BookResponse;
import com.ey.enums.Category;
import com.ey.security.JwtAuthenticationFilter;  
import com.ey.service.BookService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
@AutoConfigureMockMvc(addFilters = false) 
class BookControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    BookService bookService;

    @MockBean
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    void getAllBooks_returnsOkArray() throws Exception {
        BookResponse br = new BookResponse(
                1L, "Title", "Author", Category.FICTION, 499.0, 5, "desc", 4.5, null
        );
        Mockito.when(bookService.getAllBooks())
               .thenReturn(ResponseEntity.ok(List.of(br)));

        mvc.perform(get("/api/books"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$[0].title").value("Title"))
           .andExpect(jsonPath("$[0].price").value(499.0));
    }

    @Test
    void getByCategory_returnsOk() throws Exception {
        Mockito.when(bookService.getByCategory(any(Category.class)))
               .thenReturn(ResponseEntity.ok(List.of()));

        mvc.perform(get("/api/books/category/FICTION"))
           .andExpect(status().isOk());
    }

    @Test
    void getById_returnsOk() throws Exception {
        BookResponse br = new BookResponse(
                9L, "Clean Code", "Robert C. Martin", Category.PROGRAMMING, 699.0, 10, "classic", 4.8, null
        );
        Mockito.when(bookService.getBookById(9L))
               .thenReturn(ResponseEntity.ok(br));

        mvc.perform(get("/api/books/9"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.id").value(9))
           .andExpect(jsonPath("$.author").value("Robert C. Martin"));
    }
}