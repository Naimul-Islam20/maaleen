"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

export function CollectionColumn({
  item,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  variant = "panel",
  compact = false,
  className = "",
}) {
  if (variant === "tile") {
    return (
      <Link
        href={item.href}
        className={`group relative block min-h-0 overflow-hidden rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${className}`}
      >
        <ImageWithFallback
          src={item.image}
          alt=""
          imageClassName="object-cover"
          sizes={sizes}
          priority={priority}
          fallbackClassName="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-300 text-stone-600"
          fallbackLabelClassName="font-[family-name:var(--font-display)] text-2xl tracking-[0.18em] sm:text-3xl"
          fallbackSubLabel="image coming soon"
          fallbackSubLabelClassName="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/25 to-transparent"
          aria-hidden
        />
        <div
          className={
            compact
              ? "absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4"
              : "absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 lg:p-6"
          }
        >
          <h3
            className={
              compact
                ? "font-[family-name:var(--font-display)] text-lg tracking-tight text-white sm:text-xl"
                : "font-[family-name:var(--font-display)] text-xl tracking-tight text-white sm:text-2xl lg:text-[1.65rem]"
            }
          >
            {item.title}
          </h3>
          {item.description ? (
            <p
              className={
                compact
                  ? "mt-0.5 line-clamp-1 text-xs leading-relaxed text-white/80"
                  : "mt-1 line-clamp-2 text-xs leading-relaxed text-white/80 sm:text-sm"
              }
            >
              {item.description}
            </p>
          ) : null}
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`group relative flex min-h-[22rem] flex-col items-center justify-center overflow-hidden rounded-xl sm:min-h-[26rem] lg:min-h-[28rem] ${className}`}
    >
      <ImageWithFallback
        src={item.image}
        alt=""
        imageClassName="object-cover transition-[filter] duration-300 ease-out group-hover:brightness-105 motion-reduce:transition-none"
        sizes={sizes}
        priority={priority}
        fallbackClassName="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-300 text-stone-600"
        fallbackLabelClassName="font-[family-name:var(--font-display)] text-3xl tracking-[0.18em] sm:text-4xl"
        fallbackSubLabel="image coming soon"
        fallbackSubLabelClassName="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500 sm:text-xs"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/45 to-stone-950/25"
        aria-hidden
      />
      <div className="relative z-10 flex max-w-sm flex-col items-center px-6 py-10 text-center">
        <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-white sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-stone-200 sm:text-base">
          {item.description}
        </p>
        <Link
          href={item.href}
          className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
}
