"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";

const groups = [
  {
    title: "Shop Maaleen",
    links: [
      { href: "/shop", label: "Shop All" },
      { href: "/collections", label: "Collections" },
      { href: "/shop?tag=new-arrivals", label: "New Arrivals" },
      { href: "/shop?tag=best-sellers", label: "Most Coveted" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { href: "/faqs", label: "Support & FAQs" },
      { href: "/shipping-policy", label: "Shipping Info" },
      { href: "/return-policy", label: "Return Policy" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Information",
    links: [
      { href: "/about-us", label: "Our Story" },
      { href: "/size-guide", label: "Size Guide" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
];

function TrustBadge({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="mb-3 text-white/90">{icon}</div>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
        {title}
      </h4>
      <p className="mt-1 text-[10px] text-white/60 tracking-wide uppercase">
        {description}
      </p>
    </div>
  );
}

function FloatingBackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--accent)] shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Back to top"
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

function FooterLogo() {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <span className="text-xl sm:text-2xl font-[family-name:var(--font-display)] tracking-tight">
        Maaleen
      </span>
    );
  }

  return (
    <Image
      src="/Maaleen-Logo-1.png"
      alt="Maaleen"
      width={320}
      height={100}
      className="h-16 w-auto object-contain brightness-0 invert sm:h-20"
      onError={() => setError(true)}
    />
  );
}

export function SiteFooter() {
  return (
    <>
      <FloatingBackToTop />
      <footer className="mt-8 bg-[var(--accent)] text-white">
        {/* Top Value Section — "The Smart Part" */}
        <div className="border-b border-white/10 py-6 sm:py-10">
          <Container>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <TrustBadge 
                title="Fast Shipping" 
                description="Across Bangladesh"
                icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <TrustBadge 
                title="Easy Exchange" 
                description="7 Days Window"
                icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3" /></svg>}
              />
              <TrustBadge 
                title="Cash on Delivery" 
                description="Available Nationwide"
                icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              />
              <TrustBadge 
                title="Premium Quality" 
                description="Tailored Perfection"
                icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
              />
            </div>
          </Container>
        </div>

        {/* Main Bar */}
        <Container className="pt-6 pb-2 sm:pt-12 sm:pb-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-[4.5fr_2.5fr_2.5fr_2.5fr]">
            {/* Brand & Join */}
            <div className="col-span-2 flex flex-col items-center lg:items-start lg:col-span-1">
              <Link href="/" className="inline-block">
                <FooterLogo />
              </Link>
              <p className="mt-4 max-w-md text-center lg:text-justify text-base leading-relaxed text-white/70">
                Curated dresses and wardrobe pieces with calm, modern tailoring. 
                Maaleen blends tradition with contemporary silhouettes for the discerning woman.
              </p>
              
              <div className="mt-6 flex flex-col w-full items-center lg:items-start transition-all">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white text-center lg:text-left">
                  Join the Maaleen Community
                </h3>
                <form 
                  className="mt-6 w-full max-w-sm"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="h-11 w-full border border-white/20 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/50"
                    />
                    <button
                      type="submit"
                      className="h-11 border border-white bg-white px-6 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)] transition-all hover:bg-transparent hover:text-white"
                    >
                      Join
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Navigation Links Sections */}
            {groups.map((group, idx) => (
              <div 
                key={group.title}
                className={idx === 2 ? "col-span-2 lg:col-span-1" : "col-span-1"}
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Base */}
          <div className="mt-6 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-6 lg:flex-row">
            <div>
              <p className="text-sm font-medium tracking-wider text-white/70">
                © {new Date().getFullYear()} Maaleen. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-6">
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 2.127h-.396c-2.36 0-2.687.01-3.603.052-.97.044-1.5.203-1.85.34a2.775 2.775 0 00-1.023.666 2.775 2.775 0 00-.667 1.023c-.135.35-.296.88-.34 1.85-.042.916-.052 1.243-.052 3.603v.396c0 2.36.01 2.687.052 3.603.044.97.203 1.5.34 1.85.132.343.326.638.667.93a2.775 2.775 0 001.023.667c.35.135.88.296 1.85.34.916.042 1.243.052 3.603.052h.396c2.36 0 2.687-.01 3.603-.052.97-.044 1.5-.203 1.85-.34.343-.132.638-.326.93-.667.31-.344.536-.677.667-1.023.135-.35.296-.88.34-1.85.042-.916.052-1.243.052-3.603v-.396c0-2.36-.01-2.687-.052-3.603-.044-.97-.203-1.5-.34-1.85a2.775 2.775 0 00-.667-1.023 2.775 2.775 0 00-1.023-.666c-.35-.135-.88-.296-1.85-.34-.916-.042-1.243-.052-3.603-.052zM12 7.765a4.235 4.235 0 100 8.47 4.235 4.235 0 000-8.47zm0 6.343a2.108 2.108 0 110-4.216 2.108 2.108 0 010 4.216zm6.118-6.903a1.102 1.102 0 11-2.203 0 1.102 1.102 0 012.203 0z" /></svg>
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="YouTube">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" /></svg>
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="TikTok">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V15.5c0 1.42-.45 2.79-1.31 3.89-1.98 2.6-5.4 3.65-8.47 2.65-3.07-1-5.11-3.8-5.11-7.04 0-3.24 2.04-6.04 5.11-7.04 1.62-.53 3.39-.44 4.93.26l.01 4.09c-1.3-.61-2.84-.66-4.18-.14-1.34.52-2.31 1.66-2.5 3.09-.19 1.43.34 2.87 1.43 3.84 1.09.97 2.58 1.27 3.96.79 1.38-.48 2.33-1.74 2.34-3.2l.01-16.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
