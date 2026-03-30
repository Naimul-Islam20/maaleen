import Link from "next/link";
import { Container } from "@/components/layout/container";

const groups = [
  {
    title: "Company",
    links: [
      { href: "/about-us", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/size-guide", label: "Size Guide" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/shipping-policy", label: "Shipping Policy" },
      { href: "/return-policy", label: "Return Policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/20 bg-[var(--accent)] text-white">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl leading-none tracking-wide text-white">
              Maaleen
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
              Curated dresses and wardrobe pieces with calm, modern tailoring.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-white/65">
              Newsletter coming soon — stay tuned.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                {g.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-white/20 pt-8 text-center text-xs tracking-[0.08em] text-white/70">
          © {new Date().getFullYear()} Maaleen. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
