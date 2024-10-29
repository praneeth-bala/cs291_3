import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPost, fetchPosts } from '../api';
import { useAuth } from '../AuthContext';
import PostForm from './PostForm';

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
    <div>
      <h1>Posts</h1>
      <button onClick={handleLogout}>Logout</button>
      <PostForm onSubmit={handlePostSubmit} />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.content}</h2>
              <p>By: {post.user.username}</p>
              <p>Comments: {post.comments.length}</p>
              <p>Last Updated: {post.updated_at}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
