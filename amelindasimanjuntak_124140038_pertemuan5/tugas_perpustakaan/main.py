from library_item import Book, Magazine
from member import Member
from library import Library


def main():
    # 1. Inisialisasi Objek Perpustakaan
    perpus = Library("Perpustakaan ITERA")

    # 2. Membuat Objek Buku dan Majalah (Inheritance & Polymorphism)
    buku1 = Book("B001", "Clean Code", 2008, "Robert C. Martin", 464)
    buku2 = Book("B002", "Python Crash Course", 2023, "Eric Matthes", 552)
    buku3 = Book("B003", "Filosofi Teras", 2018, "Henry Manampiring", 346)

    majalah1 = Magazine("M001", "National Geographic Indonesia", 2025, 241, "Kompas Gramedia")
    majalah2 = Magazine("M002", "Tempo Edisi Teknologi AI", 2026, 112, "Tempo Inti Media")

    print("--- 1. MENAMBAHKAN KOLEKSI KE PERPUSTAKAAN ---")
    perpus.add_item(buku1)
    perpus.add_item(buku2)
    perpus.add_item(buku3)
    perpus.add_item(majalah1)
    perpus.add_item(majalah2)

    # 3. Menampilkan Katalog Item yang Tersedia
    perpus.show_available_items()

    # 4. Demonstrasi Pencarian Item (berdasarkan Judul dan ID)
    print("\n--- 2. PENCARIAN ITEM ---")
    for kata_kunci in ["Python", "M001", "Harry Potter"]:
        print(f"Mencari kata kunci: '{kata_kunci}'")
        hasil = perpus.search_item(kata_kunci)
        if hasil:
            for item in hasil:
                print(f"   Ditemukan -> {item.get_detail()}")
        else:
            print("   Tidak ditemukan item yang cocok.")

    # 5. Demonstrasi Peminjaman & Status Ketersediaan (Encapsulation & Property)
    print("\n--- 3. TRANSAKSI PEMINJAMAN ---")
    anggota1 = Member("MBR-01", "Andi Pratama")
    perpus.register_member(anggota1)

    perpus.borrow_item(anggota1, "B001")  # Meminjam buku Clean Code
    perpus.borrow_item(anggota1, "M002")  # Meminjam majalah Tempo
    perpus.borrow_item(anggota1, "B001")  # Mencoba meminjam ulang buku yang sama (harus ditolak)

    # Cek katalog yang masih tersedia setelah dipinjam
    perpus.show_available_items()

    # 6. Demonstrasi Pengembalian & Polymorphism Perhitungan Denda
    print("\n--- 4. PENGEMBALIAN & PERHITUNGAN DENDA (POLYMORPHISM) ---")
    # Buku terlambat 3 hari (3 x Rp 2.000 = Rp 6.000)
    perpus.return_item(anggota1, "B001", days_late=3)
    # Majalah terlambat 3 hari (3 x Rp 1.000 = Rp 3.000)
    perpus.return_item(anggota1, "M002", days_late=3)

    # Tampilkan kembali semua koleksi setelah dikembalikan
    perpus.show_all_items()


if __name__ == "__main__":
    main()