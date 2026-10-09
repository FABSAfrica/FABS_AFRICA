// src/components/home/MembershipBand.jsx
import Container from "../ui/Container";

/**
 * Optional testimonials. Pass an array like:
 * [{ quote: "…", name: "Jane Doe", role: "CEO, Company" }]
 * If empty, the testimonials grid is hidden automatically.
 */
export default function MembershipBand({ testimonials = [] }) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft decorative glows */}
      <div
        className="pointer-events-none absolute -left-14 top-6 h-44 w-44 rounded-full bg-brand/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-14 bottom-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Testimonials + milestone statement */}
      <Container className="relative py-10 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/15 bg-brand/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            See what is said about us
          </h2>
        </div>

        {testimonials.length > 0 && (
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg
                  className="h-5 w-5 text-accent"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9.4 5C5.8 6.6 3 9.9 3 14.2V19h7v-7H6.3c.2-2.4 1.5-4.1 3.7-5.1L9.4 5zm9 0c-3.6 1.6-6.4 4.9-6.4 9.2V19h7v-7h-3.7c.2-2.4 1.5-4.1 3.7-5.1L18.4 5z" />
                </svg>
                <blockquote className="mt-2 text-sm leading-relaxed text-gray-600">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-xs font-semibold text-gray-900">{t.name}</p>
                  {t.role && <p className="text-[11px] text-gray-500">{t.role}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <p className="mx-auto mt-8 max-w-2xl text-center font-display text-base font-medium leading-snug text-brand sm:text-lg lg:text-xl">
          Be part of this milestone occasion bringing together directors,
          investors, ministers, and entrepreneurs to network, exchange ideas,
          and make deals.
        </p>

        {/* <div className="mt-6 flex justify-center">
          <a
            href="/register"
            className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl"
          >
            Register for FABS 2025
            <span
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div> */}
      </Container>

      {/* Closing banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-dark via-brand to-brand-dark">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.12),transparent_50%)]"
          aria-hidden="true"
        />
        <Container className="relative py-4 sm:py-5">
          <p className="text-center text-sm font-medium tracking-wide text-white sm:text-base">
            Don't miss this opportunity to shape the future of pan-African
            growth.
          </p>
        </Container>
      </div>
    </section>
  );
}