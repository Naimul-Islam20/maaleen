function sizeChipClass(selected, compact = false) {
  if (compact) {
    return `inline-flex min-h-8 min-w-0 flex-1 items-center justify-center rounded-lg border px-1 py-1.5 text-[11px] font-medium transition-colors sm:min-h-10 sm:min-w-10 sm:flex-none sm:px-3 sm:py-2 sm:text-sm ${
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
    ? `flex flex-nowrap gap-1 sm:flex-wrap sm:gap-2 ${showLegend ? "mt-2" : ""}`
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
