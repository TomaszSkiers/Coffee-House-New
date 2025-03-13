import { API_URL } from '../constants';

export const fetchCategories = async ({ embedProducts, limitProducts } = {}) => {
  try {
    const url = new URL(`${API_URL}/categories`);

    if (embedProducts) {
      url.searchParams.set('_embed', 'products');
    }

    const response = await fetch(url);
    const data = await response.json();

    if (limitProducts) {
      return data.map((category) => ({
        ...category,
        products: category.products.slice(0, limitProducts),
      }));
    }
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchProducts = async ({ categoryId, limit } = {}) => {
  try {
    const url = new URL(`${API_URL}/products`);

    if (categoryId) {
      url.searchParams.set('categoryId', categoryId);
    }

    if (limit) {
      url.searchParams.set('_limit', limit);
    }

    url.searchParams.set('_expand', 'category');

    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const fetchProduct = async (id) => {
  try {
    const url = new URL(`${API_URL}/products/${id}`);

    url.searchParams.set('_expand', 'category');

    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
};
