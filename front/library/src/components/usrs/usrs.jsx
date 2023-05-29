import React, { useState, useEffect } from 'react';
import useToken from '../../useToken';



const Usrs = () => {
    const { token } = useToken();
    const [usersData, setUsersData] = useState([]);
    const [searched, setSearched] = useState();
    


    useEffect( () => {

        const fetchUsers = async () => {

            const responseUsers = await
                fetch('http://localhost:8080/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
                }).then( (resUs) => { return resUs } ).catch( (err) => { console.log(err); } );
            if (responseUsers)
            {
                const dataUsers = await responseUsers.json();
                setUsersData(dataUsers);
            }
        };
        fetchUsers();


    }, [token]);


    const userDel = async (usrId) => {
        const responseBorrowBook = await
            fetch('http://localhost:8080/users/'+usrId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
            }).then( (response) => { return response } ).catch( (err) => { console.log(err); } );
                //.then( (data) => { console.log(data); return data;} )
        if(responseBorrowBook){
          document.location.reload();
        }
      };


      const roleChng = async (usrId) => {
        const responseBorrowBook = await
            fetch('http://localhost:8080/borrow', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "user_id": usrId,
                "role": "ADMIN"
            })
            }).then( (response) => { return response } ).catch( (err) => { console.log(err); } );
                //.then( (data) => { console.log(data); return data;} )
  
        const dataBorrowBook = await responseBorrowBook.json();
        console.log(dataBorrowBook);
        document.location.reload();
      };

      
      function chckRole(rl, usId) {
        if(rl==="USER"){
            return (
                <form className='borrow-data' onSubmit={e => {e.preventDefault(); roleChng(usId) } }>
                <button className='borrow-button' type='submit'>Zmień rolę</button>
                </form>
            );
        } else { return(''); }
      }


function retFullList() {
    return (
      <div>
        {Object.values(usersData).map( (user) => (
            <div className='borrows' key={user.user_id} id={user.user_id} >
                <h5 className='borrow-data'> Dane użytkownika: {user.firstname} {user.lastname} </h5>
                <h5 className='borrow-data'> Adres e-mail: {user.email} </h5>
                <h5 className='borrow-data'> Rola użytkownika: {user.role} </h5>
                {/*{chckRole(user.role, user.user_id)}*/}
                <form className='borrow-data' onSubmit={e => {e.preventDefault(); userDel(user.user_id) } }>
                  <button className='borrow-button' type='submit'>Usuń</button>
                </form>
            </div>
         )
         )}
      </div>
    )
  }
  

  function retNFullList() {
    console.log(searched);
    return (
      <div>
        {Object.values(usersData).map( (user) => {
            
            if( parseInt(searched) === (user.user_id) || searched === user.email ){ return (
                <div className='borrows' key={user.user_id} id={user.user_id} >
                    <h5 className='borrow-data'> Dane użytkownika: {user.firstname} {user.lastname} </h5>
                    <h5 className='borrow-data'> Adres e-mail: {user.email} </h5>
                    <h5 className='borrow-data'> Rola użytkownika: {user.role} </h5>
                    {/*{chckRole(user.role, user.user_id)}*/}
                    <form className='borrow-data' onSubmit={e => {e.preventDefault(); userDel(user.user_id) } }>
                    <button className='borrow-button' type='submit'>Usuń</button>
                    </form>
                </div>
                );
            } else { return (''); };
        }
         )}
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
    
          <h1 className="book-list-title">Lista użytkowników</h1>
            <div id="usrs-list">
              {retFullList()}
            </div>

        </div>
      );
    } else {
      return (
        <div className="book-list-container">
    
          <form className="book-search-form">
            <input type="text" className="book-search-text" onChange={e => setSearched(e.target.value) }></input>
          </form>
    
          <h1 className="book-list-title">Lista książek</h1>
            <div id="usrs-list">
              {retNFullList()}
            </div>

        </div>
      );
    }


  }
  return turn();

};













export default Usrs;
