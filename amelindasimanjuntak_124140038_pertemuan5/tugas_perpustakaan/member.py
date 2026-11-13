from library_item import LibraryItem


class Member:
    """
    Class yang merepresentasikan anggota perpustakaan.
    Mengelola daftar item yang sedang dipinjam oleh anggota.
    """

    def __init__(self, member_id: str, name: str):
        self.__member_id = member_id
        self.__name = name
        self.__borrowed_items: list[LibraryItem] = []

    @property
    def member_id(self) -> str:
        return self.__member_id

    @property
    def name(self) -> str:
        return self.__name

    @property
    def borrowed_items(self) -> list[LibraryItem]:
        """Mengembalikan salinan daftar item yang dipinjam agar list asli terlindungi."""
        return list(self.__borrowed_items)

    def borrow_item(self, item: LibraryItem):
        """Menambahkan item ke daftar pinjaman member."""
        self.__borrowed_items.append(item)

    def return_item(self, item: LibraryItem):
        """Menghapus item dari daftar pinjaman member saat dikembalikan."""
        if item in self.__borrowed_items:
            self.__borrowed_items.remove(item)

    def __str__(self) -> str:
        return f"Member [{self.__member_id}] - {self.__name} (Meminjam: {len(self.__borrowed_items)} item)"