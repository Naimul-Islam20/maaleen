function sizeChipClass(selected, compact = false) {
  if (compact) {
    return `inline-flex h-7 shrink-0 items-center justify-center rounded-md border px-2 text-xs font-medium leading-none transition-colors ${
      selected
        ? "border-stone-900 bg-stone-900 text-white"
        : "border-stone-200 bg-[var(--surface-elevated)] text-stone-800"
    }`;
  }

  return `inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
    selected
      ? "border-stone-900 bg-stone-900 text-white"
      : "border-stone-200 bg-[var(--surface-elevated)] text-stone-800"
  }`;
}

export function ProductSizeOptions({
  product,
  selectedSize = "",
  onSelectSize,
  showLegend = true,
  interactive = false,
  compact = false,
}) {
  const sizes = product.sizes ?? [];
  if (sizes.length === 0) return null;

  const rowClass = compact
    ? `flex w-full flex-nowrap justify-center gap-1.5 ${showLegend ? "mt-2" : ""}`
    : `flex flex-wrap gap-2 ${showLegend ? "mt-2" : ""}`;

  return (
    <div>
      {showLegend ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Size
        </p>
      ) : null}
      <div className={rowClass}>
        {sizes.map((size) => {
          const selected = selectedSize === size;
          const className = sizeChipClass(selected, compact);

          if (interactive && onSelectSize) {
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSelectSize(size)}
                className={`${className} hover:border-stone-400`}
              >
                {size}
              </button>
            );
          }

          return (
            <span key={size} className={className}>
              {size}
            </span>
          );
        })}
      </div>
    </div>
  );
}
