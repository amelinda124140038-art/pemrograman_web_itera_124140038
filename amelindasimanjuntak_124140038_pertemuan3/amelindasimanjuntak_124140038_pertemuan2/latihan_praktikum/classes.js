// ==========================================
// 3. CLASSES & OBJECT LITERALS
// ==========================================

class BaseProduct {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this._price = price;
  }

  get price() {
    return `Rp ${this._price.toLocaleString("id-ID")}`;
  }

  set price(newPrice) {
    if (newPrice < 0) throw new Error("Harga tidak valid!");
    this._price = newPrice;
  }
}

class DigitalProduct extends BaseProduct {
  constructor(id, name, price, downloadUrl) {
    super(id, name, price);
    this.downloadUrl = downloadUrl;
  }
}

class PhysicalProduct extends BaseProduct {
  constructor(id, name, price, weightKg) {
    super(id, name, price);
    this.weightKg = weightKg;
  }
}

const ebook = new DigitalProduct(1, "E-Book JS Next-Gen", 50000, "https://download.com/ebook");
console.log("3.1 Class & Getter/Setter:", ebook.name, "| Harga:", ebook.price);

const dynamicKey = "category_id";
const categoryObj = {
  name: "Elektronik",
  [dynamicKey]: 101
};
console.log("3.2 Computed Property Object:", categoryObj);

const configureServer = ({ host = "localhost", port = 8080, ssl = false } = {}) => {
  return `Server berjalan di ${ssl ? 'https' : 'http'}://${host}:${port}`;
};

console.log("3.3 Default + Destructuring Param:", configureServer({ port: 3000, ssl: true }));