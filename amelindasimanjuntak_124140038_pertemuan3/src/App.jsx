import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import { Home } from './pages/Home';
import { Stats } from './pages/Stats';

export default function App() {
  return (
    <BookProvider>
      <Router>
        <nav className="navbar">
          <div className="nav-brand">
            📚 BookShelf
          </div>
          <div className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            >
              Beranda
            </NavLink>
            <NavLink
              to="/stats"
              className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            >
              Statistik Buku
            </NavLink>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}
