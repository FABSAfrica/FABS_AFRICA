// Inside src/pages/About.jsx
import { useState, useEffect, useRef } from "react";
import Photo from "../components/ui/Photo";
import { colors, withAlpha } from "../theme/colors";
import {
  aboutHero,
  overview,
  amplifying,
  attendeesHeading,
  attendees,
} from "../data/about";

// Fades and lifts children into view the first time they scroll on screen.
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function AttendeeLogo({ name, logo }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img
      src={logo}
      alt={name}
      onError={() => setOk(false)}
      className="h-12 w-auto max-w-[140px] object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
    />
  ) : (
    <span className="text-sm font-bold text-ink-soft">{name}</span>
  );
}

// Renders {{bold italic}} segments inside a string.
function Rich({ text }) {
  return text.split(/(\{\{.*?\}\})/g).map((part, i) =>
    part.startsWith("{{") ? (
      <strong key={i} className="text-ink">
        <em>{part.slice(2, -2)}</em>
      </strong>
    ) : (
      part
    )
  );
}

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-ink via-brand-dark to-ink sm:min-h-[320px]">
        <Photo
          src={aboutHero.image}
          bare
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-brand-dark/55 to-ink/80"
          aria-hidden="true"
        />
        <div className="relative px-5 text-center">
          <span className="mx-auto mb-4 block h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
          <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
            {aboutHero.title}
          </h1>
        </div>
      </section>

      {/* Overview: photo collage + intro copy */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        {/* Decorative dotted texture, fades out toward the right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 lg:block"
          style={{
            backgroundImage: `radial-gradient(circle, ${withAlpha(colors.ink, 0.15)} 1.6px, transparent 1.7px)`,
            backgroundSize: "16px 16px",
            WebkitMaskImage: "radial-gradient(ellipse at 20% 40%, black 0%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at 20% 40%, black 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          {/* Overlapping photo frames */}
          <Reveal>
            <div className="relative mx-auto aspect-[6/7] w-full max-w-[480px]">
              <div
                className="absolute -left-4 -top-4 h-1/2 w-1/2 rounded-3xl bg-accent/20"
                aria-hidden="true"
              />
              <div className="absolute left-0 top-0 h-full w-[65%] overflow-hidden rounded-3xl bg-white p-1.5 shadow-2xl ring-1 ring-black/5">
                <Photo
                  src={overview.portrait.src}
                  alt={overview.portrait.alt}
                  className="h-full w-full rounded-[1.25rem] object-cover"
                />
              </div>
              <div className="absolute right-0 top-[32%] h-[54%] w-[50%] overflow-hidden rounded-3xl bg-white p-1.5 shadow-2xl ring-1 ring-black/5 transition duration-500 hover:-translate-y-1">
                <Photo
                  src={overview.handshake.src}
                  alt={overview.handshake.alt}
                  className="h-full w-full rounded-[1.25rem] object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={150}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              About FABS
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {overview.heading}
            </h2>

            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft">
              {overview.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="relative mt-7 rounded-2xl border border-line bg-white p-6 pl-7 shadow-lg">
              <span
                className="absolute inset-y-4 left-0 w-1 rounded-full bg-accent"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold leading-relaxed text-ink">{overview.callout}</p>
            </div>

            <a
              href={overview.brochure.href}
              download
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {overview.brochure.label}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Amplifying Growth */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-20">
        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-line bg-paper px-6 py-10 shadow-sm sm:px-12 sm:py-14">
            <div
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl"
              aria-hidden="true"
            />
            <h2 className="relative text-center text-2xl font-bold text-ink sm:text-3xl">
              {amplifying.heading}
            </h2>
            <span className="relative mx-auto mt-4 block h-1 w-12 rounded-full bg-accent" aria-hidden="true" />

            <div className="relative mx-auto mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink-soft">
              {amplifying.paragraphs.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2024 attendees */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <Reveal>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-xl font-bold text-ink sm:text-2xl">{attendeesHeading}</h2>
            <span className="mx-auto mt-3 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              {attendees.map((a) => (
                <div
                  key={a.name}
                  className="flex h-20 min-w-[140px] items-center justify-center rounded-2xl border border-line bg-white px-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <AttendeeLogo name={a.name} logo={a.logo} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}