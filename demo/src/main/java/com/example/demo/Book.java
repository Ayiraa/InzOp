package com.example.demo;

import jakarta.persistence.*;

@Entity
@Table(name="books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


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


    // getters and setters

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String url) {
        this.imageUrl = url;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
