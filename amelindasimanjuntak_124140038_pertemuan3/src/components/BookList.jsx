import React from 'react';
import PropTypes from 'prop-types';

export function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p style={{ textCenter: 'center', color: '#888' }}>Tidak ada buku yang ditemukan.</p>;
  }

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'milik': return { label: 'MILIK', class: 'badge-milik' };
      case 'baca': return { label: 'BACA', class: 'badge-baca' };
      case 'beli': return { label: 'BELI', class: 'badge-beli' };
      default: return { label: status, class: '' };
    }
  };

  return (
    <div className="book-grid">
      {books.map((book) => {
        const badge = getBadgeStyle(book.status);
        return (
          <div key={book.id} className="book-card">
            <div>
              <div className="book-header">
                <h4 className="book-title">{book.title}</h4>
                <span className={`badge ${badge.class}`}>{badge.label}</span>
              </div>
              <div className="book-author"> {book.author}</div>
            </div>
            <div className="book-actions">
              <button className="btn-action btn-edit" onClick={() => onEdit(book)}>Edit</button>
              <button className="btn-action btn-delete" onClick={() => onDelete(book.id)}>Hapus</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};