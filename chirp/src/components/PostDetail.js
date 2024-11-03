import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, createComment } from '../api';
import CommentForm from './CommentForm';
import './PostDetail.css';
import { useAuth } from '../AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [fof, setFof] = useState(false);
  const [comments, setComments] = useState([]);
  const { handleLogout } = useAuth();

  useEffect(() => {
    const loadPost = async () => {
      let data;
      try {
        data = await fetchPost(id);
      }
      catch {
        setFof(true);
        return false;
      }
      setFof(false);
      setPost(data);
      setComments(data.comments);
      setComments((prev)=>[...prev].reverse());
      return true;
    };
    loadPost();
  }, [id]);

  const handleCommentSubmit = async (content) => {
    const newComment = await createComment(id, content);
    setComments((prev) => [newComment, ...prev]);
  };

  if (fof) return <div>Post not found</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    <div className="post-detail-container">
        <div className="post-detail">
            {/* Main post content */}
            <h2 className="post-content">{post.content}</h2>
            <div className="post-meta">
                <span className="post-author">By: {post.user.username}</span>
                <span className="post-time">
                    {new Date(post.updated_at).toLocaleString()}
                </span>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
                <h3>Comments</h3>
                {/* Comment form */}
                <CommentForm onSubmit={handleCommentSubmit} />
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
        </div>
    </div>
    </div>
);};

export default PostDetail;
