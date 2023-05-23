import React, { useState, useEffect } from 'react';
import useToken from '../../useToken';


const Profile = () => {
    const { token } = useToken();
    const [borrows, setBorrows] = useState([]);
    const [books, setBooks] = useState([]);
    const [userData, setUserData] = useState([]);
    
    function adminButton(role){
        if(role==="ADMIN"){ return(<button onClick={adminOptions}>Opcje Administratora</button>); }
        else{ return(''); }
    }
    function adminOptions() { document.location.reload(); }

    useEffect( () => {

        const fetchBooks = async () => {
            const responseBooks = await fetch('http://localhost:8080/books');
            const dataBooks = await responseBooks.json();
            setBooks(dataBooks);
        };

        const fetchBorrows = async () => {
            const responseBorrows = await
                fetch('http://localhost:8080/borrow/user/'+ window.localStorage.getItem('userId'), {
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
                fetch('http://localhost:8080/user/'+window.localStorage.getItem('eml'), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
                }).then( (resUs) => { return resUs } ).catch( (err) => { console.log(err); } );
                const dataUsers = await responseUsers.json();
            if (dataUsers)
            {
                setUserData(dataUsers);
                window.localStorage.setItem('userId', dataUsers.user_id);
                window.localStorage.setItem('userRole', dataUsers.role);
                fetchBorrows();
            }
        };
        fetchUsers();
        
    }, [token]);
    
    

  return (
<div>
    <div className='users'>
        <h1> Twoje dane: </h1>
        <h3> Imię i nazwisko: { userData.firstname } { userData.lastname } </h3>
        <h3> Adres e-mail: { userData.email } </h3>
        <h3> Rola: { userData.role } </h3>
        {adminButton(userData.role)}
    </div>

<h1> Lista wypożeczonych książek: </h1>
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
                <h5 className='borrow-data'> Data wypożyczenia: {borrow.issueDate} </h5>
                <h5 className='borrow-data'> Termin oddania: {borrow.dueDate} </h5>

            </div>
         )
         )}
</div>
   );


};


export default Profile;
