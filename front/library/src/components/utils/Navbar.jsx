import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './navbar.css'; // Importing external CSS file for styling


  

function logout() {

  localStorage.clear();
    const fetchLogout= async () => {
      const responseLogout = await fetch('http://localhost:8080/auth/logout');
      const dataLogout = await responseLogout;
      console.log(dataLogout);
  
    };
  fetchLogout();
}

const NavbarLogIn = () => {
  const navigate = useNavigate();

  if(window.localStorage.getItem('userRole') === 'ADMIN'){
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                  <Link to="/" className="navbar-link">Strona główna</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/books" className="navbar-link">Książki</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/profile" className="navbar-link">Profil</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/borrows" className="navbar-link">Wypożyczenia</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/usrs" className="navbar-link">Użytkownicy</Link>
                </li>
                <li className="navbar-item">
                  <button onClick={() => {logout(); navigate('/login'); document.location.reload();}} className="navbar-link">Wyloguj</button>
                </li>
            </ul>
        </nav>
    );
  } else {
    return (
      <nav className="navbar">
          <ul className="navbar-list">
              <li className="navbar-item">
                <Link to="/" className="navbar-link">Strona główna</Link>
              </li>
              <li className="navbar-item">
                <Link to="/books" className="navbar-link">Książki</Link>
              </li>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">Profil</Link>
              </li>
              <li className="navbar-item">
                  <button onClick={() => {logout(); navigate('/login'); document.location.reload();}} className="navbar-link">Wyloguj</button>
              </li>
          </ul>
      </nav>
    );
  }
};

const NavbarLogOut = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                  <Link to="/" className="navbar-link">Strona główna</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/books" className="navbar-link">Książki</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="navbar-link">Logowanie</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/register" className="navbar-link">Rejestracja</Link>
                </li>
            </ul>
        </nav>
    );
};



export {NavbarLogIn, NavbarLogOut};
