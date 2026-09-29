import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Create Account",
};

export default function SignupPage() {
  return (
    <AuthShell imageAlt="Maaleen fashion editorial">
      <div className="w-full">
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-stone-900 sm:text-5xl">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-stone-500 sm:text-base">
          Join us today and start shopping
        </p>
        <div className="mt-8">
          <SignupForm />
        </div>
      </div>
    </AuthShell>
  );
}
