"use client";

import Link from "next/link";
import useEmblaAutoplay from "@/hooks/useEmblaAutoplay";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";

export function ProductsSliderSection({
  products,
  title = "Products",
  ctaLabel = "See all",
  ctaHref = "/shop",
  sectionClassName = "border-t border-stone-200 bg-[var(--surface)]",
}) {
  const { emblaRef, scrollPrev, scrollNext } = useEmblaAutoplay({
    slideCount: products.length,
    delay: 4000,
    autoplay: false,
    emblaOptions: {
      align: "start",
      dragFree: true,
      loop: true,
    },
  });

  if (!products.length) return null;

  return (
    <section className={sectionClassName}>
      <Container className="py-14 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-stone-900 sm:text-3xl">
            {title}
          </h2>
          <Link
            href={ctaHref}
            className="text-sm font-medium text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="mt-10 min-w-0">
          <div
            ref={emblaRef}
            className="maaleen-products-embla overflow-hidden py-1"
          >
            <div className="flex">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="maaleen-products-embla-slide shrink-0"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
            <button
              type="button"
              aria-label="Previous products"
              onClick={scrollPrev}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300 bg-[var(--surface-elevated)] text-stone-800 shadow-sm transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span aria-hidden className="text-xl leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={scrollNext}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300 bg-[var(--surface-elevated)] text-stone-800 shadow-sm transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span aria-hidden className="text-xl leading-none">
                ›
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
