import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-stone-900">
        This piece is unavailable
      </h1>
      <p className="mt-3 text-sm text-stone-600">
        The product may have been removed or the link is incorrect.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        Back to shop
      </Link>
    </div>
  );
}
