import React, { useState } from 'react';
//import { useNavigate } from "react-router-dom";
import './register.css';



function valiPass(pass){
  var checked = 0;

  if(pass.length < 8){
    document.getElementById('registerValidate').innerHTML="hasło musi zawierać co najmniej 8 znaków";
    return 0;
  } else {

    //sprawdzamy czy są jakieś małe litery
    for(var p of pass){
      if(p === p.toLowerCase() ){ checked++; }
    }
    
    if(checked===0){
      document.getElementById('registerValidate').innerHTML="hasło musi zawierać co najmniej 1 małą literę";
      return 0;
    } else {
      checked = 0;

      //sprawdzamy czy są jakieś duże litery
      for(p of pass){
        if(p === p.toUpperCase()){ checked++; }
      }

      if(checked===0){
        document.getElementById('registerValidate').innerHTML="hasło musi zawierać co najmniej 1 dużą literę";
        return 0;
      } else {
        //sprawdzamy czy są jakieś specjalne znaki
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        
        if(!specialChars.test(pass)){
          document.getElementById('registerValidate').innerHTML="hasło musi zawierać co najmniej 1 znak specjalny";
          return 0;
        } else {
          return 1;
        }

      }
    }
  }
}

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
    
    valiPass(password);
    if(valiPass(password)){
      registerUser({
        firstname,
        lastname,
        email,
        password
      });
      //navigate("/login");
      document.location.reload();
    }
  }


  return(
    <div className="login-wrapper">
      <h1>Registration</h1>
      <p id="registerValidate" style={{color: 'red'}}></p>
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
