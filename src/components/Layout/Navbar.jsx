import React, { useRef } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import "./navbar.css";


const Navbar = () => {
  const navRef = useRef();
  const navHandler = () => {
    navRef.current.classList.toggle("active");
  };


  const user = JSON.parse(localStorage.getItem("auth"));
  console.log(user);

  const userName = user && user.user && user.user.firstname;
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    toast.success("Logged out")
    navigate('/');
  }

  const goToDashboard = () =>{
    navigate('/dashboard')
  }

  
  return (
    <div>
      {/* logo part */}
      <div className="header">
        <div className="logo">
          <h2>
            <span>R</span>ecipsy
          </h2>
        </div>
        {/* menu  part */}
        <div className="navbar" ref={navRef}>
          {localStorage.getItem("auth") ? (
          <div className="nav1">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/upload">Upload</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
            </ul>
            <ul className="user">
            <li>
              <NavDropdown title={userName}>
                <NavDropdown.Item onClick={goToDashboard}>DashBoard</NavDropdown.Item>
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
              </li>
            </ul>
        </div>
          ) : (
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}

        </div>

        <div className="icons">

          <div className="fas fa-bars" id="menu-btn" onClick={navHandler}></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
