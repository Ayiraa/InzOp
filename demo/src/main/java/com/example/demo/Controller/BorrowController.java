package com.example.demo.Controller;

import com.example.demo.Entity.Book;
import com.example.demo.Entity.Borrow;
import com.example.demo.Entity.User;
import com.example.demo.Repository.BookRepository;
import com.example.demo.Repository.BorrowRepository;
import com.example.demo.Repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/borrow")
public class BorrowController {

    private final BorrowRepository borrowRepository;

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    public BorrowController(BorrowRepository borrowRepository, UserRepository usersRepository, BookRepository booksRepository) {
        this.borrowRepository = borrowRepository;
        this.userRepository = usersRepository;
        this.bookRepository = booksRepository;
    }

    @GetMapping
    public List<Borrow> getAllBorrow() {
        return borrowRepository.findAll();
    }

    @PostMapping
    public String borrowBook(@RequestBody Borrow borrow) {
        User user = userRepository.findById(borrow.getUserId()).get();
        Book book = bookRepository.findById(borrow.getBookId()).get();

        if (book.getNoOfCopies() < 1) {
            return "The book \"" + book.getTitle() + "\" is out of stock!";
        }

        book.borrowBook();
        bookRepository.save(book);

        Date currentDate = new Date();
        Date overdueDate = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(overdueDate);
        c.add(Calendar.DATE, 7);
        overdueDate = c.getTime();
        borrow.setIssueDate(currentDate);
        borrow.setDueDate(overdueDate);
        borrowRepository.save(borrow);
        return user.getUsername() + " has borrowed one copy of \"" + book.getTitle() + "\"!";
    }
    @PutMapping
    public Borrow returnBook(@RequestBody Borrow borrow) {
        Borrow borrowBook = borrowRepository.findById(borrow.getBorrowId()).get();
        Book book = bookRepository.findById(borrowBook.getBookId()).get();

        book.returnBook();
        bookRepository.save(book);

        Date currentDate = new Date();
        borrowBook.setReturnDate(currentDate);
        return borrowRepository.save(borrowBook);
    }

    @GetMapping("user/{id}")
    public List<Borrow> booksBorrowedByUser(@PathVariable Long id) {
        return borrowRepository.findByUserId(id);
    }

    @GetMapping("book/{id}")
    public List<Borrow> bookBorrowHistory(@PathVariable Long id) {
        return borrowRepository.findByBookId(id);
    }
}
