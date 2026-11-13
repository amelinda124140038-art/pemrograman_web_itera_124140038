from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract base class untuk semua koleksi item di perpustakaan.
    Menerapkan konsep Abstraction, Encapsulation, dan Polymorphism.
    """

    def __init__(self, item_id: str, title: str, year: int):
        # Protected attributes (_) agar dapat diakses subclass namun tetap terlindungi
        self._item_id = item_id
        self._title = title
        self._year = year
        # Private attribute (__) untuk status peminjaman
        self.__is_borrowed = False

    # --- Property Decorators (Encapsulation) ---
    @property
    def item_id(self) -> str:
        """Getter untuk mendapatkan ID item (read-only)."""
        return self._item_id

    @property
    def title(self) -> str:
        """Getter untuk mendapatkan judul item."""
        return self._title

    @title.setter
    def title(self, new_title: str):
        """Setter untuk mengubah judul item dengan validasi."""
        if not new_title.strip():
            raise ValueError("Judul item tidak boleh kosong!")
        self._title = new_title

    @property
    def year(self) -> int:
        """Getter untuk tahun terbit."""
        return self._year

    @property
    def is_borrowed(self) -> bool:
        """Getter untuk mengecek status apakah item sedang dipinjam."""
        return self.__is_borrowed

    @is_borrowed.setter
    def is_borrowed(self, status: bool):
        """Setter untuk mengubah status peminjaman dengan validasi tipe boolean."""
        if not isinstance(status, bool):
            raise TypeError("Status peminjaman harus berupa boolean (True/False).")
        self.__is_borrowed = status

    # --- Abstract Methods (Wajib diimplementasikan oleh subclass) ---
    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan informasi detail spesifik dari masing-masing jenis item."""
        pass

    @abstractmethod
    def calculate_fine(self, days_late: int) -> int:
        """Menghitung denda keterlambatan berdasarkan jenis item."""
        pass


class Book(LibraryItem):
    """
    Subclass yang merepresentasikan koleksi Buku di perpustakaan.
    Mewarisi class LibraryItem.
    """

    def __init__(self, item_id: str, title: str, year: int, author: str, pages: int):
        super().__init__(item_id, title, year)
        self._author = author
        self._pages = pages

    @property
    def author(self) -> str:
        return self._author

    def get_detail(self) -> str:
        """Implementasi polymorphism untuk menampilkan detail Buku."""
        status = "Dipinjam" if self.is_borrowed else "Tersedia"
        return (
            f"[BUKU] ID: {self.item_id} | Judul: '{self.title}' ({self.year}) | "
            f"Penulis: {self._author} | Halaman: {self._pages} | Status: {status}"
        )

    def calculate_fine(self, days_late: int) -> int:
        """Implementasi polymorphism: Denda buku Rp 2.000 per hari keterlambatan."""
        if days_late <= 0:
            return 0
        return days_late * 2000


class Magazine(LibraryItem):
    """
    Subclass yang merepresentasikan koleksi Majalah di perpustakaan.
    Mewarisi class LibraryItem.
    """

    def __init__(self, item_id: str, title: str, year: int, issue_number: int, publisher: str):
        super().__init__(item_id, title, year)
        self._issue_number = issue_number
        self._publisher = publisher

    @property
    def issue_number(self) -> int:
        return self._issue_number

    def get_detail(self) -> str:
        """Implementasi polymorphism untuk menampilkan detail Majalah."""
        status = "Dipinjam" if self.is_borrowed else "Tersedia"
        return (
            f"[MAJALAH] ID: {self.item_id} | Judul: '{self.title}' ({self.year}) | "
            f"Edisi: #{self._issue_number} | Penerbit: {self._publisher} | Status: {status}"
        )

    def calculate_fine(self, days_late: int) -> int:
        """Implementasi polymorphism: Denda majalah Rp 1.000 per hari keterlambatan."""
        if days_late <= 0:
            return 0
        return days_late * 1000