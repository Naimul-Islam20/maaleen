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
    eyebrow: "New season",
    title: "Quiet luxury for every day",
    description:
      "Thoughtfully cut dresses and layers — designed to move with you from morning light to evening plans.",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1920&q=85",
    imageAlt: "",
    primaryHref: "/shop",
    primaryLabel: "Shop collection",
    secondaryHref: buildShopEditHref("evening-silhouettes"),
    secondaryLabel: "View dresses",
  },
  {
    id: "2",
    eyebrow: "Outer layers",
    title: "Trans-seasonal trenches & coats",
    description:
      "Lightweight shells and wool blends that polish any outfit without weighing you down.",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1920&q=85",
    imageAlt: "",
    primaryHref: buildShopEditHref("outer-layers"),
    primaryLabel: "Shop outerwear",
    secondaryHref: buildShopEditHref("full-edit"),
    secondaryLabel: "Full collection",
  },
  {
    id: "3",
    eyebrow: "Just in",
    title: "Fresh silhouettes for the city",
    description:
      "New arrivals in refined fabrics — limited runs, curated for the Maaleen wardrobe.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1920&q=85",
    imageAlt: "",
    primaryHref: buildShopEditHref("new-arrivals"),
    primaryLabel: "New arrivals",
    secondaryHref: "/cart",
    secondaryLabel: "Your bag",
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir) => {
    setIndex((i) => {
      const n = SLIDES.length;
      if (dir === "next") return (i + 1) % n;
      return (i - 1 + n) % n;
    });
  }, []);

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
        <div
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >{`Slide ${index + 1} of ${SLIDES.length}: ${slide.title}`}</div>

        {/* Full-bleed background images */}
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
            {/* Readability scrim */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-stone-950/35 via-stone-950/50 to-stone-950/70"
              aria-hidden
            />
          </div>
        ))}

        {/* Content inside site container */}
        <Container className="relative z-10 flex h-full flex-col items-center justify-center py-10 text-center sm:py-14 lg:py-16">
          <div className="mx-auto w-full max-w-3xl px-2 sm:max-w-4xl sm:px-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              {slide.eyebrow}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-balance text-white sm:mt-4 sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mx-auto mt-3 min-h-[3rem] max-w-3xl text-sm leading-relaxed text-balance text-stone-200 sm:mt-6 sm:min-h-[3.5rem] sm:max-w-4xl sm:text-base">
              {slide.description}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
              <Link
                href={slide.primaryHref}
                className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {slide.primaryLabel}
              </Link>
              <Link
                href={slide.secondaryHref}
                className="inline-flex rounded-full border border-white/45 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {slide.secondaryLabel}
              </Link>
            </div>
          </div>
        </Container>

        {/* Pagination inside image */}
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

      {/* Slider arrows below image, centered */}
      <Container className="pb-4 sm:pb-5">
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:mt-5">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go("prev")}
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span aria-hidden className="text-2xl leading-none">
              ‹
            </span>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go("next")}
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden className="text-2xl leading-none">
              ›
            </span>
          </button>
        </div>
      </Container>
    </div>
  );
}
