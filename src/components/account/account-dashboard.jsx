"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AddAddressModal } from "@/components/account/add-address-modal";
import { useAuth } from "@/contexts/auth-context";
import { useWishlist } from "@/contexts/wishlist-context";

// Sidebar navigation items matching Maaleen E-commerce layout
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: IconHome },
  { id: "orders", label: "My Orders", icon: IconPackage },
  { id: "wishlist", label: "Wishlist & Rewards", icon: IconHeart },
  { id: "services", label: "Saved Addresses", icon: IconMapPin },
];

// Quick Shopping 10 action grid items matching Maaleen brand
const QUICK_SHOPPING_ACTIONS = [
  { id: "shop-all", label: "Shop All", href: "/shop", icon: IconBag },
  { id: "track-order", label: "Track Order", href: "/track-order", icon: IconTruck },
  { id: "collections", label: "Collections", href: "/collections", icon: IconGrid },
  { id: "new-arrivals", label: "New Arrivals", href: "/shop", icon: IconSpark },
  { id: "wishlist", label: "Wishlist", idNav: "wishlist", icon: IconHeart },
  { id: "store-credit", label: "Store Credit", idNav: "account-detail", icon: IconCreditCard },
  { id: "gift-cards", label: "Gift Cards", href: "/shop", icon: IconGift },
  { id: "size-guide", label: "Size Guide", href: "/size-guide", icon: IconTag },
  { id: "exchange", label: "Exchange & Refund", href: "/return-policy", icon: IconRefresh },
  { id: "support", label: "Customer Care", href: "/contact", icon: IconPhone },
];

// My Favourite collections & edits
const FAVORITES_LIST = [
  {
    id: "f1",
    name: "Silk Sarees",
    type: "Signature Edit",
    avatarBg: "bg-[#f5ebd9]",
    avatarText: "text-[#b37d38]",
    initials: "S",
    isBird: false,
  },
  {
    id: "f2",
    name: "Evening Wear",
    type: "Formal Collection",
    avatarBg: "bg-[#f7e8e8]",
    avatarText: "text-[#9e2a2b]",
    initials: "E",
    isBird: false,
  },
  {
    id: "f3",
    name: "Kurti & Tops",
    type: "Everyday Luxury",
    avatarBg: "bg-[#f2efe9]",
    avatarText: "text-[#370006]",
    initials: "K",
    isBird: false,
  },
  {
    id: "f4",
    name: "Festive Edit",
    type: "Exclusive Drop",
    avatarBg: "bg-[#f5e6ea]",
    avatarText: "text-[#370006]",
    initials: "",
    isBird: true,
  },
  {
    id: "f5",
    name: "Velvet Suits",
    type: "Winter Edition",
    avatarBg: "bg-[#f7f0e1]",
    avatarText: "text-[#a1742a]",
    initials: "V",
    isBird: false,
  },
  {
    id: "f6",
    name: "Linen Edit",
    type: "Casual Wear",
    avatarBg: "bg-[#eaeee8]",
    avatarText: "text-[#4a6b47]",
    initials: "L",
    isBird: false,
  },
];

