import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Wishlist",
  description: "Saved pieces at Maaleen.",
};

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6 sm:py-24">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/wishlist", label: "Wishlist", current: true },
        ]}
      />
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl text-stone-900">
        Wishlist
      </h1>
      <p className="mt-3 text-sm text-stone-600">
        Save your favourite pieces here — wishlist sync is coming soon.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800"
      >
        Browse shop
      </Link>
    </div>
  );
}
