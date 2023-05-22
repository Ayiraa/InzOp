//import React from 'react';
import { Link } from "react-router-dom"; // Assuming you are using React Router for routing
import "./navbar.css"; // Importing external CSS file for styling

const logout = () => {
  const token = localStorage.getItem('token');

  // Check if token exists
  if (token) {
    // Make a POST request to logout endpoint
    fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Handle response
        if (response.ok) {
          // Logout successful, remove token from storage
          localStorage.removeItem('token');
          console.log('Logout successful');
        } else {
          console.log('Logout failed');
        }
      })
      .catch(error => {
        console.log('Error occurred during logout:', error);
      });
  } else {
    console.log('No token found in localStorage');
  }
};


const NavbarLogIn = () => {
  if (window.localStorage.getItem("userRole") === "ADMIN") {
    return (
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Strona główna
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/books" className="navbar-link">
              Książki
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link">
              Profil
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/borrows" className="navbar-link">
              Wypożyczenia
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/usrs" className="navbar-link">
              Użytkownicy
            </Link>
          </li>
          <li className="navbar-item" onClick={logout}>
            <Link to="/books" className="navbar-link">
              Wyloguj
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Strona główna
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/books" className="navbar-link">
              Książki
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link">
              Profil
            </Link>
          </li>
          <li className="navbar-item" onClick={logout}>
            <Link to="/books" className="navbar-link">
              Wyloguj
            </Link>
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
          <Link to="/" className="navbar-link">
            Strona główna
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/books" className="navbar-link">
            Książki
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">
            Logowanie
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" className="navbar-link">
            Rejestracja
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { NavbarLogIn, NavbarLogOut };
