import { Container } from "@/components/layout/container";

export default function ReturnPolicyPage() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            Exchange &amp; Return Policy
          </h1>

          <p className="mt-4 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            At MAALEEN, customer satisfaction is a priority. We carefully inspect every
            product before dispatch to ensure quality standards are met. However, if you
            encounter any issues with your purchase, we are here to assist you through our
            exchange process. Please review the guidelines below to understand our return
            and exchange policy.
          </p>

          <section className="mt-8 space-y-3 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Exchange Eligibility
            </h2>

            <h3 className="mt-3 text-sm font-semibold text-stone-900">
              Ready-to-Wear Items
            </h3>
            <p>
              <span className="font-medium">Exchange Period:</span> Ready-to-wear items
              are eligible for exchange within 7 days of delivery.
            </p>
            <p>
              <span className="font-medium">Return Condition:</span> Exchanges are
              accepted only in cases of manufacturing defects. We do not accept returns
              for refunds.
            </p>
            <p className="mt-2">Product Condition Requirements: Items must be:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Unworn and unused</li>
              <li>In original condition with tags intact</li>
              <li>Free from stains, odors, alterations, or damage</li>
            </ul>
            <p>
              Items that do not meet these conditions will not be eligible for exchange.
            </p>

            <h3 className="mt-5 text-sm font-semibold text-stone-900">
              Custom-Made and Tailored Items
            </h3>
            <p>
              Due to their personalized nature, custom-made and tailored items are
              non-returnable and non-exchangeable.
            </p>
            <p className="mt-1">
              However, if there is a clear fabrication defect or a fitting issue caused
              by our production, please contact us immediately. We will assess the issue
              and make reasonable efforts to resolve it.
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              How to Request an Exchange
            </h2>
            <p>To initiate an exchange, please follow the steps below:</p>

            <h3 className="mt-3 text-sm font-semibold text-stone-900">
              1. Contact Customer Support
            </h3>
            <p>Reach out to us before sending any product:</p>
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
              </a>{" "}
              (replace if needed)
            </p>
            <p className="mt-1">Please include:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Order number</li>
              <li>Item(s) you wish to exchange</li>
              <li>Reason for the exchange</li>
            </ul>

            <h3 className="mt-4 text-sm font-semibold text-stone-900">
              2. Exchange Authorization
            </h3>
            <p>
              Once your request is reviewed and approved, we will provide you with an
              Exchange Authorization and further instructions.
            </p>

            <h3 className="mt-4 text-sm font-semibold text-stone-900">
              3. Prepare the Package
            </h3>
            <p>When preparing your exchange shipment, please:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Pack the item securely, preferably in its original packaging</li>
              <li>Include all tags, accessories, and invoices</li>
              <li>Clearly mention the Exchange Authorization details</li>
            </ul>
            <p>
              When contacting us, please specify the item you would like in exchange.
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Exchange Return Address
            </h2>
            <p>
              Please send the approved exchange package to the following address:
            </p>
            <p className="mt-1">
              Dhanmondi Old 10/A
              <br />
              Address, Bangladesh
            </p>
          </section>

          <section className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-stone-700">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Important Notes
            </h2>
            <p>
              Customers are responsible for delivery charges associated with sending
              items back for exchange unless the issue is due to a verified defect.
            </p>
            <p>
              MAALEEN reserves the right to reject any exchange request that does not
              comply with the policy stated above.
            </p>
            <p>Products sent without prior authorization will not be accepted.</p>
          </section>
        </div>
      </Container>
    </section>
  );
}

