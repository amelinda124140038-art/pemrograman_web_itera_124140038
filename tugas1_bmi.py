"""
Nama    : Amelinda Simanjuntak
NIM     : 124140038
Program : Penghitung BMI (Body Mass Index)
"""

def hitung_bmi(berat_kg: float, tinggi_m: float) -> float:
    """
    Menghitung nilai Body Mass Index (BMI).
    
    Parameters:
        berat_kg (float): Berat badan dalam kilogram (kg)
        tinggi_m (float): Tinggi badan dalam meter (m)
        
    Returns:
        float: Nilai BMI
    """
    return berat_kg / (tinggi_m ** 2)


def tentukan_kategori_bmi(bmi: float) -> str:
    """
    Menentukan kategori status berat badan berdasarkan nilai BMI.
    
    Parameters:
        bmi (float): Nilai BMI
        
    Returns:
        str: Kategori BMI
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif 18.5 <= bmi < 25:
        return "Berat badan normal"
    elif 25 <= bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def main():
    print("=" * 40)
    print("      PROGRAM PENGHITUNG BMI SIMPEL      ")
    print("=" * 40)
    
    try:
        berat = float(input("Masukkan berat badan (kg) : "))
        tinggi = float(input("Masukkan tinggi badan (m)  : "))
        
        if berat <= 0 or tinggi <= 0:
            print("\nError: Berat dan tinggi badan harus lebih dari 0!")
            return

        bmi = hitung_bmi(berat, tinggi)
        kategori = tentukan_kategori_bmi(bmi)

        print("-" * 40)
        print(f"Nilai BMI Anda : {bmi:.2f}")
        print(f"Kategori       : {kategori}")
        print("=" * 40)
        
    except ValueError:
        print("\nError: Input harus berupa angka yang valid!")


if __name__ == "__main__":
    main()