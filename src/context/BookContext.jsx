import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

const initialBooks = [
  { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: '2', title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', status: 'baca' },
  { id: '3', title: 'Filosofi Teras', author: 'Henry Manampiring', status: 'beli' }
];

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('amelinda_book_list', initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingBook, setEditingBook] = useState(null);

  const addBook = (newBook) => {
    const bookWithId = { ...newBook, id: Date.now().toString() };
    setBooks((prev) => [bookWithId, ...prev]);
  };

  const updateBook = (updatedBook) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <BookContext.Provider
      value={{
        books,
        filteredBooks,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        editingBook,
        setEditingBook,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}