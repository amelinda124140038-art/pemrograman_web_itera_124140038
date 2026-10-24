import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

export function BookForm({ onSubmit, editingBook, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('milik');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setStatus(editingBook.status);
      setErrors({});
    } else {
      resetForm();
    }
  }, [editingBook]);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setStatus('milik');
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Judul buku wajib diisi!';
    if (!author.trim()) newErrors.author = 'Nama penulis wajib diisi!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      id: editingBook ? editingBook.id : undefined,
      title: title.trim(),
      author: author.trim(),
      status,
    });

    resetForm();
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h3>{editingBook ? '✏️ Edit Buku' : ' Tambah Buku Baru'}</h3>
      <div className="form-group">
        <label htmlFor="title">Judul Buku <span className="required">*</span></label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'input-error' : ''}
          placeholder="Masukkan judul buku..."
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis <span className="required">*</span></label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={errors.author ? 'input-error' : ''}
          placeholder="Masukkan nama penulis..."
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status Buku</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {editingBook && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editingBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
  }),
  onCancelEdit: PropTypes.func,
};