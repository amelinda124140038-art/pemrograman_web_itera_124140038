import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function BookForm({ onSubmit, editingBook, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('milik');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setStatus(editingBook.status);
    } else {
      setTitle('');
      setAuthor('');
      setStatus('milik');
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!title.trim()) errs.title = 'Judul buku wajib diisi!';
    if (!author.trim()) errs.author = 'Nama penulis wajib diisi!';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    onSubmit({
      id: editingBook ? editingBook.id : undefined,
      title,
      author,
      status,
    });

    if (!editingBook) {
      setTitle('');
      setAuthor('');
      setStatus('milik');
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginTop: 0, color: '#3b5241', fontSize: '1.15rem', fontFamily: 'var(--font-serif)', fontWeight: '700' }}>
        {editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Judul Buku <span style={{ color: '#ef4444' }}>*</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan judul buku..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <small style={{ color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.title}</small>}
        </div>
        <div className="form-group">
          <label>Penulis <span style={{ color: '#ef4444' }}>*</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan nama penulis..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.author && <small style={{ color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.author}</small>}
        </div>
        <div className="form-group">
          <label>Status Buku</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="milik">Dimiliki</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {editingBook && (
          <button
            type="button"
            onClick={onCancel}
            style={{ marginLeft: '12px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', fontWeight: '700', fontFamily: 'var(--font-sans)' }}
          >
            Batal
          </button>
        )}
      </form>
    </div>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editingBook: PropTypes.object,
  onCancel: PropTypes.func,
};