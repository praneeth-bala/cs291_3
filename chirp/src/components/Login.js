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
  );
};

export default LoginPage;
