export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await result.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const products = await result.json();
  return products;
}

export async function getProductById(id) {
  const result = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const product = await result.json();
  return product;
}
