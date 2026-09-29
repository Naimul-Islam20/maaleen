"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { buildShopEditHref } from "@/data/shop-edits";

const AUTO_MS = 6000;

const SLIDES = [
  {
    id: "1",
    title: "Quiet luxury for every day",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1920&q=85",
    imageAlt: "",
    shopHref: "/shop",
  },
  {
    id: "2",
    title: "Trans-seasonal trenches & coats",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1920&q=85",
    imageAlt: "",
    shopHref: buildShopEditHref("outer-layers"),
  },
  {
    id: "3",
    title: "Fresh silhouettes for the city",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1920&q=85",
    imageAlt: "",
    shopHref: buildShopEditHref("new-arrivals"),
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[28rem] w-full overflow-hidden sm:h-[34rem] lg:h-[40rem]">
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`Slide ${index + 1} of ${SLIDES.length}: ${slide.title}`}
        </div>

        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:duration-0 ${
              i === index ? "z-0 opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "low"}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-stone-950/15 to-transparent"
              aria-hidden
            />
          </div>
        ))}

        <Container className="relative z-10 flex h-full flex-col items-center justify-end pb-16 sm:pb-20 lg:pb-24">
          <Link
            href={slide.shopHref}
            className="inline-flex rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Shop now
          </Link>
        </Container>

        <div
          className="absolute inset-x-0 bottom-0 z-10 pb-6 sm:pb-8"
          role="tablist"
          aria-label="Hero slides"
        >
          <Container>
            <div className="flex justify-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}: ${s.title}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    i === index
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
