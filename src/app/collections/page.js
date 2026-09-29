import { CollectionColumn } from "@/components/collections/collection-column";
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
  const [featured, ...rest] = items;
  const [a, b, c, d, e, f] = rest;

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

        {/*
          Desktop (reference):
          [ featured ] [ a ] [ b ]
          [ featured ] [ c ] [ d ]
          [ e ] [ f ]
        */}
        <div className="mt-12 hidden grid-cols-4 grid-rows-3 gap-4 lg:grid lg:h-[min(90vw,58rem)]">
          {featured ? (
            <CollectionColumn
              item={featured}
              variant="tile"
              priority
              className="col-span-2 row-span-2 h-full min-h-0"
              sizes="50vw"
            />
          ) : null}

          {[
            { item: a, className: "col-start-3 row-start-1" },
            { item: b, className: "col-start-4 row-start-1" },
            { item: c, className: "col-start-3 row-start-2" },
            { item: d, className: "col-start-4 row-start-2" },
            { item: e, className: "col-start-1 row-start-3" },
            { item: f, className: "col-start-2 row-start-3" },
          ]
            .filter((entry) => entry.item)
            .map((entry, index) => (
              <CollectionColumn
                key={`${entry.item.href}-d-${index}`}
                item={entry.item}
                variant="tile"
                className={`h-full min-h-0 ${entry.className}`}
                sizes="25vw"
              />
            ))}
        </div>
      </Container>
    </div>
  );
}
