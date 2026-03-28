import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CheckoutForm } from "./checkout-form";

export const metadata = {
  title: "Checkout",
  description: "Shipping and payment — preview checkout at Maaleen.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/cart", label: "Bag" },
          { href: "/checkout", label: "Checkout", current: true },
        ]}
      />
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900">
        Checkout
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        Preview flow — connect your API later for real orders.
      </p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
      <p className="mt-6 text-center text-sm">
        <Link href="/cart" className="text-[var(--accent)] hover:underline">
          ← Return to bag
        </Link>
      </p>
    </div>
  );
}
