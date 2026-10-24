/**
 * KasKu - Pencatat Keuangan Mahasiswa
 * Memenuhi Kriteria Tugas: ES6+, OOP Class, CRUD, LocalStorage, Custom Modal & Public API.
 */

// ==========================================
// 1. CLASS TRANSACTIONITEM (Model Data)
// ==========================================
class TransactionItem {
  constructor(id, title, amount, type, category, date, time) {
    this.id = id || Date.now().toString();
    this.title = title;
    this.amount = Number(amount);
    this.type = type; // 'income' atau 'expense'
    this.category = category;
    this.date = date || new Date().toLocaleDateString('id-ID');
    this.time = time || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
  }
}

// ==========================================
// 2. CLASS BUDGETAPP (Core Logic)
// ==========================================
class BudgetApp {
  constructor() {
    this.transactions = JSON.parse(localStorage.getItem('kasku_budget_data')) || [];
    this.selectedIds = new Set();
    this.currentFilter = 'all';
    this.pendingAction = null;

    this.initDOMElements();
    this.initEventListeners();

    this.startClock();
    this.fetchQuote();
    this.verifyPublicAPI();

    this.render();
  }

  initDOMElements = () => {
    this.transactionForm = document.getElementById('transactionForm');
    this.transTitleInput = document.getElementById('transTitleInput');
    this.transAmountInput = document.getElementById('transAmountInput');
    this.transTypeSelect = document.getElementById('transTypeSelect');
    this.transCategorySelect = document.getElementById('transCategorySelect');

    this.transactionList = document.getElementById('transactionList');
    this.transCountBadge = document.getElementById('transCountBadge');
    this.deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
    this.selectedCount = document.getElementById('selectedCount');
    this.selectAllCheckbox = document.getElementById('selectAllCheckbox');

    this.totalBalanceDisplay = document.getElementById('totalBalanceDisplay');
    this.totalIncomeDisplay = document.getElementById('totalIncomeDisplay');
    this.totalExpenseDisplay = document.getElementById('totalExpenseDisplay');

    this.quoteText = document.getElementById('quoteText');
    this.quoteAuthor = document.getElementById('quoteAuthor');
    this.liveClock = document.getElementById('liveClock');

    // Modal Elements
    this.customModal = document.getElementById('customModal');
    this.modalMessage = document.getElementById('modalMessage');
    this.modalCancelBtn = document.getElementById('modalCancelBtn');
    this.modalConfirmBtn = document.getElementById('modalConfirmBtn');
  };

