import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand"> 📖 BookShelf</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Beranda
          </NavLink>
        </li>
        <li>
          <NavLink to="/stats" className={({ isActive }) => (isActive ? 'active' : '')}>
            Statistik Buku
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}