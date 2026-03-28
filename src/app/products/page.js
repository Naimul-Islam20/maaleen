import { redirect } from "next/navigation";
import { getShopEdit } from "@/data/shop-edits";

function appendQueryFromSearchParams(sp) {
  const q = new URLSearchParams();
  if (!sp || typeof sp !== "object") return q;
  for (const [key, value] of Object.entries(sp)) {
    if (value === undefined || value === null) continue;
    const v = Array.isArray(value) ? value[0] : value;
    if (typeof v === "string" && v !== "") q.set(key, v);
  }
  return q;
}

/** Legacy `/products` → `/shop` (same query except valid `edit` → collections). */
export default async function ProductsListingRedirect({ searchParams }) {
  const sp = await searchParams;
  const raw = sp?.edit;
  const editParam =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : "";
  const trimmed = editParam?.trim() ?? "";
  if (trimmed && getShopEdit(trimmed)) {
    redirect(`/collections/${encodeURIComponent(trimmed)}`);
  }

  const q = appendQueryFromSearchParams(sp);
  const s = q.toString();
  redirect(s ? `/shop?${s}` : "/shop");
}
