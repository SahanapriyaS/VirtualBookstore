package com.ey.repository;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ey.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByCategory(Category category);

    List<Book> findByAuthorContainingIgnoreCase(String author);

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByPriceLessThanEqual(Double price);

    List<Book> findByStockGreaterThan(Integer stock);
    
    boolean existsByTitleAndAuthor(String title, String author);

}
