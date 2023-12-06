import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comment/${blogId}/all`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error.response.data);
      }
    };

    fetchComments();
  }, [blogId]);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold mb-6">Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id} className="bg-white p-6 mb-6 rounded-md shadow-lg">
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

export default Comments;
