import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faHome,
  faBook,
  faUser,
} from "@fortawesome/free-solid-svg-icons"; // Import icons

const Navbar = () => {
  const [user, setUser] = useState(null); // State to hold user information

  useEffect(() => {
    // Fetch user from localStorage
    const userInfo = JSON.parse(localStorage.getItem("user")); // Retrieve user info from localStorage
    if (userInfo) {
      setUser(userInfo); // Set user info in state
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    localStorage.removeItem("user"); // Clear user info
    setUser(null); // Reset the user state
    // Optionally, you can navigate to the home or login page after logout
  };

  return (
    <nav className="shadow-sm p-4 nav-color">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          className="text-dark text-2xl font-bold"
        >
          {" "}
          E-Library
        </Link>

        <div className="d-flex align-items-center">
          {/* Home link with Home icon */}
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="text-dark px-4 d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
          </Link>

          {/* Add Book Link */}
          <Link
            to="/add-book"
            style={{ textDecoration: "none" }}
            className="text-dark px-4 d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faBook} className="mr-2" /> Add Book
          </Link>
        </div>

        <div className="d-flex align-items-center">
          {/* Conditionally render based on if user is logged in */}
          {user ? (
            <>
              {/* Display user info */}
              <span className="text-dark font-bold px-4 d-flex align-items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />{" "}
                {user.username || user.email}
              </span>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded ml-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Register Link */}
              <Link
                to="/register"
                style={{ textDecoration: "none" }}
                className="text-dark font-bold px-4"
              >
                Register
              </Link>

              {/* Login link with Login icon */}
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                className="bg-white text-dark font-bold px-4 py-2 rounded ml-4 d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
