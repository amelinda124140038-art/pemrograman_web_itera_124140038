// State Aplikasi
let keranjang = JSON.parse(localStorage.getItem('mini_pos_keranjang')) || [];

// Element DOM
const formBarang = document.getElementById('formBarang');
const inputNama = document.getElementById('namaBarang');
const inputHarga = document.getElementById('hargaBarang');
const inputQty = document.getElementById('qtyBarang');

const errNama = document.getElementById('errNama');
const errHarga = document.getElementById('errHarga');
const errQty = document.getElementById('errQty');

const bodyTabel = document.getElementById('bodyTabel');
const txtSubtotal = document.getElementById('txtSubtotal');
const txtDiskon = document.getElementById('txtDiskon');
const txtTotal = document.getElementById('txtTotal');

const inputKodePromo = document.getElementById('kodePromo');
const inputUangBayar = document.getElementById('uangBayar');
const errBayar = document.getElementById('errBayar');
const txtKembalian = document.getElementById('txtKembalian');
const btnReset = document.getElementById('btnReset');

// Format Rupiah Helper
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  renderTabel();
  hitungKalkulator();
});

// Event Listener Submit Form Input
formBarang.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validasiForm()) {
    const itemBaru = {
      id: Date.now(),
      nama: inputNama.value.trim(),
      harga: parseFloat(inputHarga.value),
      qty: parseInt(inputQty.value)
    };

    keranjang.push(itemBaru);
    simpanKeLocalStorage();
    renderTabel();
    hitungKalkulator();

    formBarang.reset();
    inputQty.value = 1;
    resetPesanError();
  }
});

// Validasi Form
function validasiForm() {
  let isValid = true;
  resetPesanError();

  const nama = inputNama.value.trim();
  const harga = parseFloat(inputHarga.value);
  const qty = parseInt(inputQty.value);

  if (!nama || nama.length < 3) {
    errNama.textContent = 'Nama barang wajib diisi (minimal 3 karakter).';
    isValid = false;
  }

  if (isNaN(harga) || harga < 500) {
    errHarga.textContent = 'Harga satuan minimal Rp 500 dan berupa angka positif.';
    isValid = false;
  }

  if (isNaN(qty) || qty < 1) {
    errQty.textContent = 'Jumlah barang minimal 1.';
    isValid = false;
  }

  return isValid;
}

function resetPesanError() {
  errNama.textContent = '';
  errHarga.textContent = '';
  errQty.textContent = '';
  errBayar.textContent = '';
}

// Render Tabel Keranjang
function renderTabel() {
  bodyTabel.innerHTML = '';

  if (keranjang.length === 0) {
    bodyTabel.innerHTML = `<tr><td colspan="6" style="text-align:center;">Keranjang belanja kosong.</td></tr>`;
    return;
  }

  keranjang.forEach((item, index) => {
    const subtotal = item.harga * item.qty;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.nama}</td>
      <td>${formatRupiah(item.harga)}</td>
      <td>${item.qty}</td>
      <td>${formatRupiah(subtotal)}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="hapusItem(${item.id})">Hapus</button>
      </td>
    `;
    bodyTabel.appendChild(tr);
  });
}

// Hapus Item
function hapusItem(id) {
  keranjang = keranjang.filter((item) => item.id !== id);
  simpanKeLocalStorage();
  renderTabel();
  hitungKalkulator();
}

// Simpan LocalStorage
function simpanKeLocalStorage() {
  localStorage.setItem('mini_pos_keranjang', JSON.stringify(keranjang));
}

// Kalkulator Total, Diskon & Kembalian
function hitungKalkulator() {
  const subtotalTotal = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);
  const promoInput = inputKodePromo.value.trim().toUpperCase();

  let diskon = 0;
  if (subtotalTotal >= 50000 || promoInput === 'HEMAT10') {
    diskon = subtotalTotal * 0.1; // Diskon 10%
  }

  const totalBayar = subtotalTotal - diskon;

  txtSubtotal.textContent = formatRupiah(subtotalTotal);
  txtDiskon.textContent = formatRupiah(diskon);
  txtTotal.textContent = formatRupiah(totalBayar);

  hitungKembalian(totalBayar);
}

// Event Listeners Tambahan
inputKodePromo.addEventListener('input', hitungKalkulator);
inputUangBayar.addEventListener('input', hitungKalkulator);

function hitungKembalian(totalBayar) {
  const uangBayar = parseFloat(inputUangBayar.value);
  errBayar.textContent = '';

  if (isNaN(uangBayar) || uangBayar === 0) {
    txtKembalian.textContent = 'Rp 0';
    return;
  }

  const kembalian = uangBayar - totalBayar;

  if (kembalian < 0) {
    errBayar.textContent = `Uang belum mencukupi (Kurang ${formatRupiah(Math.abs(kembalian))}).`;
    txtKembalian.textContent = 'Rp 0';
  } else {
    txtKembalian.textContent = formatRupiah(kembalian);
  }
}

// Reset / Transaksi Baru
btnReset.addEventListener('click', () => {
  if (confirm('Apakah Anda yakin ingin mengosongkan keranjang dan memulai transaksi baru?')) {
    keranjang = [];
    localStorage.removeItem('mini_pos_keranjang');
    renderTabel();
    hitungKalkulator();
    formBarang.reset();
    inputUangBayar.value = '';
    inputKodePromo.value = '';
    resetPesanError();
  }
});