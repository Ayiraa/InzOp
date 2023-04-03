import { useState } from 'react';

function Login() {
  // Define state variables for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Define state variable for JWT token
  const [token, setToken] = useState(null);
  
  // Define function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Send POST request to auth endpoint
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
       headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    console.log(response)
    
    // Check if response contains valid JSON data
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      // Parse response as JSON
      const data = await response.json();
      
      // Store JWT token in local storage
      localStorage.setItem('token', data.token);
      
      // Set token state variable to trigger re-render
      setToken(data.token);
    } else {
      // Handle non-JSON response
      console.log('Error: Response does not contain valid JSON data');
    }
  };
  
  
  // If token state variable is not null, user is logged in
  if (token) {
    return <p>You are logged in!</p>;
  }
  
  // Otherwise, render login form
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
