//import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for routing
import './navbar.css'; // Importing external CSS file for styling



const NavbarLogIn = () => {

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
