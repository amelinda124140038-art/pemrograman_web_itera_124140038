class Buku:
    """
    Class yang merepresentasikan entitas Buku beserta fitur perhitungan diskon
    dan dunder methods (__str__ serta __len__).
    """

    def __init__(self, judul: str, penulis: str, harga_asli: float, jumlah_halaman: int):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen: float) -> float:
        """
        Menghitung dan mengembalikan harga buku setelah dipotong diskon.
        """
        if persen < 0 or persen > 100:
            raise ValueError("Persentase diskon harus berada di antara 0 hingga 100!")
        potongan = self.harga_asli * (persen / 100)
        return self.harga_asli - potongan

    def __str__(self) -> str:
        """
        Dunder method untuk mencetak representasi kartu informasi buku saat diprint.
        """
        return (
            "====================================\n"
            "            KARTU BUKU              \n"
            "====================================\n"
            f"Judul   : {self.judul}\n"
            f"Penulis : {self.penulis}\n"
            f"Halaman : {self.jumlah_halaman} lembar\n"
            f"Harga   : Rp {self.harga_asli:,.0f}\n"
            "===================================="
        )

    def __len__(self) -> int:
        """
        Dunder method agar fungsi bawaan len(objek_buku) mengembalikan jumlah halaman.
        """
        return self.jumlah_halaman


# --- Pengujian Class Buku ---
if __name__ == "__main__":
    buku1 = Buku(
        judul="Laskar Pelangi",
        penulis="Andrea Hirata",
        harga_asli=95000,
        jumlah_halaman=529
    )

    # 1. Menguji dunder method __str__
    print(buku1)

    # 2. Menguji dunder method __len__
    print(f"Ketebalan buku (via len): {len(buku1)} halaman")

    # 3. Menguji method hitung_harga_diskon
    diskon = 20
    harga_akhir = buku1.hitung_harga_diskon(diskon)
    print(f"Harga setelah diskon {diskon}%: Rp {harga_akhir:,.0f}")