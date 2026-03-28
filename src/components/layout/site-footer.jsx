import Link from "next/link";
import { Container } from "@/components/layout/container";

const groups = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All products" },
      { href: "/products?category=dress", label: "Dresses" },
      { href: "/products?category=tops", label: "Tops" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "#", label: "Shipping" },
      { href: "#", label: "Returns" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-100/50">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg text-stone-900">
              Maaleen
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-600">
              Curated dresses and wardrobe pieces with calm, modern tailoring.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              Newsletter coming soon — stay tuned.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {g.title}
              </p>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-stone-600 transition-colors hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-stone-200 pt-8 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} Maaleen. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
