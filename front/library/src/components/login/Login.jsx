import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './login.css';



async function loginUser(credentials) {
  return fetch('http://localhost:8080/auth/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  })
   .then(data => data.json());
}


export default function Login({ setToken }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
    window.localStorage.setItem('eml', email);
    navigate("/profile");
  }


  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Adres email</p>
          <input type="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Hasło</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="login-submit">
          <button type="submit">Zaloguj</button>
        </div>
      </form>
    </div>
  )

}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
