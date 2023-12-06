import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments';

const ArticleDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded shadow-md">
        <img
          src={blog.photo}
          alt={blog.title}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-600">{blog.description}</p>
        <p className="text-gray-500 mt-2">Author: {blog.username}</p>
        <p className="text-gray-500">Categories: {blog.categories.join(', ')}</p>
        <p className="text-gray-500">Tags: {blog.tags.join(', ')}</p>
        <p className="text-gray-500">Published on: {blog.date}</p>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Content</h2>
          <p className="text-gray-600">{blog.content}</p>
        </div>
      </div>
      <Comments blogId={id} /> 
    </div>
  );
};

export default ArticleDetail;

