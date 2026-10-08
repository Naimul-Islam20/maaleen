"use client";

import { LuBanknote, LuGlobe, LuPackageSearch, LuRefreshCcw, LuSmile } from "react-icons/lu";
import { Container } from "@/components/layout/container";
import useEmblaAutoplay from "@/hooks/useEmblaAutoplay";

const iconClass = "h-8 w-8 text-[#b5b5b5]";

const ITEMS = [
  { label: "Returns & Exchange", icon: LuRefreshCcw },
  { label: "Cash on Delivery", icon: LuBanknote },
  { label: "1,000+ Happy Customers", icon: LuSmile },
  { label: "Worldwide Shipping", icon: LuGlobe },
  { label: "Order Tracking System", icon: LuPackageSearch },
];

function PromiseCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 border border-[#e4e4e4] bg-white px-3 py-6 text-center sm:py-8">
      <Icon className={iconClass} strokeWidth={1.5} aria-hidden />
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#b0b0b0] sm:text-[11px]">
        {item.label}
      </p>
    </div>
  );
}

export function ServiceStrip() {
  const { emblaRef } = useEmblaAutoplay({
    slideCount: ITEMS.length,
    delay: 2800,
    emblaOptions: {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
  });

  return (
    <section aria-label="Store promises" className="bg-[var(--surface)]">
      <Container className="py-6 sm:py-8">
        <div className="overflow-hidden sm:hidden" ref={emblaRef}>
          <ul className="flex">
            {ITEMS.map((item) => (
              <li key={item.label} className="min-w-0 shrink-0 basis-1/2 pr-3">
                <PromiseCard item={item} />
              </li>
            ))}
          </ul>
        </div>

        <ul className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {ITEMS.map((item) => (
            <li key={item.label}>
              <PromiseCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
