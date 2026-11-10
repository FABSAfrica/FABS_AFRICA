import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, MapPin, Calendar } from "lucide-react";
import Photo from "../components/ui/Photo";
import { dialogueKenya } from "../data/dialogueKenya";

function AttendeeLogo({ name, logo }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <span className="text-sm font-bold text-ink-soft">{name}</span>;
  return (
    <img
      src={logo}
      alt={name}
      onError={() => setOk(false)}
      className="h-10 w-auto max-w-[120px] object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
    />
  );
}

function AttendeeCarousel({ logos }) {
  const [index, setIndex] = useState(0);
  const perPage = 5;
  const pages = Math.ceil(logos.length / perPage);

  const prev = () => setIndex((i) => (i - 1 + pages) % pages);
  const next = () => setIndex((i) => (i + 1) % pages);

  const visible = logos.slice(index * perPage, index * perPage + perPage);

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={prev}
        aria-label="Previous"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white shadow-sm transition hover:bg-brand hover:text-white"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex flex-1 items-center justify-center gap-6 sm:gap-10">
        {visible.map((a) => (
          <div key={a.name} className="flex items-center justify-center">
            <AttendeeLogo name={a.name} logo={a.logo} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={next}
        aria-label="Next"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white shadow-sm transition hover:bg-brand hover:text-white"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function DialogueKenya() {
  const { heroImage, hero, event, attendees } = dialogueKenya;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-ink sm:min-h-[400px]">
        <Photo
          src={heroImage}
          bare
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-ink/50" aria-hidden="true" />
        <div className="relative px-5 text-center">
          <p className="text-sm font-semibold text-accent sm:text-base">{hero.eyebrow}</p>
        </div>
      </section>

      {/* Event card */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-xl px-5">
          <div className="rounded-2xl border border-line bg-white p-8 shadow-lg sm:p-10">
            {/* Accent bar */}
            <span className="mb-5 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />

            <h1 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {event.title}
            </h1>
            <p className="mt-1 text-sm font-semibold text-accent">{event.tagline}</p>

            {/* Date + venue */}
            <div className="mt-5 flex items-start gap-4 border-t border-line pt-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-brand text-center">
                <span className="block text-xl font-bold leading-none text-brand">{event.day}</span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  {event.month}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-soft">
                  <MapPin size={12} className="shrink-0 text-brand" />
                  {event.venue}
                </p>
              </div>
            </div>

            <div className="mt-6 h-px bg-line" aria-hidden="true" />

            <div className="mt-6 space-y-3 text-sm leading-relaxed text-ink-soft">
              <p>{event.description1}</p>
              <p>{event.description2}</p>
            </div>

            <a
              href={event.brochure.href}
              download
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
            >
              {event.brochure.label}
              <Download
                size={15}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Attendees */}
      <section className="border-t border-line bg-white pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl px-5">
          <p className="mb-8 text-center text-sm font-semibold text-ink">
            {attendees.heading}
          </p>
          <AttendeeCarousel logos={attendees.logos} />
        </div>
      </section>
    </>
  );
}