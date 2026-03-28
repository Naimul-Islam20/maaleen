import Link from "next/link";

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li
            key={`${i}-${item.label}-${item.href}`}
            className="flex items-center gap-2"
          >
            {i > 0 ? (
              <span className="text-stone-300" aria-hidden>
                /
              </span>
            ) : null}
            {item.current ? (
              <span className="font-medium text-stone-800" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
