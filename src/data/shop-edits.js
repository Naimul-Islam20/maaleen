/**
 * Collection edit slugs — URLs use /collections/[slug]; label + filter live here.
 */
export const SHOP_EDITS = {
  "evening-silhouettes": { label: "Evening silhouettes", category: "dress" },
  "outer-layers": { label: "Outer layers", category: "outerwear" },
  "everyday-tops": { label: "Everyday tops", category: "tops" },
  "tailored-bottoms": { label: "Tailored bottoms", category: "bottoms" },
  "new-arrivals": { label: "New arrivals", tag: "new" },
  "full-edit": { label: "The full edit" },
};

export function getShopEdit(slug) {
  if (!slug || typeof slug !== "string") return null;
  return SHOP_EDITS[slug] ?? null;
}

export function buildShopEditHref(slug) {
  return `/collections/${encodeURIComponent(slug)}`;
}

/** First path segment after /collections/ (not the index page). */
export function parseCollectionEditSlugFromPathname(pathname) {
  if (typeof pathname !== "string" || !pathname.startsWith("/collections/")) {
    return "";
  }
  const seg = pathname.slice("/collections/".length).split("/")[0] ?? "";
  if (!seg) return "";
  try {
    return decodeURIComponent(seg);
  } catch {
    return seg;
  }
}

/** PDP / footer: prefer /collections/[slug] when this category maps to one edit. */
export function shopHrefForCategory(categoryId) {
  const entry = Object.entries(SHOP_EDITS).find(
    ([, v]) => v.category === categoryId,
  );
  if (entry) return buildShopEditHref(entry[0]);
  return `/shop?category=${encodeURIComponent(categoryId)}`;
}
