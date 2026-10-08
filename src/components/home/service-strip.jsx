import { Container } from "@/components/layout/container";

const ITEMS = [
  { label: "Returns & Exchange", icon: IconReturn },
  { label: "Cash on Delivery", icon: IconCash },
  { label: "1,000+ Happy Customers", icon: IconCustomers },
  { label: "Worldwide Shipping", icon: IconWorldwide },
  { label: "Order Tracking System", icon: IconTracking },
];

export function ServiceStrip() {
  return (
    <section aria-label="Store promises" className="bg-[var(--surface)]">
      <Container className="py-6 sm:py-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className="flex flex-col items-center justify-center gap-3 border border-[#e4e4e4] bg-white px-3 py-6 text-center sm:py-8"
              >
                <Icon />
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#b0b0b0] sm:text-[11px]">
                  {item.label}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function IconReturn() {
  return (
    <svg viewBox="0 0 40 36" className="h-9 w-10 text-[#b5b5b5]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M14 8a8 8 0 1 1-2.2 6" strokeLinecap="round" />
      <path d="M14 4v5H9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 18h16l2 4v8H6v-8l2-4z" strokeLinejoin="round" />
      <path d="M8 22h16" />
    </svg>
  );
}

function IconCash() {
  return (
    <svg viewBox="0 0 40 36" className="h-9 w-10 text-[#b5b5b5]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="6" y="10" width="28" height="16" rx="2" />
      <circle cx="20" cy="18" r="3.2" />
      <path d="M10 14h.01M30 22h.01" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function IconCustomers() {
  return (
    <svg viewBox="0 0 40 36" className="h-9 w-10 text-[#b5b5b5]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="15" cy="13" r="3.2" />
      <circle cx="26" cy="14" r="2.6" />
      <path d="M8 26c.8-3.4 3.4-5.2 7-5.2s6.2 1.8 7 5.2" strokeLinecap="round" />
      <path d="M22 21.2c1.6-.6 3.2-.7 4.6-.2 1.8 2.2 3.2 3.6 3.6 5" strokeLinecap="round" />
    </svg>
  );
}

function IconWorldwide() {
  return (
    <svg viewBox="0 0 40 36" className="h-9 w-10 text-[#b5b5b5]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="20" cy="18" r="9" />
      <path d="M11 18h18M20 9c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9s1.2-6.4 3.6-9z" />
    </svg>
  );
}

function IconTracking() {
  return (
    <svg viewBox="0 0 40 36" className="h-9 w-10 text-[#b5b5b5]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M8 14h14v12H8z" strokeLinejoin="round" />
      <path d="M22 18h4l4 4v4h-8" strokeLinejoin="round" />
      <circle cx="13" cy="26" r="1.6" />
      <circle cx="25" cy="26" r="1.6" />
      <path d="M12 11h6" strokeLinecap="round" />
    </svg>
  );
}
