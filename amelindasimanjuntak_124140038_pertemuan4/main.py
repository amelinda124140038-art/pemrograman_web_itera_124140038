"""
Nama    : Amelinda Simanjuntak
NIM     : 124140038
Program : Main Script Penguji Modul Matematika
"""

# Cara Impor 1, mengimpor seluruh modul
import math_operations

# Cara Impor 2, mengimpor fungsi dan konstanta spesifik
from math_operations import (
    luas_lingkaran, 
    keliling_lingkaran, 
    celsius_ke_fahrenheit, 
    celsius_ke_kelvin,
    PI
)


def main():
    print("=" * 50)
    print("     PENGUJIAN MODUL MATEMATIKA (math_operations)    ")
    print("=" * 50)

    # 1. Pengujian Persegi (Menggunakan Cara Impor 1)
    sisi = 5.0
    print("\n[1] Geometri: Persegi")
    print(f"    - Sisi             : {sisi}")
    print(f"    - Luas             : {math_operations.luas_persegi(sisi)}")
    print(f"    - Keliling         : {math_operations.keliling_persegi(sisi)}")

    # 2. Pengujian Persegi Panjang (Menggunakan Cara Impor 1)
    p, l = 8.0, 4.0
    print("\n[2] Geometri: Persegi Panjang")
    print(f"    - Panjang / Lebar  : {p} / {l}")
    print(f"    - Luas             : {math_operations.luas_persegi_panjang(p, l)}")
    print(f"    - Keliling         : {math_operations.keliling_persegi_panjang(p, l)}")

    # 3. Pengujian Lingkaran (Menggunakan Cara Impor 2)
    r = 7.0
    print("\n[3] Geometri: Lingkaran")
    print(f"    - Konstanta PI     : {PI}")
    print(f"    - Jari-jari (r)    : {r}")
    print(f"    - Luas             : {luas_lingkaran(r):.2f}")
    print(f"    - Keliling         : {keliling_lingkaran(r):.2f}")

    # 4. Pengujian Konversi Suhu (Menggunakan Cara Impor 2)
    temp_c = 30.0
    print("\n[4] Konversi Suhu")
    print(f"    - Suhu Celsius     : {temp_c}°C")
    print(f"    - Fahrenheit       : {celsius_ke_fahrenheit(temp_c):.2f}°F")
    print(f"    - Kelvin           : {celsius_ke_kelvin(temp_c):.2f} K")

    print("\n" + "=" * 50)


if __name__ == "__main__":
    main()