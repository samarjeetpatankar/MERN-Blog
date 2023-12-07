import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API using the user's token for authorization
        const response = await fetch("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${user.token}`, // Assuming you have a token in your user object
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">My Profile</h1>
      <Link
      to="/createblogs"
      className="bg-blue-500 hover:bg-blue-600 text-white w-96 font-semibold py-2 px-3 rounded-full flex items-center space-x-2 transition duration-300 focus:outline-none focus:ring focus:border-blue-300"
    >
      <FaPen className="text-lg" />
      <span>Create Blogs</span>
    </Link>
      {profileData ? (
        <div>
          <p className="text-xl font-bold mb-4">
            Username: {profileData.user.username}
          </p>

          <h2 className="text-2xl font-semibold mb-2">Blogs:</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileData.blogs.map((blog) => (
              <li key={blog._id} className="border p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-2">{blog.description}</p>
                <img
                  src={blog.photo}
                  alt={blog.title}
                  className="w-full h-40 object-cover mb-2"
                />
                <p className="text-gray-800">Username: {blog.username}</p>
                <p className="text-gray-800">
                  Categories: {blog.categories.join(", ")}
                </p>
                <p className="text-gray-800">Content: {blog.content}</p>
                <p className="text-gray-800">Tags: {blog.tags.join(", ")}</p>
                <p className="text-gray-800">
                  Date: {new Date(blog.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-xl">Loading profile data...</p>
      )}
    </div>
  );
};

export default MyProfile;
