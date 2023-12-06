import React, { useState } from "react";
import axios from "axios";

const CreateBlogs = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    photo: null,
    categories: "",
    content: "",
    tags: "",
  });

  const handleCreateBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("description", blogData.description);
      formData.append("categories", blogData.categories);
      formData.append("content", blogData.content);
      formData.append("tags", blogData.tags);
      if (blogData.photo) {
        formData.append("photo", blogData.photo);
      }

      const response = await axios.post(
        "http://localhost:5000/blog/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success, e.g., show a success message or redirect to the created blog
      console.log("Blog created successfully:", response.data);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error creating blog:", error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlogData({
      ...blogData,
      photo: file,
    });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",");
    setBlogData({
      ...blogData,
      tags,
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">Create a Blog</h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 font-semibold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={blogData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          placeholder="Enter the title of your blog"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-semibold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={blogData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Enter a short description"
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="photo"
          className="block text-gray-700 font-semibold mb-2"
        >
          Photo
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md"
        />
        {blogData.photo && (
          <img
            src={URL.createObjectURL(blogData.photo)}
            alt="Blog"
            className="mt-2 rounded-md shadow-lg"
          />
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="categories"
          className="block text-gray-700 font-semibold mb-2"
        >
          Categories
        </label>
        <input
          type="text"
          id="categories"
          name="categories"
          value={blogData.categories}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          placeholder="Enter blog categories (comma-separated)"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-gray-700 font-semibold mb-2"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={blogData.content}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          rows="8"
          placeholder="Write your blog content here"
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="tags"
          className="block text-gray-700 font-semibold mb-2"
        >
          Tags
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={blogData.tags}
          onChange={handleTagsChange}
          className="w-full p-2 border rounded-md"
          placeholder="Enter blog tags (comma-separated)"
        />
      </div>

      <button
        onClick={handleCreateBlog}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlogs;
