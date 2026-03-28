import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CartView } from "./cart-view";

export const metadata = {
  title: "Bag",
  description: "Review items in your Maaleen shopping bag.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/cart", label: "Bag", current: true },
        ]}
      />
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 sm:text-4xl">
        Your bag
      </h1>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
