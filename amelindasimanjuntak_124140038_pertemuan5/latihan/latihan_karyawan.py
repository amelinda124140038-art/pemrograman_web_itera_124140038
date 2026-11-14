class Karyawan:
    """
    Class Karyawan yang menerapkan Encapsulation pada atribut gaji pokok
    dengan validasi Upah Minimum Regional (UMR).
    """
    UMR = 3200000.0

    def __init__(self, nama: str, jabatan: str, gaji_pokok: float):
        self.nama = nama
        self.jabatan = jabatan
        # Memanggil setter gaji_pokok agar nilai awal langsung tervalidasi UMR
        self.gaji_pokok = gaji_pokok

    @property
    def gaji_pokok(self) -> float:
        """Getter untuk membaca nilai atribut private __gaji_pokok."""
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, nominal: float):
        """Setter untuk memvalidasi agar gaji pokok tidak di bawah UMR (Rp 3.200.000)."""
        if not isinstance(nominal, (int, float)):
            raise TypeError("Gaji pokok harus berupa angka!")
        if nominal < self.UMR:
            raise ValueError(
                f"Gaji pokok tidak boleh di bawah UMR (Rp {self.UMR:,.0f})!"
            )
        self.__gaji_pokok = float(nominal)

    def hitung_gaji_bersih(self, pajak_persen: float) -> float:
        """Menghitung gaji bersih setelah dipotong persentase pajak."""
        if pajak_persen < 0 or pajak_persen > 100:
            raise ValueError("Persentase pajak harus berada di antara 0 hingga 100!")
        potongan_pajak = self.__gaji_pokok * (pajak_persen / 100)
        return self.__gaji_pokok - potongan_pajak

    def __str__(self) -> str:
        return (
            f"Karyawan: {self.nama} | Jabatan: {self.jabatan} | "
            f"Gaji Pokok: Rp {self.__gaji_pokok:,.0f}"
        )


# --- Pengujian Class Karyawan ---
if __name__ == "__main__":
    # 1. Membuat objek karyawan dengan gaji valid (>= UMR)
    karyawan1 = Karyawan("Amel", "Backend Developer", 6500000)
    print(karyawan1)

    pajak = 5  # 5%
    gaji_bersih = karyawan1.hitung_gaji_bersih(pajak)
    print(f"Gaji Bersih setelah pajak {pajak}%: Rp {gaji_bersih:,.0f}")

    # 2. Menguji validasi setter saat gaji diubah di bawah UMR
    print("\n--- Uji Validasi Gaji di Bawah UMR ---")
    try:
        karyawan1.gaji_pokok = 2500000
    except ValueError as err:
        print(f"Validasi Berhasil Tertangkap: {err}")

    # 3. Menguji validasi saat inisialisasi objek baru di bawah UMR
    try:
        karyawan2 = Karyawan("Dika", "Staff Admin", 3000000)
    except ValueError as err:
        print(f"Validasi Inisialisasi Tertangkap: {err}")