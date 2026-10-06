import { CollectionColumn } from "@/components/collections/collection-column";

/**
 * Desktop mosaic:
 * [ featured ] [ a ] [ b ]
 * [ featured ] [ c ] [ d ]
 * [ e ] [ f ]
 */
export function CollectionsMosaic({ items, className = "" }) {
  const [featured, ...rest] = items;
  const [a, b, c, d, e, f] = rest;

  return (
    <div
      className={`hidden grid-cols-4 grid-rows-3 gap-4 lg:grid lg:h-[min(90vw,58rem)] ${className}`}
    >
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
  );
}
