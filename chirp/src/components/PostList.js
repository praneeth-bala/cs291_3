import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPost, fetchPosts, fetchPostsUsername } from '../api';
import { useAuth } from '../AuthContext';
import PostForm from './PostForm';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(''); // State for username filter
  const { handleLogout } = useAuth();

  const loadPosts = async (username) => {
    let data=[];
    if(username){
      data = await fetchPostsUsername(username);
    }
    else{
      data = await fetchPosts();
    }
    setPosts(data);
  };

  useEffect(() => {
    loadPosts(username);
  }, [username]);

  const handlePostSubmit = async (content) => {
    const newPost = await createPost(content);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value); // Update username filter
  };

  return (
    <div className="post-list-container">
      {/* Header with title, filter, and logout button */}
      <header className="post-list-header">
        <h1>Posts</h1>
        <input
          type="text"
          placeholder="Filter by username"
          value={username}
          onChange={handleUsernameChange}
          className="username-filter-input"
        />
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      
      {/* Post creation form */}
      <PostForm onSubmit={handlePostSubmit} />
      
      {/* List of posts */}
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/posts/${post.id}`} className="post-link">
              <h2>{post.content}</h2>
              <p>By: {post.user.username}</p>
              <p>Comments: {post.comments.length}</p>
              <p>Last Updated: {new Date(post.updated_at).toLocaleString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
