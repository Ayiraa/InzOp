import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for routing
import './navbar.css'; // Importing external CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/books" className="navbar-link">Books</Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">Profile</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Log In</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" className="navbar-link">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
