import Image from "next/image";
import Link from "next/link";

export function CollectionColumn({
  item,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}) {
  return (
    <div className="group relative flex min-h-[22rem] flex-col items-center justify-center overflow-hidden rounded-xl sm:min-h-[26rem] lg:min-h-[28rem]">
      <Image
        src={item.image}
        alt=""
        fill
        className="object-cover transition-[filter] duration-300 ease-out group-hover:brightness-105 motion-reduce:transition-none"
        sizes={sizes}
        priority={priority}
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
          className="mt-8 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
}
