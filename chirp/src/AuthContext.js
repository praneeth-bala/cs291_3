import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, logout } from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username) => {
    try {
      const userData = await login(username); // Await the login request here
      setUser(userData.user);
      localStorage.setItem('user', JSON.stringify(userData.user)); // Optionally store user data
      return userData; // Return userData to signal successful login
    } catch (error) {
      console.error('Login failed', error);
      setUser(null);
      throw error; // Re-throw error to be handled in LoginPage
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
