"use client";

import Link from "next/link";
import { useState } from "react";
import { DEMO_USER } from "@/lib/demo-auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmail(value) {
  return EMAIL_PATTERN.test(value.trim());
}

function phoneDigits(value) {
  return value.replace(/\D/g, "");
}

function isPhone(value) {
  if (value.includes("@")) return false;
  const digits = phoneDigits(value);
  return digits.length >= 10 && digits.length <= 15;
}

export function CheckoutAccountGate({
  authReady,
  user,
  isAuthenticated,
  loginWithEmail,
  guestContact,
  onGuest,
  onChangeGuest,
}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [askPassword, setAskPassword] = useState(false);
  const [error, setError] = useState("");

  if (!authReady) {
    return (
      <div className="h-56 rounded-lg border border-stone-200 bg-white" />
    );
  }

  if (isAuthenticated) {
    return (
      <section className="rounded-lg border border-stone-200 bg-white px-4 py-4 sm:px-5">
        <StepHeading />
        <p className="mt-4 text-sm text-stone-700">
          Signed in as{" "}
          <span className="font-semibold text-stone-900">
            {user?.name || user?.email}
          </span>
        </p>
      </section>
    );
  }

  if (guestContact) {
    return (
      <section className="rounded-lg border border-stone-200 bg-white px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <StepHeading />
          <button
            type="button"
            onClick={onChangeGuest}
            className="text-xs font-semibold text-[var(--primary)] underline-offset-2 hover:underline"
          >
            Change
          </button>
        </div>
        <p className="mt-4 text-sm text-stone-700">
          Checking out as guest ·{" "}
          <span className="font-semibold text-stone-900">{guestContact}</span>
        </p>
      </section>
    );
  }

  function handleNext() {
    const value = identifier.trim();
    if (!value) {
      setError("Please enter phone or email.");
      return;
    }

    if (value.includes("@")) {
      if (!isEmail(value)) {
        setError("Enter a valid email address.");
        setAskPassword(false);
        return;
      }
      if (value.toLowerCase() === DEMO_USER.email.toLowerCase()) {
        if (!askPassword) {
          setAskPassword(true);
          setError("");
          return;
        }
        const result = loginWithEmail(value, password);
        if (!result.ok) {
          setError(result.error || "Invalid email or password.");
          return;
        }
        setError("");
        return;
      }
      setAskPassword(false);
      setError("No account found. Create an account or checkout as guest.");
      return;
    }

    if (isPhone(value)) {
      setAskPassword(false);
      setError("Phone sign-in isn't available. Checkout as guest, or use email.");
      return;
    }

    setAskPassword(false);
    setError("Enter a valid phone number or email.");
  }

  function handleGuest() {
    const value = identifier.trim();
    if (!value || (!isEmail(value) && !isPhone(value))) {
      setError("Enter a valid phone number or email to checkout as guest.");
      return;
    }
    setError("");
    onGuest(isEmail(value) ? value.toLowerCase() : phoneDigits(value));
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white px-4 py-5 sm:px-5">
      <StepHeading />
      <p className="mt-5 text-sm font-semibold text-stone-900">
        Already have an account?
      </p>

      <label className="relative mt-3 block">
        <span className="sr-only">Phone or email</span>
        <input
          type="text"
          autoComplete="username"
          value={identifier}
          onChange={(event) => {
            setIdentifier(event.target.value);
            setAskPassword(false);
            setPassword("");
            setError("");
          }}
          className="w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none placeholder:text-transparent focus:border-[var(--primary)]"
        />
        {!identifier ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-stone-400">
            Please enter phone or email
            <span className="text-red-500">*</span>
          </span>
        ) : null}
      </label>

      {askPassword ? (
        <label className="mt-3 block">
          <span className="sr-only">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            className="w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-[var(--primary)]"
          />
        </label>
      ) : null}

      {error ? (
        <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
      ) : null}

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Link
          href="/signup?redirect=/checkout"
          className="inline-flex items-center justify-center rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-800 transition-colors hover:border-stone-400"
        >
          Create Account
        </Link>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-3 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Next
        </button>
      </div>

      <div className="my-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.16em] text-stone-400">
        <span className="h-px flex-1 bg-stone-200" />
        OR SIGN IN WITH
        <span className="h-px flex-1 bg-stone-200" />
      </div>

      <button
        type="button"
        onClick={() =>
          setError("Google sign-in isn't available yet. Use email or checkout as guest.")
        }
        className="flex w-full items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-800 transition-colors hover:border-stone-400"
      >
        <GoogleMark />
        Google
      </button>

      <p className="my-3 text-center text-[11px] tracking-[0.16em] text-stone-400">
        OR
      </p>

      <button
        type="button"
        onClick={handleGuest}
        className="flex w-full items-center justify-center rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-800 transition-colors hover:border-stone-400"
      >
        Checkout as guest
      </button>
    </section>
  );
}

function StepHeading() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center bg-[var(--primary)] text-xs font-semibold text-white">
        1
      </span>
      <h2 className="text-sm font-semibold tracking-[0.16em] text-stone-900">
        ACCOUNT
      </h2>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4A7.2 7.2 0 0 1 5 12c0-.8.1-1.6.4-2.4V6.5H1.4A12 12 0 0 0 0 12c0 1.9.5 3.8 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.5l4 3.1C6.3 6.8 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}
