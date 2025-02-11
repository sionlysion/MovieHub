import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>MovieHub</h1>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/movies">Films</Link>
        </li>
        <li>
          <Link to="/favorites">Favoris</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;