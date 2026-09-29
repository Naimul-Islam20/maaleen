"use client";

import Link from "next/link";
import { useState } from "react";
import { useCountry } from "@/contexts/country-context";

const inputClassName =
  "mt-2 w-full rounded-lg border border-[var(--primary)] bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--primary)] outline-none transition-colors placeholder:text-[var(--primary)]/45 focus:border-[var(--primary)]";

const labelClassName = "text-sm font-semibold text-stone-900";

export function SignupForm() {
  const { country } = useCountry();
  const [phone, setPhone] = useState("");

  return (
    <>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="signup-phone" className={labelClassName}>
            Phone Number
          </label>
          <div className="mt-2 flex overflow-hidden rounded-lg border border-[var(--primary)] bg-[var(--surface)] focus-within:border-[var(--primary)]">
            <span className="inline-flex items-center border-r border-[var(--primary)] px-3 text-sm font-medium text-[var(--primary)]">
              +{String(country.dialCode).replace(/^\+/, "")}
            </span>
            <input
              id="signup-phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                    .replace(/\D/g, "")
                    .slice(0, country.phoneMaxLength),
                )
              }
              placeholder="1712345678"
              className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-sm text-[var(--primary)] outline-none placeholder:text-[var(--primary)]/45"
            />
          </div>
          <p className="mt-2 text-xs text-stone-500">
            Enter 10-digit number without country code
          </p>
        </div>

        <div>
          <label htmlFor="password" className={labelClassName}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Minimum 8 characters"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className={labelClassName}>
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Re-enter your password"
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--accent)] hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
}
