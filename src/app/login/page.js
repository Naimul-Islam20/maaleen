import { Container } from "@/components/layout/container";
import { LoginPanel } from "@/components/auth/login-panel";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <section className="w-full py-10 sm:py-16">
      <Container>
        <LoginPanel />
      </Container>
    </section>
  );
}
