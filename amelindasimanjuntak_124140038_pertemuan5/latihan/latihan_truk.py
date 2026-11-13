import importlib

# Mengimpor class Kendaraan dari file 03_inheritance.py
modul_inheritance = importlib.import_module("03_inheritance")
Kendaraan = modul_inheritance.Kendaraan


class Truk(Kendaraan):
    """
    Subclass Truk yang mewarisi class Kendaraan.
    Mengelola kapasitas angkut kargo dan validasi muatan.
    """

    def __init__(self, merek: str, model: str, tahun: int, kapasitas_maksimal_ton: float):
        super().__init__(merek, model, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0.0

    def muat_barang(self, berat_ton: float):
        """Menambahkan muatan kargo dengan validasi kapasitas maksimal."""
        if berat_ton <= 0:
            print(f"[{self.merek} {self.model}] Berat barang tidak valid!")
            return

        if self.muatan_saat_ini + berat_ton <= self.kapasitas_maksimal_ton:
            self.muatan_saat_ini += berat_ton
            print(
                f"[{self.merek} {self.model}] Berhasil memuat +{berat_ton} ton. "
                f"Total muatan: {self.muatan_saat_ini}/{self.kapasitas_maksimal_ton} ton"
            )
        else:
            sisa_kapasitas = self.kapasitas_maksimal_ton - self.muatan_saat_ini
            print(
                f"[OVERLOAD] Gagal memuat {berat_ton} ton! "
                f"Sisa kapasitas hanya {sisa_kapasitas} ton."
            )

    def deskripsi(self) -> str:
        """Override method deskripsi() untuk menampilkan informasi beban muatan."""
        deskripsi_dasar = super().deskripsi()
        return (
            f"{deskripsi_dasar} [Truk Kargo | Muatan: {self.muatan_saat_ini} / "
            f"{self.kapasitas_maksimal_ton} ton]"
        )


# --- Pengujian Subclass Truk ---
if __name__ == "__main__":
    truk_hino = Truk("Hino", "Ranger FM 260 JD", 2023, kapasitas_maksimal_ton=15.0)

    print("--- Deskripsi Awal ---")
    print(truk_hino.deskripsi())

    print("\n--- Simulasi Pemuatan Barang ---")
    truk_hino.muat_barang(8.5)
    truk_hino.muat_barang(4.0)
    truk_hino.muat_barang(5.0)  # Harus ditolak karena melebihi kapasitas 15 ton

    print("\n--- Deskripsi Setelah Pemuatan ---")
    print(truk_hino.deskripsi())
    truk_hino.tambah_jarak(85.0)