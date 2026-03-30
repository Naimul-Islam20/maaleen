import { Container } from "@/components/layout/container";

export default function SizeGuidePage() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            Size Guide
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Find your perfect fit with our detailed size chart.
          </p>
        </div>
        <img
          src="size.jpg"
          alt="Size guide chart"
          className="block w-full h-auto"
        />
      </Container>
    </section>
  );
}

