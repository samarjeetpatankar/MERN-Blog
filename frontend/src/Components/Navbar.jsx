import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
  const { isLoggedIn, userName, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    logout();
  };

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav className="bg-blue-200 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/">
          <h1 className="text-4xl text-black font-bold mb-4 md:mb-0">
            Blog App
          </h1>
        </Link>

        <ul className="flex flex-col md:flex-row md:space-x-4 text-black">
          <button>
            <Link to="/" className="text-2xl py-1 px-2">
              Home
            </Link>
          </button>
          <button>
            <Link to="/about" className="text-2xl py-1 px-2">
              About
            </Link>
          </button>
          {isLoggedIn ? (
            <li className="relative group">
              <button
                onClick={handleToggleDropdown}
                className="text-2xl py-1 px-2 border border-black rounded focus:outline-none focus:border-gray-500 group-hover:bg-gray-100"
              >
                Welcome, {userName}
              </button>
              {showDropdown && (
                <ul className="absolute top-full left-0 bg-white border border-gray-200 py-2 rounded shadow-md">
                  <li>
                    <Link
                      to="/myprofile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className="text-2xl border border-black py-1 px-2 rounded"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-2xl border border-black py-1 px-2 rounded"
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

