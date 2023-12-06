import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Articles = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blog/all");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const formatUsername = (username) => {
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">All Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 rounded shadow-md">
            <Link to={`/${blog._id}`}>
              <img
                src={blog.photo}
                alt={blog.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            </Link>
            <p className="text-gray-600">{blog.description}</p>
            <p className="text-gray-900 mt-1">
              Author: {formatUsername(blog.username)}
            </p>
            <p className="text-gray-500">
              Published on: {formatDate(blog.date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
