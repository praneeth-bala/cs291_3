import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, createComment } from '../api';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      const data = await fetchPost(id);
      setPost(data);
      setComments(data.comments);
    };
    loadPost();
  }, [id]);

  const handleCommentSubmit = async (content) => {
    const newComment = await createComment(id, content);
    setComments((prev) => [...prev, newComment]);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.content}</h1>
      <p>By: {post.user.username}</p>
      <h2>Comments:</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content} by {comment.user.username}</li>
        ))}
      </ul>
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
};

export default PostDetail;
