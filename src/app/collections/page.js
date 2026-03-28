import { CollectionColumn } from "@/components/collections/collection-column";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { HOME_COLLECTION_SLIDES } from "@/data/home-collection-slides";

export const metadata = {
  title: "Collections",
  description:
    "Explore Maaleen edits — evening silhouettes, outer layers, everyday tops, tailored bottoms, and more.",
};

export default function CollectionsPage() {
  return (
    <div className="border-b border-stone-200 bg-[var(--surface)]">
      <Container className="py-10 sm:py-14 lg:py-16">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/collections", label: "Collections", current: true },
          ]}
        />
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 sm:text-4xl">
          Collections
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
          The same edits as on the home carousel — every pairing in one place.
        </p>

        <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12 lg:space-y-14">
          {HOME_COLLECTION_SLIDES.map((slide, slideIdx) => (
            <div
              key={slide.id}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
            >
              <CollectionColumn
                item={slide.left}
                priority={slideIdx === 0}
              />
              <CollectionColumn item={slide.right} priority={false} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
