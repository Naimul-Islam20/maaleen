import { permanentRedirect } from "next/navigation";

/** Legacy `/products/[slug]` → `/shop/[slug]`. */
export default async function ProductLegacyRedirect({ params }) {
  const { slug } = await params;
  permanentRedirect(`/shop/${slug}`);
}
