import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/Login';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import { useAuth } from './AuthContext';

const App = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/posts/:id" element={user ? <PostDetail /> : <Navigate to="/login" />} />
          <Route path="/" element={user ? <PostList/> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