// Offers & Vouchers dataset related to Maaleen fashion store
const OFFERS_DATA = [
  {
    id: "o1",
    tag: "20% OFF",
    badge: "WELCOME20",
    title: "On First Order",
    description: "Use code WELCOME20 for an instant 20% discount on luxury fashion edits.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  },
  {
    id: "o2",
    tag: "FREE SHIP",
    badge: "MEMBER",
    title: "Orders Over ৳3000",
    description: "Enjoy complimentary nationwide express delivery on orders exceeding ৳3000.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
  },
  {
    id: "o3",
    tag: "10% OFF",
    badge: "LIMITED",
    title: "Evening Collection",
    description: "Selected evening silhouettes — exclusive limited weekly curated drop.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  },
  {
    id: "o4",
    tag: "BUNDLE",
    badge: "EDITORIAL",
    title: "Silk & Linen Edit",
    description: "Pair everyday tops with tailored bottoms and enjoy exclusive bundle savings.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
  },
];

// SVG Icon Definitions styled with Maaleen burgundy (#370006) theme
function IconSun({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="4" fill="#c59e75" stroke="#c59e75" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#c59e75" strokeLinecap="round" />
    </svg>
  );
}

function IconShield({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGear({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconHome({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10.707 2.293a1 1 0 011.414 0l9 9a1 1 0 01-1.414 1.414L19 12.086V20a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4h-2v4a1 1 0 01-1 1H6a1 1 0 01-1-1v-7.914l-.293.293a1 1 0 01-1.414-1.414l9-9z" />
    </svg>
  );
}

function IconPackage({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M21 8.5 12 3 3 8.5v7L12 21l9-5.5v-7Z" strokeLinejoin="round" />
      <path d="M3 8.5 12 14l9-5.5M12 14v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMapPin({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function IconLogout({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEyeSlash({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEye({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconBag({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M4 7h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7Z" strokeLinejoin="round" />
      <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
    </svg>
  );
}

function IconTruck({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7v-7Z" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}

function IconGrid({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconSpark({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconCreditCard({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function IconGift({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="9" width="18" height="12" rx="1.5" />
      <path d="M12 9v12M3 13h18M12 9c-2.2 0-4-1.3-4-3s1-2.2 2.5-1.5S12 7 12 9Zm0 0c2.2 0 4-1.3 4-3s-1-2.2-2.5-1.5S12 7 12 9Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTag({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function IconRefresh({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.7L4 16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMaaleenBird({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="#370006" className={className}>
      <path d="M21.5 5.5c-2 2.5-5 3.5-7.5 3-1.5-.3-3-1.2-4-2.5-1 1.5-2.5 3-4.5 3.5C3.5 9.8 2 9 1 7.5c2 4 6 7 10 7 3.5 0 7-2 9-5.5-.5 1.5-1 2.5-2 3.5 2-.5 3.5-2 3.5-7z" />
    </svg>
  );
}

function IconChequeBook({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="7" y1="9" x2="17" y2="9" />
      <line x1="7" y1="13" x2="13" y2="13" />
      <circle cx="16" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function IconShareNetwork({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconSearch({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function IconTrophy({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2" />
      <path d="M4 3h16v6a8 8 0 01-16 0V3z" />
      <path d="M12 15v4M8 21h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBell({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function getFirstName(name) {
  return name?.split(" ")[0] ?? "Rakib";
}

// ---------------------- Sub-components ----------------------

function ProfileSection({ user }) {
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [form, setForm] = useState({
    name: user.name || "Rakib",
    email: user.email || "rakib@example.com",
    phone: user.phone ? `+880${user.phone}` : "+8801700000000",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#370006]">Profile Details</h2>
        <button
          type="button"
          onClick={() => setEditing((value) => !value)}
          className="text-sm font-semibold text-[#370006] hover:underline"
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="rounded-2xl border border-[#eee7e1] bg-white p-6 shadow-xs">
        {editing ? (
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((curr) => ({ ...curr, name: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#370006] focus:ring-1 focus:ring-[#370006]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((curr) => ({ ...curr, email: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#370006] focus:ring-1 focus:ring-[#370006]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((curr) => ({ ...curr, phone: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#370006] focus:ring-1 focus:ring-[#370006]"
              />
            </div>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-xl bg-[#370006] px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#4a080e]"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">Name</dt>
              <dd className="mt-1 text-base font-semibold text-stone-800">{form.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">Email</dt>
              <dd className="mt-1 text-base font-medium text-stone-800">{form.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">Phone</dt>
              <dd className="mt-1 text-base font-medium text-stone-800">{form.phone}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">Membership</dt>
              <dd className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-[#c59e75]/40 bg-[#fff8f0] px-3 py-1 text-xs font-bold text-[#370006]">
                <IconShield className="h-3.5 w-3.5 text-[#c59e75]" /> Bronze Member
              </dd>
            </div>
          </dl>
        )}
      </div>

      <div className="rounded-2xl border border-[#eee7e1] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-800">Security &amp; Password</p>
            <p className="text-xs text-stone-500">Manage your password settings</p>
          </div>
          <button
            type="button"
            onClick={() => setChangingPassword((v) => !v)}
            className="text-sm font-semibold text-[#370006] hover:underline"
          >
            {changingPassword ? "Cancel" : "Change Password"}
          </button>
        </div>

        {changingPassword ? (
          <form className="mt-4 space-y-3 border-t border-stone-100 pt-4">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm((c) => ({ ...c, current: e.target.value }))}
              className="w-full rounded-xl border border-stone-300 px-4 py-2 text-sm outline-none focus:border-[#370006]"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordForm.next}
              onChange={(e) => setPasswordForm((c) => ({ ...c, next: e.target.value }))}
              className="w-full rounded-xl border border-stone-300 px-4 py-2 text-sm outline-none focus:border-[#370006]"
            />
            <button
              type="button"
              onClick={() => setChangingPassword(false)}
              className="rounded-xl bg-[#370006] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a080e]"
            >
              Update Password
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

function AddressesSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  function handleSaveAddress(address) {
    setAddresses((current) => {
      const next = address.isDefault
        ? current.map((item) => ({ ...item, isDefault: false }))
        : current;
      return [...next, { ...address, id: crypto.randomUUID() }];
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#370006]">Saved Addresses</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-xl bg-[#370006] px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-[#4a080e]"
        >
          Add New Address
        </button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#eee7e1] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">{item.title}</span>
                {item.isDefault ? (
                  <span className="rounded-full bg-[#370006]/10 px-2.5 py-0.5 text-xs font-semibold text-[#370006]">
                    Default
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-stone-600">{item.recipientName}</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-500">
                {item.address}, {item.city}, {item.country}
              </p>
              <p className="mt-2 text-xs font-medium text-stone-700">+{item.phone}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-white py-14 text-center">
          <p className="text-base font-semibold text-stone-800">No Saved Addresses</p>
          <p className="mt-1 text-xs text-stone-500">Add an address for quick checkout and order deliveries.</p>
        </div>
      )}

      <AddAddressModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveAddress} />
    </div>
  );
}

function GenericSection({ title, message = "No active records found." }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#370006]">{title}</h2>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-white py-14 text-center">
        <p className="text-base font-semibold text-stone-800">{title}</p>
        <p className="mt-1 text-xs text-stone-500">{message}</p>
      </div>
    </div>
  );
}

// ACCOUNT DETAIL VIEW - MAALEEN BRANDED REPLICA OF CITYTOUCH ACCOUNT DETAILS PAGE
function AccountDetailView({ onBack }) {
  const [activeTab, setActiveTab] = useState("details"); // "details" | "transactions"
  const [selectedAcc, setSelectedAcc] = useState("account-1");
  const [showBal, setShowBal] = useState(false);

  const transactions = [
    { id: "t1", date: "01 Oct 2026", title: "Store Credit Cashback", amount: "+ ৳ 500.00", type: "credit" },
    { id: "t2", date: "28 Sep 2026", title: "Reward Points Conversion", amount: "+ ৳ 1,000.00", type: "credit" },
    { id: "t3", date: "20 Sep 2026", title: "Order Checkout #MLN-40192", amount: "- ৳ 3,250.00", type: "debit" },
    { id: "t4", date: "15 Sep 2026", title: "Welcome Gift Bonus", amount: "+ ৳ 1,000.00", type: "credit" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar with Back Link & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 transition hover:text-[#370006]"
        >
          <span className="text-base font-bold">‹</span> My Account
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-[#370006]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#370006] shadow-2xs hover:bg-[#fff9f5] transition"
          >
            <span>+</span> Redeem Gift Card
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition"
          >
            <IconGear className="h-3.5 w-3.5 text-stone-500" /> Settings
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Accounts & Cards Selector */}
        <div className="space-y-4 lg:col-span-4 xl:col-span-4">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Accounts &amp; Balance</h4>
            {/* Account 1 Card (Selected) */}
            <div
              onClick={() => setSelectedAcc("account-1")}
              className={`relative flex flex-col justify-between rounded-2xl border p-4 shadow-2xs cursor-pointer transition ${
                selectedAcc === "account-1"
                  ? "border-[#370006] bg-white ring-2 ring-[#370006]/10"
                  : "border-stone-200 bg-stone-50/50 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide text-[#370006]">
                  {showBal ? "1,450 PTS" : "b******.xx"}
                </span>
                <span className="text-[#c59e75] text-sm">⭐</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#370006] text-white font-black text-xs">
                  ★
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-stone-800">MAALEEN REWARDS</p>
                  <p className="text-[10px] text-[#c59e75] font-semibold">Bronze Member</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Store Credit Cards</h4>
            {/* Card 1 */}
            <div
              onClick={() => setSelectedAcc("card-1")}
              className={`flex flex-col justify-between rounded-2xl border p-4 shadow-2xs cursor-pointer transition ${
                selectedAcc === "card-1"
                  ? "border-[#370006] bg-white ring-2 ring-[#370006]/10"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide text-stone-700">
                  b******.xx
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-7 w-8 shrink-0 items-center justify-center rounded bg-[#c59e75] text-[8px] font-black text-white">
                  MLN
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-stone-800">STORE CREDIT CARD</p>
                  <p className="text-[10px] text-stone-400">ID: MLN-89274</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#370006] hover:underline"
            >
              + Add Gift Voucher
            </button>
          </div>
        </div>

        {/* Right Main Column: Passbook Card, Tabs & Details */}
        <div className="space-y-5 lg:col-span-8 xl:col-span-8">
          {/* Top Account Passbook Hero Card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#c59e75]/30 bg-gradient-to-r from-[#370006] via-[#4a080e] to-[#2c0005] p-6 text-white shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#c59e75]">MAALEEN STORE CREDIT</p>
                <p className="text-xs font-medium text-stone-300">ID: MLN-89274</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c59e75]/20 text-[#c59e75] font-bold text-sm">
                ✦
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[11px] font-medium text-stone-300">Available Credit Balance</p>
              <p className="text-2xl font-black text-white sm:text-3xl">৳ 2,500.00</p>
            </div>
          </div>

          {/* Navigation Tabs (Account Details | Transactions) */}
          <div className="border-b border-stone-200">
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`pb-3 text-xs font-bold transition border-b-2 ${
                  activeTab === "details"
                    ? "border-[#370006] text-[#370006]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                Account Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("transactions")}
                className={`pb-3 text-xs font-bold transition border-b-2 ${
                  activeTab === "transactions"
                    ? "border-[#370006] text-[#370006]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                Transactions History
              </button>
            </div>
          </div>

          {/* Tab 1: Account Details Content */}
          {activeTab === "details" ? (
            <div className="rounded-2xl border border-[#eee7e1] bg-white p-5 shadow-2xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-medium text-stone-400">Membership Tier</p>
                  <p className="text-xs font-bold text-[#370006]">BRONZE MEMBER</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-stone-400">Total Earned Points</p>
                  <p className="text-xs font-bold text-[#c59e75]">1,450 PTS</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-stone-400">Member Opening Date</p>
                  <p className="text-xs font-bold text-stone-800">05 Nov 2023</p>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Transactions Content */
            <div className="overflow-hidden rounded-2xl border border-[#eee7e1] bg-white shadow-2xs">
              <div className="divide-y divide-stone-100">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 text-xs">
                    <div>
                      <p className="font-bold text-stone-800">{tx.title}</p>
                      <p className="text-[10px] text-stone-400">{tx.date}</p>
                    </div>
                    <span className={`font-bold ${tx.type === "credit" ? "text-emerald-600" : "text-[#370006]"}`}>
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Cards - EXACT SCREENSHOT MATCH */}
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-[#eee7e1] bg-white p-4 shadow-2xs transition hover:bg-[#fff9f5] hover:border-[#370006]/30 group"
            >
              <IconChequeBook className="h-5 w-5 text-[#370006] transition group-hover:scale-110" />
              <span className="text-xs font-bold text-stone-800">Cheque Management</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-[#eee7e1] bg-white p-4 shadow-2xs transition hover:bg-[#fff9f5] hover:border-[#370006]/30 group"
            >
              <IconShareNetwork className="h-5 w-5 text-[#370006] transition group-hover:scale-110" />
              <span className="text-xs font-bold text-stone-800">Share Account Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Content View - MAALEEN BRANDED REPLICA WITH SEPARATE RIGHT COLUMN
function DashboardHomeView({ onNavigate, wishCount }) {
  // Balance visibility toggles
  const [showAccountBal, setShowAccountBal] = useState(false);
  const [showCardBal, setShowCardBal] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-12 items-start">
      {/* LEFT MAIN COLUMN (spans 8 of 12 cols on desktop) */}
      <div className="space-y-6 lg:col-span-8 xl:col-span-8">
        {/* TOP CARDS ROW (Maaleen Rewards, Store Credit, View All) */}
        <div className="grid gap-4 sm:grid-cols-12">
          {/* Account Card 1: Maaleen Rewards */}
          <div
            onClick={() => onNavigate("account-detail")}
            className="sm:col-span-5 flex flex-col justify-between rounded-2xl border border-[#eee7e1] bg-white p-4 shadow-xs transition hover:shadow-md cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tracking-wide text-[#370006]">
                {showAccountBal ? "1,450 PTS" : "bxxxx.xx"}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAccountBal((v) => !v);
                }}
                className="text-stone-400 transition hover:text-[#370006]"
                aria-label="Toggle points visibility"
              >
                {showAccountBal ? <IconEye className="h-4 w-4" /> : <IconEyeSlash className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#370006] text-white font-bold text-xs shadow-xs">
                ★
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-800 group-hover:text-[#370006] transition">MAALEEN REWARDS</p>
                <p className="text-[11px] text-[#c59e75] font-semibold">Bronze Member</p>
              </div>
            </div>
          </div>

          {/* Account Card 2: Store Credit */}
          <div
            onClick={() => onNavigate("account-detail")}
            className="sm:col-span-5 flex flex-col justify-between rounded-2xl border border-[#eee7e1] bg-white p-4 shadow-xs transition hover:shadow-md cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tracking-wide text-[#370006]">
                {showCardBal ? "৳ 2,500.00" : "bxxxx.xx"}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCardBal((v) => !v);
                }}
                className="text-stone-400 transition hover:text-[#370006]"
                aria-label="Toggle credit visibility"
              >
                {showCardBal ? <IconEye className="h-4 w-4" /> : <IconEyeSlash className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-9 w-10 shrink-0 items-center justify-center rounded bg-[#c59e75] font-extrabold text-[9px] text-white tracking-tighter shadow-xs">
                MLN
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-800 group-hover:text-[#370006] transition">STORE CREDIT</p>
                <p className="text-[11px] text-stone-400">ID: MLN-89274</p>
              </div>
            </div>
          </div>

          {/* View All Pill Circle Button */}
          <div
            className="sm:col-span-2 flex items-center justify-center rounded-2xl border border-[#eee7e1] bg-white p-4 shadow-xs hover:bg-[#fff9f5] transition cursor-pointer"
            onClick={() => onNavigate("account-detail")}
          >
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#370006]/10 text-[#370006] transition hover:scale-105">
                <IconChevronRight className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold text-[#370006]">View All</span>
            </div>
          </div>
        </div>

        {/* QUICK SHOPPING CARD */}
        <div className="rounded-2xl border border-[#eee7e1] bg-white p-5 shadow-xs">
          <h3 className="text-sm font-semibold text-stone-800">Quick Shopping &amp; Services</h3>
          <hr className="my-3 border-stone-100" />
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-5 md:grid-cols-5">
            {QUICK_SHOPPING_ACTIONS.map((item) => {
              const IconComponent = item.icon;
              const content = (
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full text-[#370006] transition group-hover:scale-110">
                    <IconComponent className="h-6 w-6 stroke-[1.6]" />
                  </span>
                  <span className="text-xs font-medium text-stone-700 group-hover:text-[#370006]">
                    {item.label}
                  </span>
                </>
              );

              if (item.href) {
                return (
                  <Link key={item.id} href={item.href} className="group flex flex-col items-center gap-2.5 text-center transition hover:opacity-80">
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.idNav || "dashboard")}
                  className="group flex flex-col items-center gap-2.5 text-center transition hover:opacity-80"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>

        {/* MY FAVOURITE COLLECTIONS */}
        <div className="rounded-2xl border border-[#eee7e1] bg-white p-5 shadow-xs">
          <h3 className="text-sm font-semibold text-stone-800">My Favourite Collections</h3>
          
          <div className="mt-4 flex items-center gap-6 overflow-x-auto pb-2 scrollbar-none">
            {FAVORITES_LIST.map((fav) => (
              <Link
                key={fav.id}
                href="/collections"
                className="flex w-24 shrink-0 flex-col items-center text-center cursor-pointer transition hover:opacity-80"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-base font-bold shadow-xs ${fav.avatarBg} ${fav.avatarText}`}
                >
                  {fav.isBird ? (
                    <IconMaaleenBird className="h-6 w-6" />
                  ) : (
                    fav.initials
                  )}
                </div>
                <span className="mt-2 text-xs font-semibold text-stone-800 line-clamp-1">
                  {fav.name}
                </span>
                <span className="mt-0.5 text-[10px] text-stone-400 line-clamp-1">
                  {fav.type}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* OFFERS & VOUCHERS SECTION */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-stone-800">Offers &amp; Vouchers</h3>
            <Link
              href="/shop"
              className="text-xs font-bold text-[#370006] hover:underline"
            >
              View All &gt;
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {OFFERS_DATA.map((offer) => (
              <div
                key={offer.id}
                className="group flex w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[#eee7e1] bg-white shadow-xs transition hover:-translate-y-1 hover:shadow-md sm:w-[300px]"
              >
                {/* Left vertical ribbon banner */}
                <div className="flex w-9 shrink-0 items-center justify-center bg-[#370006] px-1">
                  <span className="rotate-180 text-[10px] font-black uppercase tracking-widest text-[#c59e75] [writing-mode:vertical-rl]">
                    {offer.tag}
                  </span>
                </div>

                {/* Right content */}
                <div className="flex flex-1 flex-col">
                  <div className="relative h-36 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="300px"
                    />
                    <span className="absolute right-2 top-2 rounded bg-[#370006] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white shadow-xs">
                      {offer.badge}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-stone-900">{offer.title}</h4>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-stone-500">
                      {offer.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DEDICATED RIGHT COLUMN FOR BANNER CARDS ONLY */}
      <div className="space-y-4 lg:col-span-4 xl:col-span-4">
        {/* Banner 1: Spend & Earn */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-[#c59e75]/40 bg-gradient-to-r from-[#fffbf7] to-[#fff3e6] p-4 shadow-xs transition hover:shadow-md">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-xs">
            🎁
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold leading-snug text-[#370006]">
              Spend &amp; Earn! Get Rewards on Every Order.
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed text-stone-600">
              Shop Maaleen fashion edits and earn reward points on every checkout.
            </p>
          </div>
        </div>

        {/* Banner 2: Start Tracking to Save */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-[#fffaf3] to-[#fdf4e8] p-4 shadow-xs transition hover:shadow-md">
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold leading-snug text-[#370006]">
              Start Tracking to Save!
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed text-stone-600">
              Track active orders and set a wishlist budget to manage your style efficiently.
            </p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-xs">
            📑
          </div>
        </div>

        {/* Empty space below right column as requested */}
      </div>
    </div>
  );
}

// Main Account Dashboard Component
export function AccountDashboard() {
  const router = useRouter();
  const { user, ready, isAuthenticated, logout } = useAuth();
  const { totalItems: wishCount } = useWishlist();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [greeting, setGreeting] = useState("Good Afternoon");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.replace("/login?redirect=/account");
    }
  }, [ready, isAuthenticated, router]);

  if (!ready || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#fcf9f6] p-6 animate-pulse">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[240px_1fr]">
          <div className="h-96 rounded-2xl bg-stone-200" />
          <div className="h-96 rounded-2xl bg-stone-200" />
        </div>
      </div>
    );
  }

  const firstName = getFirstName(user.name);

  function handleSignOut() {
    logout();
    router.push("/login");
  }

  function renderSection() {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHomeView onNavigate={setActiveSection} wishCount={wishCount} />;
      case "account-detail":
        return <AccountDetailView onBack={() => setActiveSection("dashboard")} />;
      case "orders":
        return <GenericSection title="My Orders" message="View active shipments and order history." />;
      case "wishlist":
        return <GenericSection title="Wishlist & Rewards" message={`Saved items (${wishCount}) and Maaleen reward points history.`} />;
      case "services":
        return <AddressesSection />;
      case "profile":
        return <ProfileSection user={user} />;
      default:
        return <DashboardHomeView onNavigate={setActiveSection} wishCount={wishCount} />;
    }
  }

  return (
    <div className="min-h-screen bg-[#fcf9f6] text-stone-900 font-sans antialiased">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#eee7e1] bg-white px-6 py-3.5 shadow-2xs font-sans">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1 font-sans text-2xl font-bold tracking-tight text-[#370006]">
          <span>maaleen</span>
          <span className="h-2 w-2 rounded-full bg-[#370006] inline-block align-baseline" />
        </Link>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100 hover:text-[#370006]"
          >
            <IconSearch className="h-5 w-5" />
          </Link>
          <button
            type="button"
            aria-label="Trophy Rewards"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100 hover:text-[#370006]"
          >
            <IconTrophy className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100 hover:text-[#370006]"
          >
            <IconBell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c59e75] px-1 text-[9px] font-black text-white shadow-xs">
              2
            </span>
          </button>
        </div>
      </header>

      {/* Main Body Container */}
      <div className="mx-auto flex max-w-[1440px]">
        {/* Sidebar */}
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-[240px] shrink-0 flex-col border-r border-[#eee7e1] bg-white px-4 py-6 lg:flex">
          {/* User Profile Card */}
          <div className="flex items-start gap-3 px-1">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2efe9] text-[#370006] text-xl font-bold">
                {firstName.charAt(0)}
              </div>
              <button
                type="button"
                onClick={() => setActiveSection("profile")}
                className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#f5e6ea] text-[#370006] shadow-xs hover:scale-110 transition"
              >
                <IconGear className="h-3 w-3" />
              </button>
            </div>

            <div className="min-w-0 pt-0.5">
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <IconSun className="h-3.5 w-3.5" />
                <span>{greeting}</span>
              </div>
              <p className="truncate text-sm font-bold text-stone-900">{firstName}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-[#eee7e1] bg-[#fffaf5] px-2 py-0.5 text-[10px] font-semibold text-[#370006]">
                <IconShield className="h-3 w-3 text-[#c59e75]" />
                Bronze Member
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex-1 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition ${
                    active
                      ? "border border-[#370006]/20 bg-[#370006]/5 text-[#370006] shadow-2xs"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  <IconComp className={`h-4 w-4 ${active ? "text-[#370006]" : "text-stone-500"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer Logout */}
          <div className="border-t border-stone-100 pt-4">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-500 transition hover:text-[#370006]"
            >
              <IconLogout className="h-4 w-4" />
              Log out
            </button>
          </div>
        </aside>

        {/* Mobile Header / Nav Bar */}
        <div className="w-full lg:hidden border-b border-stone-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2efe9] text-[#370006] text-xs font-bold">
                {firstName.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-stone-500">{greeting}, {firstName}</p>
                <span className="text-[10px] font-bold text-[#c59e75]">Bronze Member</span>
              </div>
            </div>
            <button type="button" onClick={handleSignOut} className="text-xs font-bold text-[#370006]">
              Log out
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                  activeSection === item.id ? "bg-[#370006] text-white" : "bg-stone-100 text-stone-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
