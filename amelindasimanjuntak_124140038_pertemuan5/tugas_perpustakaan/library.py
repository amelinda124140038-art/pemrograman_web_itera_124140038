from library_item import LibraryItem
from member import Member


class Library:
    """
    Class utama untuk mengelola koleksi perpustakaan dan transaksi peminjaman.
    """

    def __init__(self, name: str):
        self.name = name
        # Private attribute untuk menjaga keamanan data koleksi perpustakaan
        self.__koleksi: list[LibraryItem] = []
        self.__members: list[Member] = []

    def add_item(self, item: LibraryItem):
        """Menambahkan item baru (Book/Magazine) ke dalam koleksi perpustakaan."""
        for existing_item in self.__koleksi:
            if existing_item.item_id.lower() == item.item_id.lower():
                print(f"[GAGAL] Item dengan ID '{item.item_id}' sudah terdaftar.")
                return
        self.__koleksi.append(item)
        print(f"[BERHASIL] Item '{item.title}' (ID: {item.item_id}) ditambahkan ke {self.name}.")

    def register_member(self, member: Member):
        """Mendaftarkan anggota baru ke perpustakaan."""
        self.__members.append(member)
        print(f"[MEMBER] Anggota '{member.name}' (ID: {member.member_id}) berhasil didaftarkan.")

    def show_available_items(self):
        """Menampilkan seluruh daftar item yang saat ini berstatus Tersedia."""
        print(f"\n=== KATALOG ITEM TERSEDIA DI {self.name.upper()} ===")
        available = [item for item in self.__koleksi if not item.is_borrowed]

        if not available:
            print("Tidak ada item yang tersedia saat ini.")
            return

        for idx, item in enumerate(available, start=1):
            # Polymorphism: get_detail() dipanggil sesuai tipe objek (Book atau Magazine)
            print(f"{idx}. {item.get_detail()}")
        print("=" * 55)

    def show_all_items(self):
        """Menampilkan seluruh koleksi item (baik yang tersedia maupun dipinjam)."""
        print(f"\n=== SELURUH KOLEKSI {self.name.upper()} ===")
        if not self.__koleksi:
            print("Koleksi perpustakaan masih kosong.")
            return

        for idx, item in enumerate(self.__koleksi, start=1):
            print(f"{idx}. {item.get_detail()}")
        print("=" * 55)

    def search_item(self, keyword: str) -> list[LibraryItem]:
        """
        Mencari item berdasarkan ID atau sebagian judul (case-insensitive).
        Mengembalikan list objek LibraryItem yang cocok.
        """
        keyword_lower = keyword.lower().strip()
        results = [
            item for item in self.__koleksi
            if keyword_lower == item.item_id.lower() or keyword_lower in item.title.lower()
        ]
        return results

    def borrow_item(self, member: Member, item_id: str):
        """Memproses peminjaman item oleh anggota perpustakaan."""
        found_items = [item for item in self.__koleksi if item.item_id.lower() == item_id.lower()]
        if not found_items:
            print(f"[ERROR] Item dengan ID '{item_id}' tidak ditemukan.")
            return

        item = found_items[0]
        if item.is_borrowed:
            print(f"[MAAF] Item '{item.title}' sedang dipinjam orang lain.")
            return

        item.is_borrowed = True
        member.borrow_item(item)
        print(f"[PINJAM] {member.name} berhasil meminjam '{item.title}'.")

    def return_item(self, member: Member, item_id: str, days_late: int = 0):
        """Memproses pengembalian item dan menghitung denda jika terlambat."""
        found_items = [item for item in self.__koleksi if item.item_id.lower() == item_id.lower()]
        if not found_items:
            print(f"[ERROR] Item dengan ID '{item_id}' tidak ditemukan.")
            return

        item = found_items[0]
        if not item.is_borrowed or item not in member.borrowed_items:
            print(f"[ERROR] Item '{item.title}' tidak tercatat dalam pinjaman {member.name}.")
            return

        item.is_borrowed = False
        member.return_item(item)
        fine = item.calculate_fine(days_late)
        print(f"[KEMBALI] {member.name} mengembalikan '{item.title}'.")
        if fine > 0:
            print(f"   -> Terlambat {days_late} hari. Total denda: Rp {fine:,}")
        else:
            print("   -> Dikembalikan tepat waktu. Denda: Rp 0")