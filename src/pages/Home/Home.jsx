import React from 'react';
import { useBooks } from '../../context/BookContext';
import { BookForm } from '../../components/BookForm/BookForm';
import { BookFilter } from '../../components/BookFilter/BookFilter';
import { BookList } from '../../components/BookList/BookList';
import './Home.css';

export function Home() {
  const {
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
  } = useBooks();

  const handleFormSubmit = (bookData) => {
    if (editingBook) {
      updateBook(bookData);
    } else {
      addBook(bookData);
    }
  };

  return (
    <div className="home-container">
      <h2> 📑 MyBookCollection</h2>
      <BookForm
        onSubmit={handleFormSubmit}
        editingBook={editingBook}
        onCancelEdit={() => setEditingBook(null)}
      />
      <BookFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <BookList
        books={filteredBooks}
        onEdit={(book) => setEditingBook(book)}
        onDelete={deleteBook}
      />
    </div>
  );
}