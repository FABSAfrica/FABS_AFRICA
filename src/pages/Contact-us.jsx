import { useState } from "react";
import Photo from "../components/ui/Photo";
import { colors, withAlpha } from "../theme/colors";
import {
  aboutHero,
  overview,
  amplifying,
  attendeesHeading,
  attendees,
} from "../data/about";

function AttendeeLogo({ name, logo }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img
      src={logo}
      alt={name}
      onError={() => setOk(false)}
      className="h-12 w-auto max-w-[140px] object-contain"
    />
  ) : (
    <span className="text-sm font-bold text-ink-soft">{name}</span>
  );
}

// Renders {{bold italic}} segments inside a string.
function Rich({ text }) {
  return text.split(/(\{\{.*?\}\})/g).map((part, i) =>
    part.startsWith("{{") ? (
      <strong key={i}>
        <em>{part.slice(2, -2)}</em>
      </strong>
    ) : (
      part
    )
  );
}

export default function ContactUs() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-gradient-to-br from-ink via-brand-dark to-ink sm:min-h-[460px] lg:min-h-[300px]">
        <Photo
          src={aboutHero.image}
          bare
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-brand-dark/55 to-ink/70"
          aria-hidden="true"
        />
        <h1 className="relative px-5 text-center text-2xl font-bold text-accent sm:text-3xl">
          {aboutHero.title}
        </h1>
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

        <div className="relative mx-auto grid max-w-5xl items-start gap-10 px-5 sm:px-8 md:grid-cols-2">
          {/* Overlapping photo frames */}
          <div className="relative mx-auto aspect-[6/7] w-full max-w-[504px]">
            <div className="absolute left-0 top-0 h-full w-[65%] bg-white p-1 shadow-lg ring-1 ring-black/5">
              <Photo
                src={overview.portrait.src}
                alt={overview.portrait.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute right-0 top-[32%] h-[54%] w-[50%] bg-white p-1 shadow-lg ring-1 ring-black/5">
              <Photo
                src={overview.handshake.src}
                alt={overview.handshake.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <h2 className="text-2xl font-bold leading-tight text-ink sm:text-[28px]">
              {overview.heading}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
              {overview.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 border border-line bg-white p-5 shadow-md">
              <p className="text-[13px] font-bold leading-relaxed text-ink">{overview.callout}</p>
            </div>

            <a
              href={overview.brochure.href}
              download
              className="mt-5 inline-block bg-accent px-4 py-2 text-xs font-semibold text-ink underline transition hover:brightness-95"
            >
              {overview.brochure.label}
            </a>
          </div>
        </div>
      </section>

      {/* Amplifying Growth: soft panel */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-5xl bg-paper px-6 py-8 sm:px-10 sm:py-10">
          <h2 className="text-center text-xl font-semibold text-ink sm:text-2xl">
            {amplifying.heading}
          </h2>
          <div className="mt-6 space-y-3 text-justify text-[13px] leading-relaxed text-ink-soft">
            {amplifying.paragraphs.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 2024 attendees */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-lg font-semibold text-ink">{attendeesHeading}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {attendees.map((a) => (
              <AttendeeLogo key={a.name} name={a.name} logo={a.logo} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}