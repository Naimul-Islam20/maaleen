import { Container } from "@/components/layout/container";
import { TrackOrderForm } from "@/components/order/track-order-form";

export const metadata = {
  title: "Track Order",
  description: "Track your Maaleen order with your invoice number.",
};

export default function TrackOrderPage() {
  return (
    <section className="w-full bg-[var(--surface)] py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-xl rounded-xl border-[3px] border-[var(--secondary)]/35 bg-[var(--surface)] p-2 sm:p-3">
          <div className="rounded-lg bg-[var(--surface)] px-5 py-8 sm:px-8 sm:py-10">
            <h1 className="text-center text-xl font-bold tracking-tight text-[var(--primary)] sm:text-2xl">
              Track your order
            </h1>
            <TrackOrderForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
