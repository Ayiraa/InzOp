package com.example.demo.Entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Borrow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer borrowId;
    Long bookId;
    Long userId;

    String user_email;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using=JsonDateSerializer.class)
    Date issueDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using=JsonDateSerializer.class)
    Date returnDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using=JsonDateSerializer.class)
    Date dueDate;

    public Borrow(Integer borrowId, Long bookId, String user_email, Long userId, Date issueDate, Date returnDate, Date dueDate) {
        this.borrowId = borrowId;
        this.bookId = bookId;
        this.userId = userId;
        this.issueDate = issueDate;
        this.returnDate = returnDate;
        this.dueDate = dueDate;
        this.user_email=user_email;

    }

    public Borrow() {
    }

    public Integer getBorrowId() {
        return borrowId;
    }

    public void setBorrowId(Integer borrowId) {
        this.borrowId = borrowId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }
}
