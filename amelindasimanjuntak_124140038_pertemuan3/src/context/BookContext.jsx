import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

// Data awal agar otomatis tampil 3 kartu buku
const INITIAL_BOOKS = [
  { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: '2', title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', status: 'baca' },
  { id: '3', title: 'Filosofi Teras', author: 'Henry Manampiring', status: 'beli' },
];

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('amelinda_books_data', INITIAL_BOOKS);
  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  const addBook = (book) => {
    const newBook = { ...book, id: Date.now().toString() };
    setBooks([...books, newBook]);
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const filteredBooks = books.filter((book) => {
    const matchStatus = filter === 'semua' || book.status === filter;
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <BookContext.Provider
      value={{
        books,
        filteredBooks,
        filter,
        setFilter,
        search,
        setSearch,
        addBook,
        updateBook,
        deleteBook,
        editingBook,
        setEditingBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBooks = () => useContext(BookContext);