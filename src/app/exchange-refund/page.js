import { InfoPage } from "@/components/layout/info-page";

export default function ExchangeRefundPage() {
  return (
    <InfoPage title="Exchange & Refund">
      <p className="text-justify">
        Ready-to-wear pieces can be exchanged within 7 days of delivery when there is a
        manufacturing defect. MAALEEN does not offer refunds for a change of mind. Custom
        and tailored items are non-returnable and non-exchangeable, except where a
        fabrication defect or a fitting issue is caused by our production.
      </p>

      <section className="mt-8 space-y-3 text-justify">
        <h2>Exchange</h2>
        <p>An item is eligible for exchange only when it is:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Unworn and unused</li>
          <li>In its original condition, with tags intact</li>
          <li>Free from stains, odors, alterations, or damage</li>
        </ul>
        <p>
          Contact us before sending anything back. Once the request is approved, we share
          an exchange authorization and the return address.
        </p>
      </section>

      <section className="mt-8 space-y-3 text-justify">
        <h2>Refund</h2>
        <p>
          We do not accept returns for a refund. If a verified manufacturing defect cannot
          be exchanged for the same or an equivalent piece, our team will confirm the next
          step with you directly.
        </p>
        <p>Send the approved package only. Items sent without authorization are not accepted.</p>
        <p>
          You cover the delivery charge for sending an item back, unless the issue is a
          verified defect.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2>Contact</h2>
        <p>
          <span className="font-medium">Phone:</span>{" "}
          <a href="tel:+8801786493740" className="text-[var(--accent)] hover:underline">
            +88017 86 493 740
          </a>
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a href="mailto:support@maaleen.store" className="text-[var(--accent)] hover:underline">
            support@maaleen.store
          </a>
        </p>
        <p>Include your order number, the item, and the reason for the request.</p>
      </section>
    </InfoPage>
  );
}