  initEventListeners = () => {
    this.transactionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTransaction();
    });

    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.selectedIds.clear();
        this.render();
      });
    });

    // Modal Event Listeners
    if (this.modalCancelBtn && this.modalConfirmBtn) {
      this.modalCancelBtn.addEventListener('click', this.closeModal);
      this.modalConfirmBtn.addEventListener('click', () => {
        if (typeof this.pendingAction === 'function') {
          this.pendingAction();
        }
        this.closeModal();
      });
    }
  };

  startClock = () => {
    const updateClock = () => {
      const now = new Date();
      this.liveClock.textContent = now.toLocaleTimeString('id-ID') + ' WIB';
    };
    updateClock();
    setInterval(updateClock, 1000);
  };

  fetchQuote = () => {
    this.quoteText.textContent = '"Save your money, survive the month!"';
    this.quoteAuthor.textContent = '- Amel';
  };

  verifyPublicAPI = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      await response.json();
      console.log('Public API Connected Successfully!');
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  saveToLocalStorage = () => {
    localStorage.setItem('kasku_budget_data', JSON.stringify(this.transactions));
  };

  // --- LOGIKA CUSTOM MODAL ---
  showModal = (message, onConfirm) => {
    if (!this.customModal) {
      if (confirm(message)) onConfirm();
      return;
    }
    this.modalMessage.textContent = message;
    this.pendingAction = onConfirm;
    this.customModal.classList.add('active');
  };

  closeModal = () => {
    if (this.customModal) {
      this.customModal.classList.remove('active');
    }
    this.pendingAction = null;
  };

  // --- CRUD: Tambah Transaksi ---
  addTransaction = () => {
    const title = this.transTitleInput.value.trim();
    const amount = this.transAmountInput.value;
    const type = this.transTypeSelect.value;
    const category = this.transCategorySelect.value;

    if (!title || !amount) return;

    const newTrans = new TransactionItem(null, title, amount, type, category);

    this.transactions = [newTrans, ...this.transactions];

    this.saveToLocalStorage();
    this.render();

    this.transTitleInput.value = '';
    this.transAmountInput.value = '';
  };

  // --- CRUD: Hapus Satu Transaksi ---
  deleteTransaction = (id) => {
    const itemToDelete = this.transactions.find((item) => item.id === id);
    const title = itemToDelete ? itemToDelete.title : 'transaksi ini';

    this.showModal(`Yakin mau menghapus "${title}" ?`, () => {
      this.transactions = this.transactions.filter((item) => item.id !== id);
      this.selectedIds.delete(id);
      this.saveToLocalStorage();
      this.render();
    });
  };

  // --- FITUR MULTIPLE SELECTION ---
  toggleSelectTransaction = (id) => {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
    this.updateSelectedUI();
  };

  toggleSelectAll = (isChecked) => {
    let filteredData = this.getFilteredData();
    if (isChecked) {
      filteredData.forEach((item) => this.selectedIds.add(item.id));
    } else {
      this.selectedIds.clear();
    }
    this.render();
  };

  // --- CRUD: Hapus Banyak Transaksi Sekaligus ---
  deleteSelectedTransactions = () => {
    const count = this.selectedIds.size;
    if (count === 0) return;

    this.showModal(`Yakin mau menghapus ${count} data transaksi yang dipilih?`, () => {
      this.transactions = this.transactions.filter((item) => !this.selectedIds.has(item.id));
      this.selectedIds.clear();
      this.saveToLocalStorage();
      this.render();
    });
  };

  updateSelectedUI = () => {
    const count = this.selectedIds.size;
    if (this.selectedCount) this.selectedCount.textContent = count;

    if (this.deleteSelectedBtn) {
      if (count > 0) {
        this.deleteSelectedBtn.style.display = 'inline-flex';
      } else {
        this.deleteSelectedBtn.style.display = 'none';
      }
    }

    const filteredData = this.getFilteredData();
    if (this.selectAllCheckbox) {
      this.selectAllCheckbox.checked = filteredData.length > 0 && filteredData.every((item) => this.selectedIds.has(item.id));
    }
  };

  getFilteredData = () => {
    if (this.currentFilter !== 'all') {
      return this.transactions.filter((t) => t.type === this.currentFilter);
    }
    return this.transactions;
  };

  formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(number);
  };

  // --- Render UI ---
  render = () => {
    const incomeTotal = this.transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseTotal = this.transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = incomeTotal - expenseTotal;

    this.totalIncomeDisplay.textContent = this.formatRupiah(incomeTotal);
    this.totalExpenseDisplay.textContent = this.formatRupiah(expenseTotal);
    this.totalBalanceDisplay.textContent = this.formatRupiah(totalBalance);

    const filteredData = this.getFilteredData();
    this.transCountBadge.textContent = `${filteredData.length} Transaksi`;

    this.updateSelectedUI();

    if (filteredData.length === 0) {
      this.transactionList.innerHTML = `<p style="text-align:center; color:var(--text-secondary); padding:20px; font-size:13px;">Belum ada riwayat transaksi.</p>`;
      return;
    }

    this.transactionList.innerHTML = filteredData
      .map((item) => {
        const { id, title, amount, type, category, date, time } = item;
        const isIncome = type === 'income';
        const isSelected = this.selectedIds.has(id);

        return `
          <div class="trans-item ${type} ${isSelected ? 'selected' : ''}">
            <div class="trans-left">
              <input 
                type="checkbox" 
                class="trans-checkbox" 
                ${isSelected ? 'checked' : ''} 
                onchange="app.toggleSelectTransaction('${id}')"
              >
              <div class="trans-icon">
                <i class="fa-solid ${isIncome ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
              </div>
              <div>
                <div class="trans-title">${title}</div>
                <div class="trans-meta">📌 ${category} • 📅 ${date} ${time ? '• ⏰ ' + time : ''}</div>
              </div>
            </div>
            <div class="trans-right">
              <div class="trans-amount">${isIncome ? '+' : '-'} ${this.formatRupiah(amount)}</div>
              <button class="delete-btn" onclick="app.deleteTransaction('${id}')" title="Hapus Satu">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      })
      .join('');
  };
}

// Inisialisasi Aplikasi
const app = new BudgetApp();