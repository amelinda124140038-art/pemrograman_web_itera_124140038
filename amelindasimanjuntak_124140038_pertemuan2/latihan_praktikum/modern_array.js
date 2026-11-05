// ==========================================
// 4. MODERN ARRAY METHODS
// ==========================================

const transactions = [
  { id: 1, type: "income", category: "Uang Saku", amount: 500000 },
  { id: 2, type: "expense", category: "Makan", amount: 25000 },
  { id: 3, type: "expense", category: "Makan", amount: 15000 },
  { id: 4, type: "income", category: "Bonus", amount: 100000 }
];

// - Implementasi fungsi groupBy menggunakan reduce()
const groupBy = (array, key) => {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
};
console.log("1. Grouped By Category:", groupBy(transactions, "category"));

// - Buat fungsi untuk menghitung rata-rata dari array of objects
const calcAverage = (arr, key) => arr.reduce((sum, obj) => sum + obj[key], 0) / arr.length;
console.log("2. Rata-rata nominal transaksi:", calcAverage(transactions, "amount"));

// - Transform struktur array bersarang menjadi struktur flat
const nestedData = [[1, 2], [3, [4, 5]], 6];
const flatData = nestedData.flat(2);
console.log("3. Flat Array:", flatData);

// - Gabungkan filter, map, dan reduce untuk analisis data kompleks
const totalExpenseAmount = transactions
  .filter(t => t.type === "expense")
  .map(t => t.amount)
  .reduce((sum, amount) => sum + amount, 0);

console.log("4. Total Pengeluaran (Filter -> Map -> Reduce):", totalExpenseAmount);