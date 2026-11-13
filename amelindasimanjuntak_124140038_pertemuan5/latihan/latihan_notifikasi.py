class NotifikasiEmail:
    """Saluran pengiriman notifikasi melalui Email."""

    def __init__(self, penerima_default: str):
        self.penerima_default = penerima_default

    def kirim(self, pesan: str, penerima: str = None):
        target = penerima if penerima else self.penerima_default
        print(f"[EMAIL] Mengirim ke <{target}>")
        print(f"   Subject : PENGUMUMAN DARURAT")
        print(f"   Isi     : {pesan}")


class NotifikasiSMS:
    """Saluran pengiriman notifikasi melalui SMS Gateway."""

    def __init__(self, penerima_default: str):
        self.penerima_default = penerima_default

    def kirim(self, pesan: str, penerima: str = None):
        target = penerima if penerima else self.penerima_default
        print(f"[SMS] Mengirim pesan singkat ke {target}: '{pesan}'")


class NotifikasiWhatsApp:
    """Saluran pengiriman notifikasi melalui WhatsApp Business API."""

    def __init__(self, penerima_default: str):
        self.penerima_default = penerima_default

    def kirim(self, pesan: str, penerima: str = None):
        target = penerima if penerima else self.penerima_default
        print(f"[WHATSAPP] Centang Biru terkirim ke {target} -> *{pesan}*")


def broadcast_pengumuman(daftar_channel: list, pesan: str, penerima: str = None):
    """
    Fungsi polimorfik untuk menyiarkan pesan darurat ke seluruh kanal notifikasi
    tanpa perlu memeriksa tipe class masing-masing saluran.
    """
    print("==========================================================")
    print("         MEMULAI BROADCAST PENGUMUMAN DARURAT             ")
    print("==========================================================")
    for channel in daftar_channel:
        # Duck Typing: Setiap objek channel wajib memiliki method kirim(pesan, penerima)
        channel.kirim(pesan, penerima)
        print("-" * 58)


# --- Pengujian Sistem Dispatcher Notifikasi ---
if __name__ == "__main__":
    email_srv = NotifikasiEmail("mahasiswa@itera.ac.id")
    sms_srv = NotifikasiSMS("0812-3456-7890")
    wa_srv = NotifikasiWhatsApp("+62 812-3456-7890")

    semua_kanal = [email_srv, sms_srv, wa_srv]

    # 1. Broadcast menggunakan penerima default masing-masing saluran
    broadcast_pengumuman(
        semua_kanal,
        "PERINGATAN: Pemeliharaan server portal akademik akan berlangsung pukul 23.00 WIB."
    )

    # 2. Broadcast dengan menimpa parameter penerima secara spesifik
    print("\n--- Broadcast ke Penerima Spesifik ---")
    email_srv.kirim("Akun Anda baru saja login dari perangkat baru.", "amelinda@student.itera.ac.id")
    wa_srv.kirim("Kode OTP Anda adalah 884210.", "0899-8877-6655")