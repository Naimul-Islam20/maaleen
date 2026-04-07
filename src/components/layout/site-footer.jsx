"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";

const groups = [
  {
    title: "INFORMATION",
    links: [
      { href: "/exchange-refund", label: "Exchange & Refund (এক্সচেঞ্জ ও রিফান্ড নীতিমালা)" },
      { href: "/size-guide", label: "Size Guide (সাইজ চার্ট)" },
      { href: "/return-policy", label: "Return Policy (রিটার্ন নীতিমালা)" },
      { href: "/shipping-policy", label: "Shipping Policy (শিপিং নীতিমালা)" },
      { href: "/faqs", label: "FAQs (প্রায়শই জিজ্ঞাসিত প্রশ্ন)" },
      { href: "/privacy-policy", label: "Privacy Policy (গোপনীয়তা নীতি)" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { href: "/about-us", label: "About Us (আমাদের সম্পর্কে)" },
      { href: "/contact", label: "Contact (যোগাযোগ)" },
      { href: "/terms-conditions", label: "Terms & Conditions (শর্তাবলি)" },
    ],
  },
  {
    title: "SERVICE CENTER",
    links: [
      { href: "mailto:support@maaleen.store", label: "support@maaleen.store" },
      { href: "tel:+8801786493740", label: "+88017 86 493 740" },
      { href: "#", label: "TRAD/CHTG/010466/2023", isText: true },
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
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-6 sm:bottom-8 sm:right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--accent)] shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
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
    <footer className="mt-16 bg-[var(--accent)] pt-16 pb-9 text-[var(--secondary)] sm:pt-16 sm:pb-8">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* INFORMATION */}
          <div>
            <h3 className="mb-8 text-base font-bold uppercase tracking-[0.2em] text-white">INFORMATION</h3>
            <ul className="space-y-3">
              {[
                { href: "/exchange-refund", label: "Exchange & Refund", bn: "(এক্সচেঞ্জ ও রিফান্ড নীতিমালা)" },
                { href: "/size-guide", label: "Size Guide", bn: "(সাইজ চার্ট)" },
                { href: "/return-policy", label: "Return Policy", bn: "(রিটার্ন নীতিমালা)" },
                { href: "/shipping-policy", label: "Shipping Policy", bn: "(শিপিং নীতিমালা)" },
                { href: "/faqs", label: "FAQs", bn: "(প্রায়শই জিজ্ঞাসিত প্রশ্ন)" },
                { href: "/privacy-policy", label: "Privacy Policy", bn: "(গোপনীয়তা নীতি)" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="group block text-sm transition-colors">
                    <div className="text-[15.5px] font-bold">{item.label}</div>
                    <div className="text-[12.5px] opacity-70 transition-opacity group-hover:opacity-100">{item.bn}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="mb-8 text-base font-bold uppercase tracking-[0.2em] text-white">COMPANY</h3>
            <ul className="space-y-3">
              {[
                { href: "/about-us", label: "About Us", bn: "(আমাদের সম্পর্কে)" },
                { href: "/contact", label: "Contact", bn: "(যোগাযোগ)" },
                { href: "/terms-conditions", label: "Terms & Conditions", bn: "(শর্তাবলি)" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="group block text-sm transition-colors">
                    <div className="text-[15.5px] font-bold">{item.label}</div>
                    <div className="text-[12.5px] opacity-70 transition-opacity group-hover:opacity-100">{item.bn}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICE CENTER & FIND US ON */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-12">
              <h3 className="mb-8 text-base font-bold uppercase tracking-[0.2em] text-white">SERVICE CENTER</h3>
              <div className="space-y-5 text-[15.5px] font-bold">
                <div>
                  <a href="mailto:support@maaleen.store" className="hover:underline">
                    support@maaleen.store
                  </a>
                </div>
                <div>
                  <a href="tel:+8801786493740" className="hover:underline">
                    +88017 86 493 740
                  </a>
                </div>
                <div className="mt-8 text-sm font-mono opacity-70">
                  TRAD/CHTG/010466/2023
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-base font-bold uppercase tracking-[0.2em] text-white">FIND US ON</h3>
              <div className="flex items-center gap-6">
                <a href="#" className="transition-all hover:opacity-80" style={{ color: "var(--secondary)" }} aria-label="Social Link">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
                <a href="#" className="transition-all hover:opacity-80" style={{ color: "var(--secondary)" }} aria-label="Social Link">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 2.127h-.396c-2.36 0-2.687.01-3.603.052-.97.044-1.5.203-1.85.34a2.775 2.775 0 00-1.023.666 2.775 2.775 0 00-.667 1.023c-.135.35-.296.88-.34 1.85-.042.916-.052 1.243-.052 3.603v.396c0 2.36.01 2.687.052 3.603.044.97.203 1.5.34 1.85.132.343.326.638.667.93a2.775 2.775 0 001.023.667c.35.135.88.296 1.85.34.916.042 1.243.052 3.603.052h.396c2.36 0 2.687-.01 3.603-.052.97-.044 1.5-.203 1.85-.34.343-.132.638-.326.93-.667.31-.344.536-.677.667-1.023.135-.35.296-.88.34-1.85.042-.916.052-1.243.052-3.603v-.396c0-2.36-.01-2.687-.052-3.603-.044-.97-.203-1.5-.34-1.85a2.775 2.775 0 00-.667-1.023 2.775 2.775 0 00-1.023-.666c-.35-.135-.88-.296-1.85-.34-.916-.042-1.243-.052-3.603-.052zM12 7.765a4.235 4.235 0 100 8.47 4.235 4.235 0 000-8.47zm0 6.343a2.108 2.108 0 110-4.216 2.108 2.108 0 010 4.216zm6.118-6.903a1.102 1.102 0 11-2.203 0 1.102 1.102 0 012.203 0z" /></svg>
                </a>
                <a href="#" className="transition-all hover:opacity-80" style={{ color: "var(--secondary)" }} aria-label="Social Link">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" /></svg>
                </a>
                <a href="#" className="transition-all hover:opacity-80" style={{ color: "var(--secondary)" }} aria-label="TikTok">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V15.5c0 1.42-.45 2.79-1.31 3.89-1.98 2.6-5.4 3.65-8.47 2.65-3.07-1-5.11-3.8-5.11-7.04 0-3.24 2.04-6.04 5.11-7.04 1.62-.53 3.39-.44 4.93.26l.01 4.09c-1.3-.61-2.84-.66-4.18-.14-1.34.52-2.31 1.66-2.5 3.09-.19 1.43.34 2.87 1.43 3.84 1.09.97 2.58 1.27 3.96.79 1.38-.48 2.33-1.74 2.34-3.2l.01-16.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-base opacity-70">
          <p>© {new Date().getFullYear()} Maaleen. All rights reserved.</p>
        </div>
      </Container>
      <FloatingBackToTop />
    </footer>
  );
}
