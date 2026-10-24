// ==========================================
// 2. DESTRUCTURING & OPERATORS
// ==========================================

// - Destructure object dengan nested properties minimal 3 level
const company = {
  name: "Tech Corp",
  department: {
    engineering: {
      lead: "Amel",
      teamSize: 12
    }
  }
};

const { department: { engineering: { lead, teamSize } } } = company;
console.log(`1. Nested Destructuring -> Lead: ${lead}, Team Size: ${teamSize}`);

// - Buat function yang menerima rest parameters dan mengembalikan statistik (min, max, average)
const getStats = (...numbers) => {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = sum / numbers.length;
  
  return { min, max, average };
};
console.log("2. Stats Calculation:", getStats(10, 20, 30, 40, 50));

// - Merge 3 objects dengan spread operator dan override beberapa properties
const defaultConfig = { theme: "light", lang: "en", sidebar: true };
const userConfig = { theme: "dark", lang: "id" };
const adminConfig = { sidebar: false };

const finalConfig = { ...defaultConfig, ...userConfig, ...adminConfig, theme: "sage" };
console.log("3. Merged Object Config:", finalConfig);

// - Gunakan destructuring dalam loop for...of
const students = [
  { id: 1, name: "Amel", score: 95 },
  { id: 2, name: "Budi", score: 88 }
];

console.log("4. Loop Destructuring:");
for (const { name, score } of students) {
  console.log(`- Siswa ${name} meraih nilai ${score}`);
}