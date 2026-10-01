"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";

const inputClassName =
  "mt-2 w-full rounded-lg border border-[var(--primary)] bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--primary)] outline-none transition-colors placeholder:text-[var(--primary)]/45 focus:border-[var(--primary)]";

const labelClassName = "text-sm font-semibold text-stone-900";

const primaryBtnClassName =
  "inline-flex w-full items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90";

function PhoneIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LoginPanelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account";
  const { loginWithEmail, loginWithPhoneOtp, isAuthenticated, ready } = useAuth();

  const [mode, setMode] = useState("email");
  const [phoneStep, setPhoneStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    if (ready && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [ready, isAuthenticated, router, redirectTo]);

  useEffect(() => {
    if (otpTimer <= 0) return undefined;
    const id = setInterval(() => {
      setOtpTimer((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [otpTimer]);

  const resetError = () => setError("");

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    resetError();
    const result = loginWithEmail(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(redirectTo);
  };

  const handleSendOtp = (event) => {
    event.preventDefault();
    setError("Phone login is disabled. Use Login with Email.");
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    resetError();
    const result = loginWithPhoneOtp(phone, otp);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(redirectTo);
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setPhoneStep("phone");
    setError("");
  };

  return (
    <div className="w-full">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-stone-900 sm:text-5xl">
        Welcome Back
      </h1>
      <p className="mt-2 text-sm text-stone-500 sm:text-base">
        Sign in to continue to your account
      </p>

      <div
        className={
          mode
            ? "mt-8 grid grid-cols-2 gap-2 sm:gap-3"
            : "mt-8 flex flex-col gap-3"
        }
      >
        <button
          type="button"
          onClick={() => switchMode("phone")}
          className={`flex items-center justify-center gap-2.5 rounded-lg border border-[var(--primary)] px-4 py-3.5 text-sm font-semibold transition-colors ${
            mode === "phone"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--surface)] text-stone-800"
          } ${mode ? "gap-2 px-3 sm:gap-2.5 sm:px-4" : "w-full"}`}
        >
          <PhoneIcon className="h-4 w-4 shrink-0" />
          <span className={mode ? "text-center leading-tight" : undefined}>
            Login with Phone
          </span>
        </button>
        <button
          type="button"
          onClick={() => switchMode("email")}
          className={`flex items-center justify-center gap-2.5 rounded-lg border border-[var(--primary)] px-4 py-3.5 text-sm font-semibold transition-colors ${
            mode === "email"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--surface)] text-stone-800"
          } ${mode ? "gap-2 px-3 sm:gap-2.5 sm:px-4" : "w-full"}`}
        >
          <MailIcon className="h-4 w-4 shrink-0" />
          <span className={mode ? "text-center leading-tight" : undefined}>
            Login with Email
          </span>
        </button>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {mode === "phone" ? (
        phoneStep === "phone" ? (
          <form className="mt-8 space-y-4" onSubmit={handleSendOtp}>
            <div>
              <label htmlFor="phone" className={labelClassName}>
                Phone Number
              </label>
              <div className="mt-2 flex overflow-hidden rounded-lg border border-[var(--primary)] bg-[var(--surface)] focus-within:border-[var(--primary)]">
                <span className="inline-flex items-center border-r border-[var(--primary)] px-3 text-sm font-medium text-[var(--primary)]">
                  +880
                </span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="1712345678"
                  className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-sm text-[var(--primary)] outline-none placeholder:text-[var(--primary)]/45"
                />
              </div>
              <p className="mt-2 text-xs text-stone-500">
                Enter 10-digit number without country code
              </p>
            </div>
            <button type="submit" className={primaryBtnClassName}>
              Send OTP
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleVerifyOtp}>
            <div>
              <h2 className="text-lg font-semibold text-stone-900">Verify OTP</h2>
              <p className="mt-1 text-sm text-stone-500">
                We&apos;ve sent a verification code to +880{phone}
              </p>
            </div>
            <div>
              <label htmlFor="otp" className={labelClassName}>
                OTP
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="6-digit code"
                className={`${inputClassName} tracking-[0.3em]`}
              />
            </div>
            <button type="submit" className={primaryBtnClassName}>
              Verify OTP
            </button>
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <button
                type="button"
                onClick={() => {
                  setPhoneStep("phone");
                  setOtp("");
                  resetError();
                }}
                className="font-medium text-[var(--accent)] hover:underline"
              >
                Change number
              </button>
              {otpTimer > 0 ? (
                <span className="text-stone-500">Resend OTP in {otpTimer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setOtpTimer(60)}
                  className="font-medium text-[var(--accent)] hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )
      ) : null}

      {mode === "email" ? (
        <form className="mt-8 space-y-4" onSubmit={handleEmailSubmit}>
          <div>
            <label htmlFor="email" className={labelClassName}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="password" className={labelClassName}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className={inputClassName}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-stone-300 text-[var(--primary)]"
            />
            Keep me signed in
          </label>
          <button type="submit" className={primaryBtnClassName}>
            Sign In
          </button>
        </form>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="text-stone-500">Need help?</span>
        <Link
          href="/forgot-password"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <div className="mt-8 border-t border-stone-200 pt-6 text-center text-sm text-stone-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[var(--accent)] hover:underline"
        >
          Create one now
        </Link>
      </div>
    </div>
  );
}

export function LoginPanel() {
  return (
    <Suspense
      fallback={
        <div className="h-80 w-full max-w-md animate-pulse rounded-xl bg-stone-100" />
      }
    >
      <LoginPanelContent />
    </Suspense>
  );
}
