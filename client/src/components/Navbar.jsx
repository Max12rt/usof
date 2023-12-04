import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../images/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const logoutNavbar = () => {
    logout();
  };

  return (
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="links">
            <Link className="link" to="/">
              <h6>Home</h6>
            </Link>
            <Link className="link" to="/CreatePost">
              <h6>Write</h6>
            </Link>
            <Link className="link" to="/categories">
              <h6>Categories</h6>
            </Link>
            {currentUser && (
                <Link className="link" to={`/categories/${currentUser.categoryId}`}>
                  <h6>Your Category</h6>
                </Link>
            )}
            <Link className="link" to="/posts">
              <h6>All Posts</h6>
            </Link>
            {currentUser && (
                <Link className="link" to={`/posts/${currentUser.postId}`}>
                  <h6>Your Post</h6>
                </Link>
            )}
            {currentUser ? (
                <>
                  <span>{currentUser.username}</span>
                  <span onClick={logoutNavbar}>Logout</span>
                </>
            ) : (
                <>
                  <Link className="link" to="/login">
                    <h6>Login</h6>
                  </Link>
                  <Link className="link" to="/register">
                    <h6>Register</h6>
                  </Link>
                </>
            )}
          </div>
        </div>
      </div>
  );
};

export default Navbar;
