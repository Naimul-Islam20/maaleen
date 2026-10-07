import Image from "next/image";

const DEFAULT_AUTH_IMAGE =
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&q=85";

export function AuthShell({
  children,
  imageSrc = DEFAULT_AUTH_IMAGE,
  imageAlt = "",
}) {
  return (
    <section className="flex w-full flex-1 flex-col bg-[var(--surface)]">
      <div className="maaleen-container grid min-h-[calc(100svh-11.5rem)] flex-1 lg:grid-cols-2">
        <div className="flex items-center justify-center bg-[var(--surface)] px-5 py-10 sm:px-10 sm:py-14 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <div className="relative hidden min-h-[calc(100svh-11.5rem)] bg-[var(--surface)] lg:block">
          <div className="absolute top-10 right-0 bottom-0 left-8 overflow-hidden bg-stone-200 xl:top-12 xl:left-12">
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
      </div>
    </section>
  );
}
