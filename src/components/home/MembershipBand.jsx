// src/components/home/MembershipBand.jsx
import Container from "../ui/Container";

export default function MembershipBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-dark text-white">
      {/* Decorative glows */}
      <div
        className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-14 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Lagos, Nigeria · February 18th – 19th, 2025 · Lagos Continental Hotel
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Amplifying Growth in Africa: From Momentum to Scale
            </h2>
          </div>

          <a
            href="/register"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-brand shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
          >
            Register for FABS 2025
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}