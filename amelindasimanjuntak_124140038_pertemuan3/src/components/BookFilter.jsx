import React from 'react';
import PropTypes from 'prop-types';

export function BookFilter({ filter, onFilterChange, search, onSearchChange }) {
  return (
    <div className="card" style={{ padding: '16px 20px' }}>
      <input
        type="text"
        className="form-control"
        placeholder=" 🔍Cari judul atau penulis..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="filter-pills">
        <button
          className={`pill-btn ${filter === 'semua' ? 'active' : ''}`}
          onClick={() => onFilterChange('semua')}
        >
          Semua
        </button>
        <button
          className={`pill-btn ${filter === 'milik' ? 'active' : ''}`}
          onClick={() => onFilterChange('milik')}
        >
          Dimiliki
        </button>
        <button
          className={`pill-btn ${filter === 'baca' ? 'active' : ''}`}
          onClick={() => onFilterChange('baca')}
        >
          Sedang Dibaca
        </button>
        <button
          className={`pill-btn ${filter === 'beli' ? 'active' : ''}`}
          onClick={() => onFilterChange('beli')}
        >
          Ingin Dibeli
        </button>
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};