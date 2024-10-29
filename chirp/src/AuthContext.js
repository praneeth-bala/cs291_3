import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, logout } from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to get the user from local storage (if applicable) or check the login status
    const storedUser = localStorage.getItem('user'); // Optional: if you want to persist user info
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username) => {
    try {
      await login(username)
      const userData = { username }; // Modify to match your user structure if needed
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Optionally store user data
    } catch (error) {
      console.error('Login failed', error);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try{
        await logout()
        setUser(null);
        localStorage.removeItem('user'); // Clear user data
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
