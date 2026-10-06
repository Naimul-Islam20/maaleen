import Link from "next/link";
import { CollectionsMosaic } from "@/components/collections/collections-mosaic";
import { CollectionsMobileSlider } from "@/components/collections/collections-mobile-slider";
import { Container } from "@/components/layout/container";
import { HOME_COLLECTION_ITEMS } from "@/data/home-collection-slides";

export function CollectionsSection() {
  if (!HOME_COLLECTION_ITEMS.length) return null;

  return (
    <section
      id="collections"
      className="border-b border-stone-200 bg-[var(--surface)]"
    >
      <Container className="py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-stone-900 sm:text-3xl">
            Collections
          </h2>
          <Link
            href="/collections"
            className="shrink-0 text-sm font-medium text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            See all
          </Link>
        </div>

        {/* Mobile + tablet: one landscape card, side peeks */}
        <CollectionsMobileSlider items={HOME_COLLECTION_ITEMS} />

        <CollectionsMosaic items={HOME_COLLECTION_ITEMS} className="mt-10" />
      </Container>
    </section>
  );
}
