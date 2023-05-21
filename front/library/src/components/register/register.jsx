import React, { useState } from 'react';
//import { useNavigate } from "react-router-dom";
import './register.css';



async function registerUser(credentials) {
    console.log(JSON.stringify(credentials));
  return fetch('http://localhost:8080/auth/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  })
   .then(data => data.json());
}


export default function Register() {
  //const navigate = useNavigate();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser({
      firstname,
      lastname,
      email,
      password
    });
    //navigate("/login");
    document.location.reload();
  }


  return(
    <div className="login-wrapper">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Imię</p>
          <input type="text" onChange={e => setFirstname(e.target.value)} />
        </label>
        <label>
          <p>Nazwisko</p>
          <input type="text" onChange={e => setLastname(e.target.value)} />
        </label>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Hasło</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="login-submit">
          <button type="submit">Zarejestruj</button>
        </div>
      </form>
    </div>
  )

}
