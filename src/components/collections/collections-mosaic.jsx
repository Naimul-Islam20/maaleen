import { CollectionColumn } from "@/components/collections/collection-column";

/**
 * Desktop mosaic:
 * [ big ] [ cat ] [ cat ]
 * [ big ] [ cat ] [ cat ]
 *         [ cat ] [ cat ]
 * Two large tiles stacked on the left. Six landscape category cards on the right.
 */
export function CollectionsMosaic({ items, className = "" }) {
  const left = items.slice(0, 2);
  const right = items.slice(2, 8);

  return (
    <div
      className={`hidden items-stretch gap-4 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] ${className}`}
    >
      <div className="grid h-full min-h-0 grid-rows-2 gap-4">
        {left.map((item, index) => (
          <CollectionColumn
            key={`${item.href}-l-${index}`}
            item={item}
            variant="tile"
            priority={index === 0}
            className="h-full min-h-0"
            sizes="40vw"
          />
        ))}
      </div>

      <div className="grid min-h-0 grid-cols-2 gap-4">
        {right.map((item, index) => (
          <CollectionColumn
            key={`${item.href}-r-${index}`}
            item={item}
            variant="tile"
            compact
            className="aspect-video min-h-0 w-full"
            sizes="240px"
          />
        ))}
      </div>
    </div>
  );
}
