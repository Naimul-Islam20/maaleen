import Image from "next/image";

const DEFAULT_AUTH_IMAGE =
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&q=85";

/** Shared viewport fill so login & signup keep the same shell height. */
const AUTH_SHELL_MIN_H = "min-h-[calc(100svh-9rem)]";

export function AuthShell({
  children,
  imageSrc = DEFAULT_AUTH_IMAGE,
  imageAlt = "",
}) {
  return (
    <section
      className={`flex w-full flex-1 flex-col bg-[var(--surface)] ${AUTH_SHELL_MIN_H}`}
    >
      <div className={`grid flex-1 items-stretch lg:grid-cols-2 ${AUTH_SHELL_MIN_H}`}>
        <div className="flex items-center justify-center bg-[var(--surface)] px-5 py-10 sm:px-10 sm:py-14 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <div
          className={`relative hidden overflow-hidden bg-stone-200 lg:block ${AUTH_SHELL_MIN_H}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
