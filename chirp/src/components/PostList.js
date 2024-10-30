import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPost, fetchPosts } from '../api';
import { useAuth } from '../AuthContext';
import PostForm from './PostForm';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { handleLogout } = useAuth();

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  const handlePostSubmit = async (content) => {
    const newPost = await createPost(content);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="post-list-container">
      {/* Header with title and logout button */}
      <header className="post-list-header">
        <h1>Posts</h1>
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
