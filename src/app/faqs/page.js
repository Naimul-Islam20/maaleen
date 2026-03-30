 "use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";

function FaqItem({ question, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-md border border-stone-200 bg-white px-4 py-3">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left text-sm sm:text-base font-semibold text-stone-900"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3 text-stone-400"
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2 text-sm text-stone-700">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqsPage() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            Welcome to the MAALEEN FAQs
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-700">
            Welcome to the MAALEEN FAQs page. Here you will find answers to the
            most frequently asked questions about our brand, products, ordering
            process, and customer support. If you need additional information or
            have a question not covered below, please feel free to contact us
            directly. We are always happy to assist.
          </p>

          <div className="mt-8 space-y-8 text-sm sm:text-base leading-relaxed text-stone-800">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
                General Questions
              </h2>
              <div className="mt-4 space-y-3">
                <FaqItem question="What makes MAALEEN different from other fashion brands?">
                  MAALEEN focuses on refined, timeless silhouettes with calm, modern
                  tailoring. Every piece is designed to balance everyday comfort with
                  understated elegance, using carefully selected fabrics and detail-driven
                  construction instead of fast trends.
                </FaqItem>
                <FaqItem question="Where are MAALEEN garments made?">
                  Our garments are designed and produced in Bangladesh with a strong
                  emphasis on quality craftsmanship. We work closely with selected
                  production partners to maintain consistent standards in fit, finishing,
                  and fabric.
                </FaqItem>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
                Product Information
              </h2>
              <div className="mt-4 space-y-3">
                <FaqItem question="Does MAALEEN offer clothing for all genders?">
                  Our primary focus is on carefully curated collections that reflect the
                  MAALEEN aesthetic. Over time, we may expand into more categories, but
                  each product line is introduced thoughtfully to maintain quality and
                  consistency.
                </FaqItem>
                <FaqItem question="Are your products ready-to-wear or custom-made?">
                  Most MAALEEN pieces are ready-to-wear in standard sizes. For selected
                  styles, we may offer custom or made-to-measure options, which will be
                  clearly mentioned in the product details if available.
                </FaqItem>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
                Ordering and Shipping
              </h2>
              <div className="mt-4 space-y-3">
                <FaqItem question="How can I place an order?">
                  You can place an order directly through our website by selecting your
                  preferred size and adding items to the cart. Once you proceed to
                  checkout, simply provide your shipping details, choose a payment method,
                  and confirm the order.
                </FaqItem>
                <FaqItem question="What shipping options are available?">
                  We offer standard and, in some cases, express shipping options depending
                  on your location. Full details about delivery timelines and costs are
                  available on our Shipping Policy page and at checkout.
                </FaqItem>
                <FaqItem question="Do you ship internationally?">
                  Yes, we ship to selected international destinations. Availability,
                  delivery timeframes, and charges vary by country and are shown during
                  checkout.
                </FaqItem>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
                Exchanges &amp; Returns
              </h2>
              <div className="mt-4 space-y-3">
                <FaqItem question="What is your exchange policy?">
                  We currently offer exchanges for eligible items within a limited time
                  window, primarily in cases of manufacturing defects or specific approved
                  reasons. Full details, conditions, and timelines are available on our
                  Exchange &amp; Return Policy page.
                </FaqItem>
                <FaqItem question="How do I request an exchange or return?">
                  To request an exchange, please contact our customer support with your
                  order number, the item you wish to exchange, and the reason for the
                  request. Our team will review your case and share the next steps if the
                  item is eligible under our policy.
                </FaqItem>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
                Customer Service
              </h2>
              <div className="mt-4 space-y-3">
                <FaqItem question="How can I contact MAALEEN customer support?">
                  You can reach us via email or phone using the contact details provided on
                  our Contact page. Our support team will do their best to respond as
                  quickly as possible during business hours.
                </FaqItem>
              </div>
            </section>
          </div>

          <p className="mt-8 text-sm sm:text-base leading-relaxed text-stone-700">
            We hope this FAQs page has been helpful. If you have any additional
            questions or need further clarification, please do not hesitate to
            reach out. Your satisfaction is important to us.
          </p>
        </div>
      </Container>
    </section>
  );
}
