import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
         
          setMessage('Login successful!');
        
          navigate('/cart');
        } else {
        
          setMessage('Login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Login failed. Please check your credentials.');
      });
  };

  return (
    <div className="login-container">
      <h1 className="app-title">Let's Shop</h1>
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button onClick={handleLogin}>Login</button>
        <div style={{marginTop:"30px"}} id="message">{message}</div>
      </div>
    </div>
  );
}

export default Login;
