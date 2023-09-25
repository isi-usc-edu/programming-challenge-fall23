const API_URL = "https://dummyjson.com/products";

export const ProductsAPI = {
  getAllProducts: async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
		return data;
  },
	searchProducts: async (query) => {
		const response = await fetch(`${API_URL}/search?q=${query}`);
		const data = await response.json();
		return data;
	}
};
