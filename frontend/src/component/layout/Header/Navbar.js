import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {FaAddressCard, FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import logo from "../../../images/INFISPEC LOGO FULL.png";
import "./Navbar.css";

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.toggle('hidden', prevScrollPos < currentScrollPos);
      }
      prevScrollPos = currentScrollPos;
    };

    let prevScrollPos = window.pageYOffset;
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" style={{ height: '90px', width: '120px' }} />
        </Link>
        <div className={`navbar-links ${isNavbarOpen ? "active" : ""}`}>
          <Link to="/" onClick={toggleNavbar}>Home</Link>
          <Link to="/products" onClick={toggleNavbar}>Products</Link>
          <Link to="/contact" onClick={toggleNavbar}>Contact</Link>
          <Link to="/about" onClick={toggleNavbar}>About</Link>
        </div>
        <div className={`navbar-icons ${isNavbarOpen ? "active" : ""}`}>
          <Link to="/search" className="icon">
            <FaSearch />
          </Link>
          <Link to="/login" className="icon">
            <FaUser />
          </Link>
          <Link to="/wishlist" className="icon">
           <FaHeart />
           </Link>
          <Link to="/cart" className="icon">
            <FaShoppingCart />
          </Link>
          <Link to="/address" className="icon"> {/* Add this line for address page */}
            <FaAddressCard />
          </Link>
        </div>
        <div className="navbar-toggle" onClick={toggleNavbar}>
          {isNavbarOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
