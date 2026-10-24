import React from 'react';
import PropTypes from 'prop-types';
import './BookList.css';

export function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty-state">⚠️ Tidak ada buku yang ditemukan.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-header">
            <h4>{book.title}</h4>
            <span className={`badge badge-${book.status}`}>{book.status}</span>
          </div>
          <p className="book-author">✍️ {book.author}</p>
          <div className="book-actions">
            <button className="btn-edit" onClick={() => onEdit(book)}>Edit</button>
            <button className="btn-delete" onClick={() => onDelete(book.id)}>Hapus</button>
          </div>
        </div>
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};