// @vitest-environment happy-dom
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { BookProvider } from '../context/BookContext';
import { Home } from '../pages/Home/Home';
import { Stats } from '../pages/Stats/Stats';
import { MemoryRouter } from 'react-router-dom';

// Daftarkan matchers ke expect secara manual agar tidak error
expect.extend(matchers);

describe('Aplikasi Manajemen Buku - Unit Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  const renderHomeWithContext = () => {
    return render(
      <BookProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </BookProvider>
    );
  };

  it('1. Menampilkan list awal buku', () => {
    renderHomeWithContext();
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
  });

  it('2. Menampilkan error jika form disubmit kosong', () => {
    renderHomeWithContext();
    const submitBtn = screen.getByRole('button', { name: /Tambah Buku/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Judul buku wajib diisi!')).toBeInTheDocument();
  });

  it('3. Menambahkan buku baru', () => {
    renderHomeWithContext();
    
    const titleInput = screen.getByLabelText(/Judul Buku/i);
    const authorInput = screen.getByLabelText(/Penulis/i);
    const submitBtn = screen.getByRole('button', { name: /Tambah Buku/i });

    fireEvent.change(titleInput, { target: { value: 'Atomic Habits' } });
    fireEvent.change(authorInput, { target: { value: 'James Clear' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Atomic Habits')).toBeInTheDocument();
  });

  it('4. Memfilter buku berdasarkan pencarian', () => {
    renderHomeWithContext();
    const searchInput = screen.getByPlaceholderText(/Cari judul atau penulis/i);

    fireEvent.change(searchInput, { target: { value: 'Laskar' } });

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.queryByText('Bumi Manusia')).not.toBeInTheDocument();
  });

  it('5. Menghitung statistik total buku', () => {
    render(
      <BookProvider>
        <MemoryRouter>
          <Stats />
        </MemoryRouter>
      </BookProvider>
    );

    expect(screen.getByText('Total Buku')).toBeInTheDocument();
  });
});