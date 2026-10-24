import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BookForm } from '../components/BookForm';

describe('Pengujian Komponen BookForm', () => {
  it('1. Render form input dengan benar', () => {
    render(<BookForm onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText('Masukkan judul...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan penulis...')).toBeInTheDocument();
  });

  it('2. Menampilkan pesan error validasi jika input kosong', () => {
    render(<BookForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByText('Tambah Buku'));
    expect(screen.getByText('Judul buku wajib diisi!')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi!')).toBeInTheDocument();
  });

  it('3. Memanggil callback onSubmit saat data valid disubmit', () => {
    const handleSub = vi.fn();
    render(<BookForm onSubmit={handleSub} />);

    fireEvent.change(screen.getByPlaceholderText('Masukkan judul...'), { target: { value: 'Laskar Pelangi' } });
    fireEvent.change(screen.getByPlaceholderText('Masukkan penulis...'), { target: { value: 'Andrea Hirata' } });
    fireEvent.click(screen.getByText('Tambah Buku'));

    expect(handleSub).toHaveBeenCalledWith({
      id: undefined,
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'milik',
    });
  });

  it('4. Memuat data awal saat mode edit aktif', () => {
    const editData = { id: '1', title: 'Bumi', author: 'Tere Liye', status: 'baca' };
    render(<BookForm onSubmit={vi.fn()} editingBook={editData} />);

    expect(screen.getByDisplayValue('Bumi')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tere Liye')).toBeInTheDocument();
    expect(screen.getByText('Simpan Perubahan')).toBeInTheDocument();
  });

  it('5. Memanggil fungsi onCancel saat tombol batal diklik', () => {
    const handleCancel = vi.fn();
    const editData = { id: '1', title: 'Bumi', author: 'Tere Liye', status: 'baca' };
    render(<BookForm onSubmit={vi.fn()} editingBook={editData} onCancel={handleCancel} />);

    fireEvent.click(screen.getByText('Batal'));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});