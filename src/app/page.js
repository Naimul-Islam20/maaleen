import Link from "next/link";
import { CollectionsSection } from "@/components/home/collections-section";
import { HeroSlider } from "@/components/home/hero-slider";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import {
  getFeaturedProducts,
  getNewArrivals,
} from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals(4);

  return (
    <div>
      <section className="border-b border-stone-200">
        <HeroSlider />
      </section>

      <CollectionsSection />

      <section>
        <Container className="py-14 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-stone-900 sm:text-3xl">
              Featured
            </h2>
            <Link
              href="/shop"
              className="text-sm font-medium text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              See all
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-stone-200 bg-stone-100/40">
        <Container className="py-14 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-stone-900 sm:text-3xl">
              New arrivals
            </h2>
            <Link
              href="/shop"
              className="text-sm font-medium text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Shop new
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
