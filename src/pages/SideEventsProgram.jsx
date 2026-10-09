// Inside src/pages/SideEventsProgram.jsx
import { useState } from "react";
import Container from "../components/ui/Container";
import Photo from "../components/ui/Photo";
import { sideEvents } from "../data/sideEvents";

export default function SideEventsProgram() {
  const [activeDay, setActiveDay] = useState(0);
  const day = sideEvents.days[activeDay];

  return (
    <>
      <section className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-ink sm:min-h-[420px]">
        <Photo src={sideEvents.heroImage} bare className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-ink/50" aria-hidden="true" />
        <h1 className="relative px-5 text-center text-2xl font-bold text-accent sm:text-4xl">
          {sideEvents.heading}
        </h1>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 border-b border-line">
              {sideEvents.days.map((d, i) => (
                <button
                  key={d.label}
                  onClick={() => setActiveDay(i)}
                  className={`py-3 text-sm font-semibold transition-colors ${
                    i === activeDay
                      ? "bg-gradient-to-r from-brand to-accent text-white"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              {day.events.map((e, i) => (
                <div key={i} className="border border-line">
                  <div className="px-5 py-4 bg-paper font-semibold text-brand text-sm">
                    {e.time} – {e.title}
                  </div>
                  <p className="px-5 py-4 text-sm leading-relaxed text-ink-soft">{e.body}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href={sideEvents.downloadHref}
                download
                className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-sm px-6 py-3 hover:brightness-95"
              >
                Download PDF
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}