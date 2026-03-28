import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

export function getProducts() {
  return productsData;
}

export function getCategories() {
  return categoriesData;
}

export function getProductBySlug(slug) {
  return productsData.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProducts() {
  return productsData.filter((p) => p.tags?.includes("featured"));
}

export function getNewArrivals(limit = 4) {
  return productsData.filter((p) => p.tags?.includes("new")).slice(0, limit);
}

export function getRelatedProducts(slug, limit = 4) {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return productsData
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, limit);
}

export function getCategoryLabel(categoryId) {
  const c = categoriesData.find((x) => x.id === categoryId);
  return c?.label ?? categoryId;
}
