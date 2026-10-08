"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";

const LINKS = [
  { href: "/exchange-refund", label: "Exchange & Refund" },
  { href: "/return-policy", label: "Return Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/faqs", label: "FAQs" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export function InfoPage({ title, children }) {
  const pathname = usePathname();

  return (
    <section className="w-full py-10 sm:py-14 lg:py-16">
      <Container>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-400">
          <Link href="/" className="transition hover:text-stone-700">
            Home
          </Link>
          <span className="mx-1.5">›</span>
          <span>Information</span>
          <span className="mx-1.5">›</span>
          <span className="text-stone-500">{title}</span>
        </p>

        <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          {title}
        </h1>

        <nav
          aria-label="Information"
          className="-mx-3 mt-6 border-b border-stone-200 lg:hidden"
        >
          <ul className="flex gap-1 overflow-x-auto px-3 scrollbar-none">
            {LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block border-b-2 px-3 py-3 text-sm whitespace-nowrap transition ${
                      active
                        ? "border-[#370006] font-semibold text-stone-950"
                        : "border-transparent text-stone-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 grid items-start gap-8 lg:mt-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <nav
              aria-label="Information"
              className="rounded-2xl border border-stone-200/80 bg-white py-3 shadow-[0_10px_30px_rgba(55,0,6,0.04)]"
            >
              <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                Information
              </p>
              <ul>
                {LINKS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`block border-l-2 px-4 py-2.5 text-sm transition ${
                          active
                            ? "border-[#370006] font-semibold text-stone-950"
                            : "border-transparent text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 text-sm leading-relaxed text-stone-700 sm:text-base [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-stone-950 [&_li]:marker:text-[#370006]">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
