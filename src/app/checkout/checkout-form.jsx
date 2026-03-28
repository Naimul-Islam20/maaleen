"use client";

import { useState } from "react";
import Link from "next/link";

export function CheckoutForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-stone-200 bg-[var(--surface-elevated)] p-8 text-center shadow-sm">
        <p className="font-[family-name:var(--font-display)] text-2xl text-stone-900">
          Thank you
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Checkout will connect to payment and order APIs soon. No charge was
          made — this was a preview only.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-stone-200 bg-[var(--surface-elevated)] p-6 shadow-sm sm:p-8"
    >
      <p className="text-sm text-stone-600">
        This form is UI-only. Orders are not processed until your API is
        connected.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-medium text-stone-500">
          First name
          <input
            required
            name="firstName"
            autoComplete="given-name"
            className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
          />
        </label>
        <label className="block text-xs font-medium text-stone-500">
          Last name
          <input
            required
            name="lastName"
            autoComplete="family-name"
            className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
          />
        </label>
      </div>
      <label className="block text-xs font-medium text-stone-500">
        Email
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
        />
      </label>
      <label className="block text-xs font-medium text-stone-500">
        Address
        <input
          required
          name="address"
          autoComplete="street-address"
          className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
        />
      </label>
      <label className="block text-xs font-medium text-stone-500">
        City
        <input
          required
          name="city"
          autoComplete="address-level2"
          className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-stone-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        Place order (preview)
      </button>
    </form>
  );
}
