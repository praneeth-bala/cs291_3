import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Set up axios defaults to include credentials
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true; // Send cookies with requests

export const login = async (username) => {
  const response = await axios.post('/login', { username });
  return response.data; // Assuming the response contains user data
};

export const logout = async () => {
  await axios.post('/logout');
};

export const fetchPosts = async () => {
  const response = await axios.post('/posts/list');
  return response.data; // Return the fetched posts
};

export const fetchPost = async (id) => {
  const response = await axios.post(`/posts/${id}`);
  return response.data; // Return the fetched post
};

export const createPost = async (content) => {
  const response = await axios.post('/posts/create', { content });
  return response.data; // Return the created post
};

export const updatePost = async (id, content) => {
  const response = await axios.post(`/posts/${id}/update`, { content });
  return response.data; // Return the updated post
};

export const deletePost = async (id) => {
  await axios.post(`/posts/${id}/destroy`); // No return value expected
};

export const createComment = async (postId, content) => {
  const response = await axios.post(`/posts/${postId}/comments/create`, { content });
  return response.data; // Return the created comment
};
