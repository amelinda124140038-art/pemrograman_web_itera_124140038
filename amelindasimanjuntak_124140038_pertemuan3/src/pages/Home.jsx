import React from 'react';
import { useBooks } from '../context/BookContext';
import { BookForm } from '../components/BookForm.jsx';
import { BookFilter } from '../components/BookFilter.jsx';
import { BookList } from '../components/BookList.jsx';

export function Home() {
  const {
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
  } = useBooks();

  const handleFormSubmit = (bookData) => {
    if (editingBook) {
      updateBook(bookData);
    } else {
      addBook(bookData);
    }
  };

  return (
    <div>
      <h2 className="page-title">📑 MyBookCollection</h2>
      <BookForm
        onSubmit={handleFormSubmit}
        editingBook={editingBook}
        onCancel={() => setEditingBook(null)}
      />
      <BookFilter
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />
      <BookList
        books={filteredBooks}
        onEdit={setEditingBook}
        onDelete={deleteBook}
      />
    </div>
  );
}