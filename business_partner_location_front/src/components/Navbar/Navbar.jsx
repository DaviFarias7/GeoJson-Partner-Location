import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from './logo.png';

function Navbar() {
  return (
    <nav className="main-navbar">
      <img src={logo} alt="Logo" className="logo" />
    </nav>
  );
}

export default Navbar;
