package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long book_id;


    @Column(name = "title")
    private String title;

    @Column(name="author")
    private String author;

    @Column(nullable = false, length = 2048, name = "description")
    private String description;

    @Column(nullable = false, name = "genre")
    @Enumerated(EnumType.STRING)
    private BookCategory genre;

    @Column(name = "image_url")
    private String imageUrl;
    Integer noOfCopies;

    public void borrowBook() {
        this.noOfCopies--;
    }

    public void returnBook() {
        this.noOfCopies++;
    }

    public Integer getNoOfCopies() {
        return noOfCopies;
    }

    public void setNoOfCopies(Integer noOfCopies) {
        this.noOfCopies = noOfCopies;
    }

    // getters and setters

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String url) {
        this.imageUrl = url;
    }

    public Long getBook_id() {
        return book_id;
    }

    public void setBook_id(Long id) {
        this.book_id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGenre() {
        return genre.name();
    }

    public void setGenre(BookCategory genre) {
        this.genre = genre;
    }
}
