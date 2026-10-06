import { CollectionsMosaic } from "@/components/collections/collections-mosaic";
import { CollectionsMobileSlider } from "@/components/collections/collections-mobile-slider";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { HOME_COLLECTION_ITEMS } from "@/data/home-collection-slides";

export const metadata = {
  title: "Collections",
  description:
    "Explore Maaleen edits — evening silhouettes, outer layers, everyday tops, tailored bottoms, and more.",
};

export default function CollectionsPage() {
  const items = HOME_COLLECTION_ITEMS;

  return (
    <div className="border-b border-stone-200 bg-[var(--surface)]">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            See What&apos;s New
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Collection
          </h1>
          <div className="mt-5 flex justify-center">
            <Breadcrumbs
              items={[
                { href: "/", label: "Home" },
                { href: "/collections", label: "Collections", current: true },
              ]}
            />
          </div>
        </div>
        <div
          aria-hidden
          className="mt-6 w-screen max-w-none border-b border-stone-200 sm:mt-10 ml-[calc(50%-50vw)]"
        />

        <CollectionsMobileSlider items={items} />

        <CollectionsMosaic items={items} className="mt-12" />
      </Container>
    </div>
  );
}
