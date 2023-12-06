import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-200 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Blog App Title */}
        <h1 className="text-4xl text-black font-bold mb-4 md:mb-0">Blog App</h1>

        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row md:space-x-4 text-black">
          {/* Add additional navigation links as needed */}
          <li>
            <Link to="/" className="text-lg hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-lg hover:text-blue-300">
              About
            </Link>
          </li>

          {/* Register/Signup Link */}
          <li>
            <Link
              to="/signup"
              className="text-lg hover:text-blue-300 border border-black px-3 py-1 rounded"
            >
              Register/Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
