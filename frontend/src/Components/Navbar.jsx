import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
  const { isLoggedIn, userName, logout } = useAuth();
  console.log("isLoggedIn:", isLoggedIn);
  console.log("userName:", userName);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("userData");
    logout();
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
            <>
              <li>
                <Link
                  to="/createblogs"
                  className="text-2xl py-1 px-2 border border-black rounded"
                >
                  Create Blog
                </Link>
              </li>
              <li className="flex items-center ">
                <span className="text-2xl mr-2">{`Welcome, ${userName}`}</span>
                <button
                  onClick={handleLogout}
                  className="text-2xl border border-black rounded py-1 px-2"
                >
                  Logout
                </button>
              </li>
            </>
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
