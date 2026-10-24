import React from 'react';
import { useBooks } from '../context/BookContext';
import { useBookStats } from '../hooks/useBookStats';

export function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const getPercent = (count) => {
    if (stats.total === 0) return '0%';
    return Math.round((count / stats.total) * 100) + '%';
  };

  return (
    <div>
      <h2 className="page-title">📈 Statistik Koleksi Buku</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Buku</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Dimiliki</div>
          <div className="stat-value">{stats.owned}</div>
          <div className="stat-percent">{getPercent(stats.owned)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Sedang Dibaca</div>
          <div className="stat-value">{stats.reading}</div>
          <div className="stat-percent">{getPercent(stats.reading)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Ingin Dibeli</div>
          <div className="stat-value">{stats.wishlist}</div>
          <div className="stat-percent">{getPercent(stats.wishlist)}</div>
        </div>
      </div>
    </div>
  );
}