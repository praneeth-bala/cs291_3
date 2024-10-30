import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, createComment } from '../api';
import CommentForm from './CommentForm';
import './PostDetail.css';

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
    <div className="post-detail-container">
      {/* Main post content */}
      <div className="post-detail">
        <h2 className="post-content">{post.content}</h2>
        <div className="post-meta">
          <span className="post-author">By: {post.user.username}</span>
          <span className="post-time">
            {new Date(post.updated_at).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments</h3>
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p className="comment-content">{comment.content}</p>
              <div className="comment-meta">
                <span className="comment-author">{comment.user.username}</span>
                <span className="comment-time">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Comment form */}
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
};

export default PostDetail;
