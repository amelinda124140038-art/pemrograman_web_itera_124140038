# ==============================================================================
# Berkas: 01_procedural_vs_oop.py
# Deskripsi: Perbandingan praktis penanganan data mahasiswa via Prosedural vs OOP
# ==============================================================================

# ------------------------------------------------------------------------------
# PENDEKATAN 1: PROSEDURAL (Data dan Fungsi Terpisah)
# Masalah: Jika struktur dictionary berubah, semua fungsi yang bergantung bisa rusak.
# ------------------------------------------------------------------------------
mahasiswa_proc = {
    "nama": "Budi Santoso",
    "nim": "121140001",
    "jurusan": "Teknik Informatika",
    "ipk": 3.45
}

def cetak_profil_prosedural(mhs):
    print(f"[Prosedural] {mhs['nama']} ({mhs['nim']}) - {mhs['jurusan']} | IPK: {mhs['ipk']}")

def perbarui_ipk_prosedural(mhs, ipk_baru):
    if 0.0 <= ipk_baru <= 4.0:
        mhs['ipk'] = ipk_baru
    else:
        print("Nilai IPK tidak valid!")

cetak_profil_prosedural(mahasiswa_proc)
perbarui_ipk_prosedural(mahasiswa_proc, 3.75)
cetak_profil_prosedural(mahasiswa_proc)

# ------------------------------------------------------------------------------
# PENDEKATAN 2: OBJECT-ORIENTED (Data dan Perilaku Terbungkus Rapi dalam Class)
# Keunggulan: Validasi state dan fungsionalitas terlindungi di dalam satu entitas.
# ------------------------------------------------------------------------------
class Mahasiswa:
    def __init__(self, nama: str, nim: str, jurusan: str, ipk: float):
        self.nama = nama
        self.nim = nim
        self.jurusan = jurusan
        self.ipk = ipk

    def cetak_profil(self):
        print(f"[OOP] {self.nama} ({self.nim}) - {self.jurusan} | IPK: {self.ipk}")

    def update_ipk(self, ipk_baru: float):
        if 0.0 <= ipk_baru <= 4.0:
            self.ipk = ipk_baru
            print(f"IPK {self.nama} berhasil diperbarui menjadi {self.ipk}")
        else:
            print("Peringatan: Nilai IPK harus berada pada rentang 0.0 s.d 4.0!")

print("\n--- Eksekusi Paradigma OOP ---")
mhs_oop = Mahasiswa("Siti Rahma", "121140002", "Teknik Informatika", 3.80)
mhs_oop.cetak_profil()
mhs_oop.update_ipk(3.92)
mhs_oop.cetak_profil()

# ==============================================================================
# LATIHAN MANDIRI: PEMODELAN ENTITAS SISTEM KASIR TOKO ONLINE
# ==============================================================================
#
# 1. Entitas: Produk
#    - Atribut Data:
#      * id_produk   : Kode unik barang
#      * nama_produk : Nama barang
#      * harga       : Harga satuan barang
#      * stok        : Jumlah stok tersedia
#    - Metode Perilaku:
#      * update_stok(jumlah)   : Menambah atau mengurangi stok barang
#      * hitung_diskon(persen) : Menghitung harga setelah potongan diskon
#
# 2. Entitas: Keranjang
#    - Atribut Data:
#      * id_keranjang  : Kode unik keranjang belanja
#      * daftar_item   : Kumpulan produk yang dimasukkan pembeli
#      * total_harga   : Total akumulasi harga belanjaan
#    - Metode Perilaku:
#      * tambah_produk(produk, qty) : Memasukkan produk ke keranjang
#      * hapus_produk(id_produk)    : Menghapus produk dari keranjang
#      * hitung_total()             : Menghitung total biaya belanjaan
#
# 3. Entitas: Pengguna
#    - Atribut Data:
#      * id_pengguna : Kode unik akun pengguna
#      * nama        : Nama lengkap pengguna
#      * email       : Alamat email pengguna
#      * saldo       : Saldo pembayaran pengguna
#    - Metode Perilaku:
#      * login(email, password) : Memverifikasi akses masuk pengguna
#      * checkout(keranjang)    : Memproses pembayaran belanjaan
# ==============================================================================