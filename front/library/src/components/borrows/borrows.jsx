import React, { useState, useEffect } from 'react';
import useToken from '../../useToken';
import './borrows.css';



const Borrows = () => {
    const { token } = useToken();
    const [borrows, setBorrows] = useState([]);
    const [books, setBooks] = useState([]);
    //const [usersData, setUsersData] = useState([]);
    const [searched, setSearched] = useState();
    


    useEffect( () => {

        const fetchBooks = async () => {
            const responseBooks = await fetch('http://localhost:8080/books');
            const dataBooks = await responseBooks.json();
            setBooks(dataBooks);
        };

        const fetchBorrows = async () => {
            const responseBorrows = await
                fetch('http://localhost:8080/borrow', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
                }).then( (response) => { return response } ).catch( (err) => { console.log(err); } );
                    //.then( (data) => { console.log(data); return data;} )
    
            const dataBorrows = await responseBorrows.json();
            setBorrows(dataBorrows);

            fetchBooks();
        };

        const fetchUsers = async () => {

            const responseUsers = await
                fetch('http://localhost:8080/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
                }).then( (resUs) => { return resUs } ).catch( (err) => { console.log(err); } );
                const dataUsers = await responseUsers.json();
            if (dataUsers)
            {
                //setUsersData(dataUsers);
                fetchBorrows();
            }
        };
        fetchUsers();


    }, [token]);
    

    const borrowDel = async (brId) => {
        const responseBorrowBook = await
            fetch('http://localhost:8080/borrow', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "borrowId": brId
            })
            }).then( (response) => { return response } ).catch( (err) => { console.log(err); } );
                //.then( (data) => { console.log(data); return data;} )
  
        const dataBorrowBook = await responseBorrowBook.json();
        if(dataBorrowBook) {
            document.location.reload();
        }
      };




function retFullList() {
    return (
      <div>
        {Object.values(borrows).map( (borrow) => (
            <div className='borrows' key={borrow.borrowId} id={borrow.borrowId} >
                <h4 className='borrow-data'> Tytuł książki: "
                    {books.map( (book) =>
                        {
                            if( book.book_id === borrow.bookId) { return( book.title ) }
                            else { return('') }
                        }
                    )}"
                </h4>
                <h5 className='borrow-data'> Email użytkownika: {borrow.user_email} </h5>
                <h5 className='borrow-data'> Data wypożyczenia: {borrow.issueDate} </h5>
                <h5 className='borrow-data'> Data oddania: {borrow.returnDate} </h5>
                <h5 className='borrow-data'> Termin oddania: {borrow.dueDate} </h5>
                <form className='borrow-data' onSubmit={e => {e.preventDefault(); borrowDel(borrow.borrowId) } }>
                  <button className='borrow-button' type='submit'>Oddaj</button>
                </form>
            </div>
         )
         )}
      </div>
    )
  }
  
  function retNFullList() {
    // console.log(searched);
    return (
      <div>
         {Object.values(borrows).map( (borrow) => 
          {         
            
          if( parseInt(searched) === (borrow.borrowId) || searched === borrow.user_email ){ return (
            <div className='borrows' key={borrow.borrowId} id={borrow.borrowId} >
                <h4 className='borrow-data'> Tytuł książki: "
                    {books.map( (book) =>
                        {
                            if( book.book_id === borrow.bookId) { return( book.title ) }
                            else { return('') }
                        }
                    )}"
                </h4>
                <h5 className='borrow-data'> Email użytkownika: {borrow.user_email} </h5>
                <h5 className='borrow-data'> Data wypożyczenia: {borrow.issueDate} </h5>
                <h5 className='borrow-data'> Data oddania: {borrow.returnDate} </h5>
                <h5 className='borrow-data'> Termin oddania: {borrow.dueDate} </h5>
                <form className='borrow-data' onSubmit={e => {e.preventDefault(); borrowDel(borrow.borrowId) } }>
                  <button className='borrow-button' type='submit'>Oddaj</button>
                </form>
            </div>
            );
          } else { return (''); };
          }
        ) }
      </div>
    )
  }


  function turn(){
    
    if(!searched){
      return (
        <div id="book-list-container">
    
          <form className="book-search-form">
            <input type="text" className="book-search-text" placeholder="Wpisz email użytkownika" onChange={e => setSearched(e.target.value) }></input>
          </form>
    
          <h1 className="book-list-title">Lista książek</h1>
            <div id="borrows-list">
              {retFullList()}
            </div>

        </div>
      );
    } else {
      return (
        <div className="book-list-container">
    
          <form className="book-search-form">
            <input type="text" className="book-search-text" placeholder="Wpisz email użytkownika" onChange={e => setSearched(e.target.value) }></input>
          </form>
    
          <h1 className="book-list-title">Lista książek</h1>
            <div id="borrows-list">
              {retNFullList()}
            </div>

        </div>
      );
    }


  }
  return turn();

};













export default Borrows;
