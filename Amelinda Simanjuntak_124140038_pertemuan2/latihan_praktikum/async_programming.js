// ==========================================
// 5. ASYNC PROGRAMMING & API CALLS
// ==========================================

const fetchCombinedData = async () => {
  try {
    const [postsRes, usersRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=2"),
      fetch("https://jsonplaceholder.typicode.com/users?_limit=2")
    ]);
    const posts = await postsRes.json();
    const users = await usersRes.json();
    return { posts, users };
  } catch (error) {
    console.error("Combined Fetch Error:", error);
  }
};

const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(`Gagal fetch. Mencoba kembali dalam ${delay}ms... (Sisa retry: ${retries})`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
};

class AsyncController {
  constructor() {
    this.isLoading = false;
    this.debounceTimer = null;
  }

  setLoading(status) {
    this.isLoading = status;
    console.log(status ? "[UI] Loading... ⏳" : "[UI] Done");
  }

  async asyncErrorBoundary(asyncFn) {
    try {
      this.setLoading(true);
      await asyncFn();
    } catch (error) {
      console.error("[Async Error Boundary Caught]:", error.message);
    } finally {
      this.setLoading(false);
    }
  }

  async fetchPage(page = 1, limit = 3) {
    return this.asyncErrorBoundary(async () => {
      const data = await fetchWithRetry(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
      console.log(`[5.1 Pagination Data Halaman ${page}]:`, data);
    });
  }

  debouncedSearch(query, delay = 500) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.asyncErrorBoundary(async () => {
        console.log(`[5.2 Debounce Search] Mencari keyword: "${query}"...`);
        const results = await fetchWithRetry(`https://jsonplaceholder.typicode.com/posts?q=${query}`);
        console.log(`[5.2 Hasil Pencarian]: Ditemukan ${results.length} data.`);
      });
    }, delay);
  }
}

// Inisialisasi
const asyncController = new AsyncController();
fetchCombinedData().then(res => console.log("5.0 Fetch Combined Result:", res));
asyncController.fetchPage(1);
asyncController.debouncedSearch("kasku daily");