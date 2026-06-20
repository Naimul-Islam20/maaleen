import { Container } from "@/components/layout/container";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Create Account",
};

export default function SignupPage() {
  return (
    <section className="w-full py-10 sm:py-16">
      <Container>
        <div className="mx-auto w-full max-w-lg">
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-[var(--background)] shadow-sm">
            <div className="maaleen-brand-bg px-6 py-8 text-center text-white sm:px-8">
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
                Create Account
              </h1>
              <p className="mt-2 text-sm text-white/85">
                Join Maaleen to save your wishlist, track orders, and checkout faster.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-medium uppercase tracking-wide text-white/80">
                <span className="rounded-full border border-white/25 px-3 py-1">
                  Trusted quality
                </span>
                <span className="rounded-full border border-white/25 px-3 py-1">
                  Nationwide delivery
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <SignupForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
