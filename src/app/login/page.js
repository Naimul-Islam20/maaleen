import { AuthShell } from "@/components/auth/auth-shell";
import { LoginPanel } from "@/components/auth/login-panel";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AuthShell imageAlt="Maaleen fashion editorial">
      <LoginPanel />
    </AuthShell>
  );
}
