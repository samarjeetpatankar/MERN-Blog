import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import axios from "axios";

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/comment/${blogId}/all`
        );
        setComments(response.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error.response.data);
        setError("Error fetching comments. Please try again later.");
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

  const handleUpdateComment = async (commentId, newContent) => {
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      await axios.put(
        `http://localhost:5000/comment/${commentId}`,
        { content: newContent },
        { headers }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: newContent }
            : comment
        )
      );

      setEditingCommentId(null); // Reset the editing comment ID
    } catch (error) {
      console.error("Error updating comment:", error.response.data);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:5000/comment/${commentId}`, {
        headers,
      });

      const response = await axios.get(
        `http://localhost:5000/comment/${blogId}/all`,
        {
          headers,
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error deleting comment:", error.response.data);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold mb-6">Comments</h2>
      {error && <p className="text-red-500">{error}</p>}

      {user ? (
        <CommentForm onSubmit={handleCommentSubmit} />
      ) : (
        <p className="text-gray-800">Please log in to comment.</p>
      )}

      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white p-6 mb-6 rounded-md shadow-lg"
          >
            {editingCommentId === comment._id ? (
              <div className="mb-4">
                <textarea
                  value={comment.content}
                  onChange={(e) =>
                    setComments((prevComments) =>
                      prevComments.map((prevComment) =>
                        prevComment._id === comment._id
                          ? { ...prevComment, content: e.target.value }
                          : prevComment
                      )
                    )
                  }
                  className="w-full p-4 border rounded-md"
                  required
                ></textarea>
              </div>
            ) : (
              <p className="text-gray-800 text-lg mb-2">{comment.content}</p>
            )}
            <div className="flex items-center justify-between text-gray-600">
              <p>{comment.username}</p>
              <p>{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
            {user && user.username === comment.username && (
              <div className="mt-4">
                {editingCommentId === comment._id ? (
                  <button
                    onClick={() =>
                      handleUpdateComment(comment._id, comment.content)
                    }
                    className="mr-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingCommentId(comment._id)}
                    className="mr-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
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
