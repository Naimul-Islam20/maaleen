"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { SIZE_MEASUREMENTS, sizeOptionLabel } from "@/lib/size-chart";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function QuickAddModal({ product, onClose }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const sizes = product.sizes ?? [];
  const image = product.images?.[0];
  const color = product.colors?.[0]?.name ?? "";
  const columns =
    product.category === "bottoms"
      ? [
          { key: "waist", label: "Waist" },
          { key: "hip", label: "Hip" },
          { key: "length", label: "Length" },
        ]
      : [
          { key: "bust", label: "Bust" },
          { key: "waist", label: "Waist" },
          { key: "length", label: "Length" },
        ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function handleAdd() {
    if (!size || !image) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      currency: product.currency,
      image,
      size,
      color,
      quantity,
    });
    showToast(`${product.name} added to your bag`);
    onClose();
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close choose size"
        className="absolute inset-0 bg-black/55"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-add-title"
        className="relative z-10 flex max-h-[min(88dvh,44rem)] w-full max-w-[24rem] flex-col overflow-hidden rounded-md bg-white shadow-2xl"
      >
        <div className="relative bg-[var(--primary)] px-12 py-3 text-center text-white">
          <h2 id="quick-add-title" className="text-base font-semibold">
            Choose Size
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-5 pt-5">
          <div className="relative mx-auto h-40 w-32 overflow-hidden rounded-md bg-stone-100">
            <ImageWithFallback
              src={image}
              alt={product.name}
              sizes="128px"
              imageClassName="object-cover"
              fallbackClassName="flex h-full w-full items-center justify-center bg-stone-100 text-stone-400"
              fallbackLabelClassName="text-[10px] font-semibold uppercase tracking-[0.16em]"
            />
          </div>
          <p className="mt-3 text-center text-sm text-stone-800">{product.name}</p>
          <button
            type="button"
            onClick={() => setGuideOpen((open) => !open)}
            aria-expanded={guideOpen}
            className="mx-auto mt-2 block text-sm text-stone-500 underline underline-offset-2"
          >
            Size Guide
          </button>

          {guideOpen ? (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-stone-100 text-stone-700">
                    <th className="border border-stone-200 px-2 py-1.5 font-semibold">
                      Size
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="border border-stone-200 px-2 py-1.5 font-semibold"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((option) => {
                    const row = SIZE_MEASUREMENTS[option];
                    if (!row) return null;
                    return (
                      <tr key={option}>
                        <td className="border border-stone-200 px-2 py-1.5">
                          {option}
                        </td>
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className="border border-stone-200 px-2 py-1.5"
                          >
                            {row[column.key]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}

          <div className="mt-4 border-t border-stone-200 pt-4">
            <p className="text-center text-sm text-stone-800">Choose Size</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {sizes.map((option) => {
                const selected = size === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-pressed={selected}
                    className={`min-w-[4.5rem] border px-3 py-2 text-sm text-stone-800 ${
                      selected
                        ? "border-[var(--primary)] bg-[var(--background)]"
                        : "border-stone-300 bg-white hover:border-stone-500"
                    }`}
                  >
                    {sizeOptionLabel(option, product.category)}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-stone-800">Choose Quantity</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="inline-flex h-9 w-9 items-center justify-center border border-stone-300 text-lg leading-none text-stone-700"
            >
              −
            </button>
            <span className="min-w-6 text-center text-sm text-stone-900">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((current) => Math.min(10, current + 1))}
              className="inline-flex h-9 w-9 items-center justify-center border border-stone-300 text-lg leading-none text-stone-700"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!size}
            className="mt-5 w-full bg-[var(--primary)] py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
