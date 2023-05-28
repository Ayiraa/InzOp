import React, { useState, useEffect } from 'react';
import useToken from '../../../useToken';
import './booklist.css';


const BookList = () => {
  const { token } = useToken();
  const [books, setBooks] = useState([]);
  const [searched, setSearched] = useState();

    function checkTitle(bkTitle, srchBkTitle) { 
      for(var wordTitle of bkTitle) {
          wordTitle = wordTitle.toLowerCase();

          for(var srchWordTitle of srchBkTitle) {
            srchWordTitle = srchWordTitle.toLowerCase();
              
            if (wordTitle===srchWordTitle) { return 1; }
            else {return 0;}
          }
        }
      return 0;
    }
    




    const borrowBook = async (ev, bkId) => {
      ev.preventDefault();
      const responseBorrowBook = await
          fetch('http://localhost:8080/borrow', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              "bookId": bkId,
              "userId": window.localStorage.getItem('userId')
          })
          }).then( (response) => { return response } ).catch( (err) => { console.log(err); } );

      const dataBorrowBook = await responseBorrowBook;
      console.log(dataBorrowBook);
      //document.location.reload();
    };

    function ifLoged(bkId){
      if(window.localStorage.getItem('userId')){
        return(
          <form className='borrow-form' onSubmit={ event => borrowBook(event, bkId)}> 
            <button className='borrow-button' type="submit">Wypożycz</button>
          </form>
          );
      } else { return(''); }
    }




    const delBook = async (ev, bkId) => {
      ev.preventDefault();
      const resDelBook = await
        fetch('http://localhost:8080/books/'+bkId, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            'Accept': 'application/json'
        }
        }).then( (response) => { return response } ).catch( (err) => { console.log(err); } );
      if(resDelBook){
        document.location.reload();
      }
        
    };

    function delBookSubmit(bkId){
      if(window.localStorage.getItem('userRole')==="ADMIN"){
        return (
          <form className='borrow-form' onSubmit={ event => delBook(event, bkId)}>
            <button className='borrow-button' type="submit">Usuń</button>
          </form>
        );
      } else { return(''); }
    }


    function retFullList() {
      return (
        <div id="book-list">
           {books.map( (book) => (
            <div className='book-list-item' id={book.book_id} key={book.book_id}>
                <img src={book.imageUrl} alt={book.title} className="book-list-image" />
              <div className='book-list-caption'>
                  <h2>Tytuł: {book.title}</h2>
                  <h3>Autor: {book.author}</h3>
                  <h4>Opis: {book.description}</h4>
                  <h5>Dział: {book.genre}</h5>
                  <p>Dostępna ilość: {book.noOfCopies}</p>
              </div>
              <div className='book-buttons'>
                {ifLoged(book.book_id)}
                {delBookSubmit(book.book_id)}
              </div>
            </div>
          )) }
        </div>
      )
    }
    


    function retNFullList() {
      return (
        <div id="book-list">
           {books.map( (book) => 
            {              
            if( checkTitle( (book.title).split(' '), searched.split(' ') ) ){ return (
              <div className='book-list-item' id={book.book_id} key={book.book_id}>
                <img src={book.imageUrl} alt={book.title} className="book-list-image" />
                <div className='book-list-caption'>
                    <h2>Tytuł: {book.title}</h2>
                    <h3>Autor: {book.author}</h3>
                    <h4>Opis: {book.description}</h4>
                    <h5>Dział: {book.genre}</h5>
                    <p>Dostępna ilość: {book.noOfCopies}</p>
                </div>
                <div className='book-buttons'>
                {ifLoged(book.book_id)}
                {delBookSubmit(book.book_id)}
                </div>
              </div> );
            } else { return (''); };
            }
          ) }
        </div>
      )
    }

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();
    const [genre, setGenre] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [noOfCopies, setNoOfCopies] = useState();
    
    async function addBook(bkDt) {
      console.log(JSON.stringify(bkDt));
      return fetch('http://localhost:8080/books', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify(bkDt)
      })
      .then(data => data.json());
    }

    const addBookSubmit = async e => {
      e.preventDefault();
      addBook({
        title,
        author,
        description,
        genre,
        imageUrl,
        noOfCopies
      });
    }

    function bookForm(){
      if(window.localStorage.getItem('userRole')==="ADMIN"){
        return (
          <form className="addbook-wrapper" onSubmit={addBookSubmit}>
          <h2>Dodawanie książki</h2>
          <label className="addbook-label">
            <p>Tytuł</p>
            <input type="text" className="addbook-input" onChange={e => setTitle(e.target.value)} />
          </label>
          <label className="addbook-label">
            <p>Autor</p>
            <input type="text" className="addbook-input" onChange={e => setAuthor(e.target.value)} />
          </label>
          <label className="addbook-label">
            <p>Opis</p>
            <input type="text" className="addbook-input" onChange={e => setDescription(e.target.value)} />
          </label>
          <label className="addbook-label">
            <p>Gatunek</p>
            <input list="genre" className="addbook-input" onChange={e => setGenre(e.target.value)}/>
            <datalist id="genre" className="addbook-input" >
                <option value="BIOGRAPHY" />
                <option value="FANTASY" />
                <option value="HISTORY" />
                <option value="HORROR" />
                <option value="NON_FICTION" />
                <option value="ROMANCE" />
                <option value="SCIENCE" />
                <option value="SCIENCE_FICTION" />
                <option value="THRILLER" />
                <option value="OTHERS" />
            </datalist>
          </label>
          <label className="addbook-label">
            <p>Adres zdjęcia okładki</p>
            <input type="text" className="addbook-input" onChange={e => setImageUrl(e.target.value)} />
          </label>
          <label className="addbook-label">
            <p>Ilość kopii</p>
            <input type="number" className="addbook-input" onChange={e => setNoOfCopies(e.target.value)} />
          </label>
          <div className="login-submit">
            <button type="submit">Dodaj</button>
          </div>
        </form>
        );
      } else { return(''); }
    }






  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:8080/books');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
    
  }, []);



    function turn(){
      
      if(!searched){
        return (
          <div id="book-list-container">
            {bookForm()}
      
            <form className="book-search-form">
              <input type="text" className="book-search-text" placeholder="Wpisz tytuł książki"  onChange={e => setSearched(e.target.value) }></input>
            </form>
      
            <h1 className="book-list-title">Lista książek</h1>
                {retFullList()}
  
          </div>
        );
      } else {
        return (
          <div className="book-list-container">
          {bookForm()}
      
            <form className="book-search-form">
              <input type="text" className="book-search-text" onChange={e => setSearched(e.target.value) }></input>
            </form>
      
            <h1 className="book-list-title">Lista książek</h1>
                {retNFullList()}
  
          </div>
        );
      }


    }
    return turn();

};

export default BookList;
