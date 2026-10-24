// ==========================================
// 1. TEMPLATE LITERALS, SCOPE & ARROW FUNCTIONS
// ==========================================

// - Coba ubah nilai const dan lihat error yang muncul
const MAX_LIMIT = 100;
try {
  MAX_LIMIT = 200; // Uncaught TypeError: Assignment to constant variable.
} catch (error) {
  console.error("1. Error Const:", error.message);
}

// - Bandingkan behavior var di dalam dan luar block
if (true) {
  var varScoped = "Saya var (dapat diakses di luar block)";
  let letScoped = "Saya let (hanya ada di dalam block)";
}
console.log("2. Scope var:", varScoped); // Berhasil dipanggil
// console.log(letScoped); // Uncaught ReferenceError: letScoped is not defined

// - Buat arrow function dengan berbagai sintaks
const greeting = () => "Halo World!"; // Tanpa parameter
const square = x => x * x; // 1 parameter
const add = (a, b) => a + b; // Multi parameter
const multiplyAndLog = (a, b) => { // Multi-line dengan block
  const result = a * b;
  return `Hasil perkalian: ${result}`;
};

console.log("3. Arrow Functions:", greeting(), "| Square:", square(4), "| Add:", add(5, 3));

// - Gunakan template literals untuk membuat HTML string
const product = { name: "Laptop Gaming", price: 15000000 };
const productCardHTML = `
  <div class="card">
    <h2>${product.name}</h2>
    <p>Harga: Rp ${product.price.toLocaleString("id-ID")}</p>
  </div>
`;
console.log("4. Template Literals HTML String:\n", productCardHTML);