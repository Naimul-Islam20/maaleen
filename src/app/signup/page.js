import Link from "next/link";
import { Container } from "@/components/layout/container";

export const metadata = {
  title: "Create Account",
};

export default function SignupPage() {
  return (
    <section className="w-full py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-stone-900 sm:text-4xl">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Join Maaleen to save your wishlist, track orders, and checkout faster.
          </p>

          <form className="mt-8 space-y-4">
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
                className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-[var(--accent)]"
              />
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
                className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-[var(--accent)]"
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
                className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Create account
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-stone-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

