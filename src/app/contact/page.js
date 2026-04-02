import { Container } from "@/components/layout/container";

export default function ContactPage() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <Container>
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
          Contact Us
        </h1>
        <p className="mt-4 text-justify text-sm sm:text-base leading-relaxed text-stone-700">
          Have a question about your order, sizing, or our products? Reach out to us
          using the form or contact details below and our team will get back to you
          as soon as possible.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] items-start">
        <div className="space-y-6">
          <h2 className="text-base sm:text-lg font-semibold tracking-wide text-stone-900">
            Contact Directly
          </h2>
          <div className="space-y-5 text-sm sm:text-[15px] text-stone-700">
            <div>
              <h3 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-stone-900">
                Our Address
              </h3>
              <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-stone-800">
                House #1/A, Road #6, Sector #3<br />
                Uttara Model Town, Uttara, Dhaka-1230
              </p>
            </div>

            <div>
              <h3 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-stone-900">
                Phone Numbers
              </h3>
              <p className="mt-2 space-y-1 text-[13px] sm:text-sm leading-relaxed text-stone-800">
                <span className="block">+880 1234 567890</span>
                <span className="block">+880 9876 543210</span>
              </p>
            </div>

            <div>
              <h3 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-stone-900">
                Email
              </h3>
              <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-stone-800">
                <a
                  href="mailto:mrpfoundation19@gmail.com"
                  className="font-medium text-[var(--accent)] hover:underline"
                >
                  mrpfoundation19@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-stone-900">
                Social Media
              </h3>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <a
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.04H7.9v-2.9h2.54V9.86c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22C18.34 21.21 22 17.08 22 12.06Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17" cy="7" r="1" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  aria-label="YouTube"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M21.6 7.2a2.4 2.4 0 0 0-1.68-1.7C18.2 5 12 5 12 5s-6.2 0-7.92.5A2.4 2.4 0 0 0 2.4 7.2 25.1 25.1 0 0 0 2 12a25.1 25.1 0 0 0 .4 4.8 2.4 2.4 0 0 0 1.68 1.7C5.8 19 12 19 12 19s6.2 0 7.92-.5a2.4 2.4 0 0 0 1.68-1.7A25.1 25.1 0 0 0 22 12a25.1 25.1 0 0 0-.4-4.8ZM10 15.2V8.8L15.2 12 10 15.2Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium uppercase tracking-wide text-stone-600"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium uppercase tracking-wide text-stone-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-medium uppercase tracking-wide text-stone-600"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="What is your message about?"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium uppercase tracking-wide text-stone-600"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-14">
        <div className="h-64 sm:h-80 lg:h-96 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
          <iframe
            title="Maaleen Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.593353927257!2d90.399452!3d23.762195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b8c8f2c4e7%3A0x0000000000000000!2sUttara%20Sector%203!5e0!3m2!1sen!2sbd!4v1700000000000"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>

      </Container>
    </section>
  );
}



