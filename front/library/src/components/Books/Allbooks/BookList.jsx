import React, { useState, useEffect } from 'react';
import './BookList.css'; // Importing external CSS file for styling

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:8080/books');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">Book List</h1>
      <table className="book-list-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Image URL</th>
            <th>Number of Copies</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.book_id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>{book.genre}</td>
              <td  style={{ width: "150px" }}><img src={book.imageUrl} alt={book.title} className="book-list-image" /></td>
              <td>{book.noOfCopies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
