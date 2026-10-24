import React from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';

export function BookFilter({ searchQuery, setSearchQuery, filterStatus, setFilterStatus }) {
  return (
    <div className="book-filter-container">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Cari judul atau penulis..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="filter-buttons">
        {['all', 'milik', 'baca', 'beli'].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
            onClick={() => setFilterStatus(status)}
          >
            {status === 'all' ? 'Semua' : status === 'milik' ? 'Dimiliki' : status === 'baca' ? 'Sedang Dibaca' : 'Ingin Dibeli'}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
};