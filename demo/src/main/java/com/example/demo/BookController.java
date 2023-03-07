package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping("/books")
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @PostMapping("/books")
    public ResponseEntity<Book> addUser(@RequestBody Book book) {
        bookRepository.save(book);
        return ResponseEntity.ok(book);
    }

    // Delete user by id
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Get user by id
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getUser(@PathVariable Long id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
