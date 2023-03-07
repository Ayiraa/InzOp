package com.example.demo.Entity;

public enum BookCategory {
    BIOGRAPHY("Biography"),
    FANTASY("Fantasy"),
    HISTORY("History"),
    HORROR("Horror"),
    NON_FICTION("Non Fiction"),
    ROMANCE("Romance"),
    SCIENCE("Science"),
    THRILLER("Thriller"),
    OTHERS("Others");

    private final String name;

    BookCategory(String name) {
        this.name = name;
    }

    @Override public String toString() {
        return name;
    }
}
