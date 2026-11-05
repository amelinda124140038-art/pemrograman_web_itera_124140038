"""
Modul: math_operations.py
Berisi fungsi perhitungan geometri dan konversi suhu.
"""

# Konstanta PI
PI = 3.14159


# --- FUNGSI GEOMETRI ---

def luas_persegi(sisi: float) -> float:
    """Menhitung luas persegi (sisi * sisi)."""
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """Menhitung keliling persegi (4 * sisi)."""
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menhitung luas persegi panjang (panjang * lebar)."""
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menhitung keliling persegi panjang (2 * (panjang + lebar))."""
    return 2 * (panjang + lebar)


def luas_lingkaran(r: float) -> float:
    """Menhitung luas lingkaran (PI * r^2)."""
    return PI * (r ** 2)


def keliling_lingkaran(r: float) -> float:
    """Menhitung keliling lingkaran (2 * PI * r)."""
    return 2 * PI * r


# --- FUNGSI KONVERSI SUHU ---

def celsius_ke_fahrenheit(celsius: float) -> float:
    """Mengonversi suhu dari Celsius ke Fahrenheit."""
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """Mengonversi suhu dari Celsius ke Kelvin."""
    return celsius + 273.15