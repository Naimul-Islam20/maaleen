"use client";

import { useMemo } from "react";
import { CollectionColumn } from "@/components/collections/collection-column";
import { Container } from "@/components/layout/container";
import { HOME_COLLECTION_SLIDES } from "@/data/home-collection-slides";
import useEmblaAutoplay from "@/hooks/useEmblaAutoplay";

const SLIDES = HOME_COLLECTION_SLIDES;

export function CollectionsSection() {
  const panels = useMemo(() => {
    const list = [];
    for (const s of SLIDES) {
      list.push({ item: s.left, key: `l-${s.id}` });
      list.push({ item: s.right, key: `r-${s.id}` });
    }
    return list;
  }, []);

  const { emblaRef, scrollPrev, scrollNext } = useEmblaAutoplay({
    slideCount: panels.length,
    delay: 4000,
    autoplay: false,
    emblaOptions: {
      align: "start",
      dragFree: false,
      loop: true,
    },
  });

  if (!panels.length) return null;

  return (
    <section
      id="collections"
      className="border-b border-stone-200 bg-[var(--surface)]"
    >
      <Container className="py-10 sm:py-14">
        <h2 className="text-center font-[family-name:var(--font-display)] text-2xl text-stone-900 sm:text-3xl">
          Collections
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-stone-600 sm:text-base">
          One card per step — on small screens one shows; from tablet up, two
          show side by side while arrows move a single card.
        </p>

        <div className="mt-10 min-w-0">
          <div
            ref={emblaRef}
            className="maaleen-collections-embla overflow-hidden py-1"
          >
            <div className="flex">
              {panels.map((p, i) => (
                <div
                  key={p.key}
                  className="maaleen-collections-embla-slide shrink-0"
                >
                  <CollectionColumn
                    item={p.item}
                    priority={i === 0}
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
            <button
              type="button"
              aria-label="Previous collections"
              onClick={scrollPrev}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span aria-hidden className="text-2xl leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              aria-label="Next collections"
              onClick={scrollNext}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden className="text-2xl leading-none">
                ›
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
