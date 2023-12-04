import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../../../images/logo.png";
import "./Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    let prevScrollPos = window.pageYOffset;

    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        navbar.classList.remove('hidden');
      } else {
        navbar.classList.add('hidden');
      }

      prevScrollPos = currentScrollPos;
    });

    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="navbar-icons">
          <Link to="/search" className="icon 3d-effect">
            <FaSearch />
          </Link>
          <Link to="/profile" className="icon 3d-effect">
            <FaUser />
          </Link>
          <Link to="/cart" className="icon 3d-effect">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
