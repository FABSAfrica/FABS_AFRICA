// Inside src/pages/Accommodation.jsx
import { useState, useEffect } from "react";
import Container from "../components/ui/Container";
import Photo from "../components/ui/Photo";
import { accommodation } from "../data/accommodation";

const SLIDE_MS = 3000; // time each hotel is shown

// Image shown on the right of the official hotel section.
// Used only if `official.image` is empty in data/accommodation.
const OFFICIAL_IMAGE_FALLBACK = "/media/accomodation1.webp";

// One entry per hotel: the name shown in the list + its image.
// Replace the src paths with your real image files.
const hotelSlides = [
  { name: "The Wheatbaker Lagos", src: "/media/the-wheatbaker.webp" },
  { name: "Radisson Blu Anchorage Hotel", src: "/media/radhotel.webp" },
  { name: "Mövenpick Hotels & Resorts", src: "/media/accomdation3.webp" },
  { name: "Eko Hotel & Suites", src: "/media/eko-hotel.webp" },
  { name: "Lagos Oriental Hotel", src: "/media/accomodation2.webp" },
];

function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function HotelSlideshow({ slides }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Advance every 3 seconds. Depending on `active` restarts the timer
  // whenever the slide changes (including when a hotel is clicked).
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearTimeout(id);
  }, [active, paused, slides.length]);

  return (
    <div
      className="grid items-stretch gap-4 lg:grid-cols-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slideshow image */}
      <div className="relative min-h-[180px] overflow-hidden rounded-2xl bg-ink shadow-xl ring-1 ring-black/5 lg:col-span-3 lg:min-h-[252px]">
        {slides.map((s, i) => (
          <div
            key={s.name}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
          >
            <Photo
              src={s.src}
              alt={s.name}
              bare
              className={`h-full w-full object-cover transition-transform duration-[3500ms] ease-out motion-reduce:transition-none ${
                i === active ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        ))}

        {/* Bottom gradient + caption */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
              Alternative {active + 1} of {slides.length}
            </p>
            <p className="mt-0.5 text-base font-bold text-white sm:text-lg">{slides[active].name}</p>
          </div>
          <div className="flex gap-1.5" role="tablist" aria-label="Choose hotel">
            {slides.map((s, i) => (
              <button
                key={s.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show ${s.name}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress bar: restarts on every slide */}
        {!paused && slides.length > 1 && (
          <div className="absolute inset-x-0 top-0 h-1 bg-white/20" aria-hidden="true">
            <div
              key={active}
              className="h-full origin-left bg-accent"
              style={{ animation: `slideProgress ${SLIDE_MS}ms linear forwards` }}
            />
          </div>
        )}
      </div>

      {/* Hotel list */}
      <div className="flex flex-col rounded-2xl border border-line bg-white p-3 shadow-lg sm:p-4 lg:col-span-2">
        <ul className="space-y-1">
          {slides.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand/10 text-brand"
                      : "text-ink hover:bg-black/[0.03]"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition ${
                      isActive ? "bg-brand text-white" : "bg-brand/10 text-brand"
                    }`}
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {s.name}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-auto pt-3 text-xs leading-relaxed text-ink-soft">
          Get in touch at{" "}
          <a
            href="mailto:info@fabs.africa"
            className="font-semibold text-brand underline underline-offset-4"
          >
            info@fabs.africa
          </a>{" "}
          with any questions on booking accommodation for your time at the Francophone Africa
          Business Summit!
        </p>
      </div>
    </div>
  );
}

export default function Accommodation() {
  const { official, alternatives } = accommodation;

  return (
    <>
      {/* Keyframes for the slideshow progress bar */}
      <style>{`
        @keyframes slideProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="slideProgress"] { animation: none !important; }
        }
      `}</style>

      {/* Official hotel (compact: text on the left, image on the right) */}
      <section
        className="relative overflow-hidden py-8 sm:py-12"
        style={{
          background:
            "radial-gradient(60% 50% at 10% 0%, rgba(0,0,0,0.04), transparent 70%), #fafafa",
        }}
      >
        <Container>
          <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Text: left */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Official Conference Hotel
              </span>

              <h1 className="mt-3 text-2xl font-bold leading-tight text-ink sm:text-3xl">
                {official.heading || (
                  <>
                    Stay at the <span className="text-brand">Lagos Continental Hotel</span>
                  </>
                )}
              </h1>

              <div className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
                <p>{official.intro}</p>
                <p>{official.note}</p>
              </div>

              <a
                href={official.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                {official.cta.label}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            {/* Image: right */}
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-[1.5rem] bg-gradient-to-br from-accent/30 via-transparent to-brand/20 blur-xl"
                aria-hidden="true"
              />
              <div className="relative h-[220px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 sm:h-[260px] md:h-[280px]">
                <Photo
                  src={official.image || OFFICIAL_IMAGE_FALLBACK}
                  alt="Lagos Continental Hotel"
                  bare
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Alternatives slideshow (compact) */}
      <section
        className="py-8 sm:py-12"
        style={{
          backgroundColor: "#f5f6f8",
          backgroundImage: `
            linear-gradient(135deg, rgba(0,0,0,0.025) 25%, transparent 25%),
            linear-gradient(225deg, rgba(0,0,0,0.025) 25%, transparent 25%),
            linear-gradient(45deg, rgba(0,0,0,0.025) 25%, transparent 25%),
            linear-gradient(315deg, rgba(0,0,0,0.025) 25%, #f5f6f8 25%)
          `,
          backgroundPosition: "60px 0, 60px 0, 0 0, 0 0",
          backgroundSize: "120px 120px",
        }}
      >
        <Container>
          <div className="mx-auto mb-6 max-w-2xl text-center">
            <h2 className="text-lg font-bold text-ink sm:text-xl">{alternatives.heading}</h2>
            <p className="mt-1 text-sm text-ink-soft">{alternatives.subheading}</p>
          </div>

          <div className="mx-auto max-w-4xl">
            <HotelSlideshow slides={hotelSlides} />
          </div>
        </Container>
      </section>
    </>
  );
}