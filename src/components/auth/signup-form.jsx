"use client";

import Link from "next/link";
import { useState } from "react";
import { useCountry } from "@/contexts/country-context";

export function SignupForm() {
  const { country } = useCountry();
  const [phone, setPhone] = useState("");

  return (
    <>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-wide text-stone-600"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="signup-phone"
            className="text-xs font-semibold uppercase tracking-wide text-stone-600"
          >
            Phone Number
          </label>
          <div className="mt-2 flex overflow-hidden rounded-lg border border-stone-300 bg-white focus-within:border-[var(--primary)]">
            <span className="inline-flex items-center border-r border-stone-200 bg-stone-50 px-3 text-sm text-stone-600">
              {country.label}
            </span>
            <span className="inline-flex items-center border-r border-stone-200 bg-stone-50 px-3 text-sm text-stone-600">
              {country.dialCode}
            </span>
            <input
              id="signup-phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value.replace(/\D/g, "").slice(0, country.phoneMaxLength),
                )
              }
              placeholder="Phone Number"
              className="min-w-0 flex-1 px-3 py-2.5 text-sm text-stone-900 outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wide text-stone-600"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wide text-stone-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-[var(--primary)]"
          />
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
}
