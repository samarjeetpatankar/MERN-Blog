import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, userName }) {
  return (
    <nav className="bg-blue-200 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-4xl text-black font-bold mb-4 md:mb-0">Blog App</h1>

        <ul className="flex flex-col md:flex-row md:space-x-4 text-black">
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
          {isLoggedIn ? (
            <li>
              <span className="text-lg">{`Welcome, ${userName}`}</span>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className="text-lg hover:text-blue-300 border border-black px-3 py-1 rounded"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-lg hover:text-blue-300 border border-black px-3 py-1 rounded"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
