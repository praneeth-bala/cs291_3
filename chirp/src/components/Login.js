import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { handleLogin } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username);
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="project-name">Chirp Chirp</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
