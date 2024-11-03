import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPost, fetchPosts, fetchPostsUsername, updatePost, deletePost } from '../api';
import { useAuth } from '../AuthContext';
import PostForm from './PostForm';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const { handleLogout } = useAuth();

  const loadPosts = async (username) => {
    let data = [];
    if (username) {
      data = await fetchPostsUsername(username);
    } else {
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
    setUsername(e.target.value);
  };

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
  };

  const handleEditSubmit = async (postId) => {
    const updatedPost = await updatePost(postId, editContent);
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? updatedPost : post))
    );
    setEditingPostId(null);
    setEditContent('');
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className="post-list-container">
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
      
      <PostForm onSubmit={handlePostSubmit} />

      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            {editingPostId === post.id ? (
              <>
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleEditSubmit(post.id)}>Save</button>
                <button onClick={() => setEditingPostId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <Link to={`/posts/${post.id}`} className="post-link">
                  <h2>{post.content}</h2>
                  <p>By: {post.user.username}</p>
                  <p>Comments: {post.comments.length}</p>
                  <p>Last Updated: {new Date(post.updated_at).toLocaleString()}</p>
                </Link>
                <button onClick={() => handleEditClick(post)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
