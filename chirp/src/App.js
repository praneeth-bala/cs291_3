import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/Login';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import { useAuth } from './AuthContext';

const App = () => {
  const { user, handleLogout } = useAuth();

  function LogoutRedirect() {
    const [isLoggingOut, setIsLoggingOut] = useState(true);
  
    useEffect(() => {
      async function performLogout() {
        await handleLogout();
        setIsLoggingOut(false);
      }
      
      performLogout();
    }, []);
  
    if (isLoggingOut) {
      return <div>Logging out...</div>;
    }
  
    return <Navigate to="/login" />;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/posts/:id" element={user ? <PostDetail /> : <Navigate to="/login" />} />
          <Route path="/" element={user ? <PostList/> : <Navigate to="/login" />} />
          <Route path="*" element={<LogoutRedirect />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
