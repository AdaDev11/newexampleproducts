import { makeAutoObservable } from "mobx";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
}

class ProductStore {
  products: Product[] = [];
  isLoading = false;
  totalProducts = 0;
  limit = 4;
  skip = 0;
  searchQuery = "";
  selectedCategory = "";

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProducts() {
    this.isLoading = true;
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${this.limit}&skip=${this.skip}&select=title,price,description,category,images`
      );
      this.products = response.data.products;
      this.totalProducts = response.data.total;
    } catch (error) {
      console.error("Mahsulotlarni yuklashda xatolik:", error);
    } finally {
      this.isLoading = false;
    }
  }

  setPage(page: number) {
    this.skip = (page - 1) * this.limit;
    this.fetchProducts();
  }

}

const productStore = new ProductStore();
export default productStore;
