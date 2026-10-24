import React from 'react';
import { useBooks } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';
import './Stats.css';

export function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <div className="stats-container">
      <h2>📊 Statistik Koleksi Buku</h2>
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Buku</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Dimiliki</h3>
          <p className="stat-number">{stats.milik}</p>
          <p className="stat-percent">{stats.milikPercent}%</p>
        </div>
        <div className="stat-card">
          <h3>Sedang Dibaca</h3>
          <p className="stat-number">{stats.baca}</p>
          <p className="stat-percent">{stats.bacaPercent}%</p>
        </div>
        <div className="stat-card">
          <h3>Ingin Dibeli</h3>
          <p className="stat-number">{stats.beli}</p>
          <p className="stat-percent">{stats.beliPercent}%</p>
        </div>
      </div>
    </div>
  );
}