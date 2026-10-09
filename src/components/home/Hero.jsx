// src/components/home/Hero.jsx
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Background video: autoplays, muted, loops on all screen sizes */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/media/fabsvideo2.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Gradient tint: darker on the left where the text sits */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative py-10 sm:py-14 lg:py-[72px]">
        <Container>
          <div className="animate-fade-up mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Lagos, Nigeria · February 18th – 19th, 2025
            </span>

            <h1 className="mt-4 font-display text-2xl font-bold leading-[1.1] sm:text-4xl lg:text-[42px]">
              Francophone Africa <span className="text-accent">Business Summit</span> 2025
            </h1>

            <p className="mt-3 text-base font-medium text-white/90 sm:text-lg">
              Amplifying Growth in Africa: From Momentum to Scale
            </p>

            <p className="mt-2 flex items-center justify-center gap-2 text-xs text-white/75 sm:text-sm lg:justify-start">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Venue: Lagos Continental Hotel
            </p>

            <a
              href="/register"
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Register
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}