import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/comment/${blogId}/all`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error.response.data);
      }
    };

    fetchComments();
  }, [blogId]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parsedUserData = userData ? JSON.parse(userData) : null;
    setUser(parsedUserData);
  }, []);

  const handleCommentSubmit = async (commentContent) => {
    try {
      if (user) {
        const token = user.token;
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        await axios.post(
          `http://localhost:5000/comment/${blogId}/create`,
          { content: commentContent },
          { headers }
        );
        const response = await axios.get(
          `http://localhost:5000/comment/${blogId}/all`,
          {
            headers,
          }
        );
        setComments(response.data);
      } else {
        console.log("Please log in to comment.");
      }
    } catch (error) {
      console.error("Error creating comment:", error.response.data);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold mb-6">Comments</h2>

      {user ? (
        <CommentForm onSubmit={handleCommentSubmit} />
      ) : (
        <p className="text-gray-800">Please log in to comment.</p>
      )}

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-white p-6 mb-6 rounded-md shadow-lg"
        >
          <p className="text-gray-800 text-lg mb-2">{comment.content}</p>
          <div className="flex items-center justify-between text-gray-600">
            <p>{comment.username}</p>
            <p>{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const CommentForm = ({ onSubmit }) => {
  const [commentContent, setCommentContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(commentContent);
    setCommentContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-4 border rounded-md"
        required
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Post Comment
      </button>
    </form>
  );
};

export default Comments;

