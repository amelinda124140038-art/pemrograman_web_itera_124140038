from abc import ABC, abstractmethod


class FileStorage(ABC):
    """
    Interface / Abstract Base Class untuk layanan penyimpanan file.
    """

    @abstractmethod
    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        """Menyimpan data file ke media penyimpanan."""
        pass

    @abstractmethod
    def download_file(self, nama_file: str) -> bytes:
        """Mengambil data file dari media penyimpanan."""
        pass


class LocalDiskStorage(FileStorage):
    """Implementasi penyimpanan file ke direktori lokal komputer/server."""

    def __init__(self, direktori_lokal: str = "/var/www/uploads"):
        self.direktori_lokal = direktori_lokal
        self._storage_lokal: dict[str, bytes] = {}

    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        path_lengkap = f"{self.direktori_lokal}/{nama_file}"
        self._storage_lokal[nama_file] = data_bytes
        print(f"[LOCAL DISK] Berhasil menyimpan '{nama_file}' ({len(data_bytes)} bytes) ke {path_lengkap}")
        return True

    def download_file(self, nama_file: str) -> bytes:
        if nama_file not in self._storage_lokal:
            raise FileNotFoundError(f"[LOCAL DISK] File '{nama_file}' tidak ditemukan di {self.direktori_lokal}!")
        data = self._storage_lokal[nama_file]
        print(f"[LOCAL DISK] Mengunduh '{nama_file}' ({len(data)} bytes) dari disk lokal...")
        return data


class CloudStorage(FileStorage):
    """Implementasi penyimpanan file ke server cloud (misalnya AWS S3 / Google Cloud Storage)."""

    def __init__(self, nama_bucket: str, region: str = "ap-southeast-3"):
        self.nama_bucket = nama_bucket
        self.region = region
        self._cloud_bucket: dict[str, bytes] = {}

    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        url_cloud = f"https://{self.nama_bucket}.s3.{self.region}.amazonaws.com/{nama_file}"
        self._cloud_bucket[nama_file] = data_bytes
        print(f"[CLOUD STORAGE] Mengunggah '{nama_file}' ({len(data_bytes)} bytes) ke {url_cloud} [OK]")
        return True

    def download_file(self, nama_file: str) -> bytes:
        if nama_file not in self._cloud_bucket:
            raise FileNotFoundError(f"[CLOUD STORAGE] Objek '{nama_file}' tidak ditemukan di bucket '{self.nama_bucket}'!")
        data = self._cloud_bucket[nama_file]
        print(f"[CLOUD STORAGE] Mengunduh '{nama_file}' ({len(data)} bytes) dari server cloud...")
        return data


# --- Pengujian Sistem File Storage ---
if __name__ == "__main__":
    contoh_data = b"Laporan Praktikum Pemrograman Web Pertemuan 5 - ITERA"

    print("=== 1. Pengujian Local Disk Storage ===")
    local = LocalDiskStorage(direktori_lokal="C:/praktikum/uploads")
    local.upload_file("laporan_oop.txt", contoh_data)
    hasil_lokal = local.download_file("laporan_oop.txt")
    print(f"Isi file lokal: {hasil_lokal.decode('utf-8')}\n")

    print("=== 2. Pengujian Cloud Storage ===")
    cloud = CloudStorage(nama_bucket="itera-paw-bucket")
    cloud.upload_file("backup_laporan.txt", contoh_data)
    hasil_cloud = cloud.download_file("backup_laporan.txt")
    print(f"Isi file cloud: {hasil_cloud.decode('utf-8')}\n")

    print("=== 3. Bukti Enforcement Abstract Class FileStorage ===")
    try:
        storage_abstrak = FileStorage()
    except TypeError as err:
        print(f"Penolakan Python Terbukti: {err}")