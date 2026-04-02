import { Container } from "@/components/layout/container";

export default function ShippingPolicyPage() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            Shipping Policy
          </h1>
          <p className="mt-4 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            At MAALEEN, we value your time and trust. Our goal is to ensure that your
            orders are processed efficiently and delivered safely. This Shipping Policy
            outlines our shipping methods, delivery timelines, and related terms so you
            know exactly what to expect when shopping with us.
          </p>

          <section className="mt-8 space-y-4 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Shipping Options and Delivery Times
            </h2>
            <div>
              <h3 className="mt-2 text-sm font-semibold text-stone-900">
                Domestic Shipping (Bangladesh)
              </h3>
              <p className="mt-1">
                <span className="font-medium">Standard Shipping:</span> Delivery within
                3–5 business days.
              </p>
              <p className="mt-1">
                <span className="font-medium">Express Shipping:</span> Delivery within
                1–2 business days. Additional charges apply.
              </p>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-semibold text-stone-900">
                International Shipping
              </h3>
              <p className="mt-1">
                <span className="font-medium">Standard International Shipping:</span>{" "}
                Delivery within 7–14 business days, depending on the destination.
              </p>
              <p className="mt-1">
                <span className="font-medium">Expedited International Shipping:</span>{" "}
                Delivery within 3–5 business days. Additional charges apply.
              </p>
            </div>

            <p className="mt-3 text-sm sm:text-base text-stone-700">
              Please note that delivery times are estimates and may vary due to factors
              beyond our control, including weather conditions, customs clearance, or
              courier delays.
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Shipping Costs
            </h2>
            <p>
              Shipping costs are calculated based on the following factors:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Order weight and size</li>
              <li>Selected shipping method</li>
              <li>Delivery destination</li>
            </ul>
            <p>
              The exact shipping cost will be displayed at checkout before payment
              confirmation.
            </p>
            <p className="mt-1">
              <span className="font-medium">Domestic Orders:</span> Free standard
              shipping may apply to orders above a specified value (if applicable).
            </p>
            <p className="mt-1">
              <span className="font-medium">International Orders:</span> Shipping
              charges vary by destination. Any applicable customs duties, taxes, or
              import fees are the responsibility of the customer.
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Order Processing
            </h2>
            <p>
              Orders are typically processed within 1–2 business days after confirmation.
            </p>
            <p>
              Orders placed on weekends or public holidays will be processed on the next
              business day.
            </p>
            <p>
              Once your order has shipped, you will receive a confirmation message or
              email with tracking details (where applicable).
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Delivery Guidelines
            </h2>
            <p>
              <span className="font-medium">Receiving Your Order:</span> Please ensure
              that someone is available at the delivery address to receive the package.
              MAALEEN is not responsible for lost or stolen packages once the courier
              confirms delivery.
            </p>
            <p>
              <span className="font-medium">Delivery Issues:</span> If your order
              arrives damaged or is significantly delayed, please contact us promptly so
              we can coordinate with the shipping carrier to resolve the issue.
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Special or Remote Locations
            </h2>
            <p>
              Delivery to certain remote or hard-to-reach areas may take additional time
              or incur extra charges. If you are unsure whether your location is
              serviceable, please contact our customer support team before placing your
              order.
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Order Changes and Cancellations
            </h2>
            <p>
              If you need to modify or cancel your order, please contact us as soon as
              possible after placing it. While we will make every effort to accommodate
              your request, changes cannot be guaranteed once an order has been
              processed or shipped.
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Contact Us
            </h2>
            <p>
              If you have any questions regarding shipping, delivery, or your order
              status, please reach out to us:
            </p>
            <p>
              <span className="font-medium">Phone:</span> 123456789
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              <a
                href="mailto:info@maaleen.com"
                className="text-[var(--accent)] hover:underline"
              >
                info@maaleen.com
              </a>
            </p>
            <p className="mt-2">
              Thank you for choosing MAALEEN. We appreciate your support and look
              forward to delivering a seamless shopping experience.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}

