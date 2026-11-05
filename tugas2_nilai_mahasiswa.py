"""
Nama    : Amelinda Simanjuntak
NIM     : 124140038
Program : Pengelolaan Data Nilai Mahasiswa
"""

def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung nilai akhir mahasiswa berdasarkan bobot:
    30% UTS + 40% UAS + 30% Tugas.
    """
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """
    Menentukan grade nilai berdasarkan kriteria baku.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def main():
    # List berisi dictionary data minimal 5 mahasiswa
    daftar_mahasiswa = [
        {"nama": "Dita", "nim": "123456789", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
        {"nama": "Dika", "nim": "123456780", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 75},
        {"nama": "Dina", "nim": "123456781", "nilai_uts": 92, "nilai_uas": 95, "nilai_tugas": 90},
        {"nama": "Dian", "nim": "123456782", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 45},
        {"nama": "Dini", "nim": "123456783", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 80},
    ]

    # Hitung nilai akhir dan grade untuk setiap mahasiswa
    for mhs in daftar_mahasiswa:
        n_akhir = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
        mhs["nilai_akhir"] = n_akhir
        mhs["grade"] = tentukan_grade(n_akhir)

    # Tampilkan tabel data mahasiswa
    print("=" * 65)
    print(f"{'NIM':<12} | {'Nama Mahasiswa':<18} | {'Nilai Akhir':<12} | {'Grade':<6}")
    print("=" * 65)

    for mhs in daftar_mahasiswa:
        print(f"{mhs['nim']:<12} | {mhs['nama']:<18} | {mhs['nilai_akhir']:<12.2f} | {mhs['grade']:<6}")

    print("=" * 65)

    # Cari mahasiswa dengan nilai tertinggi & terendah
    mhs_tertinggi = max(daftar_mahasiswa, key=lambda x: x["nilai_akhir"])
    mhs_terendah = min(daftar_mahasiswa, key=lambda x: x["nilai_akhir"])

    print("\n--- INFORMASI STATISTIK NILAI ---")
    print(f"Nilai Akhir Tertinggi : {mhs_tertinggi['nama']} ({mhs_tertinggi['nim']}) - {mhs_tertinggi['nilai_akhir']:.2f} (Grade {mhs_tertinggi['grade']})")
    print(f"Nilai Akhir Terendah  : {mhs_terendah['nama']} ({mhs_terendah['nim']}) - {mhs_terendah['nilai_akhir']:.2f} (Grade {mhs_terendah['grade']})")


if __name__ == "__main__":
    main()