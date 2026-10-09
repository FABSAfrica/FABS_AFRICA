// Inside src/pages/Speakers2025.jsx
import Photo from "../components/ui/Photo";
import Container from "../components/ui/Container";
import { fabs2025Speakers } from "../data/speakers2025";

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function SpeakerCard({ person }) {
  return (
    <article className="group w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)]">
      <div className="h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper">
          <Photo
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"
            aria-hidden="true"
          />
        </div>
        <div className="p-4">
          <span className="mb-2 block h-0.5 w-8 rounded-full bg-brand transition-all duration-300 group-hover:w-14" />
          <h3 className="text-sm font-bold leading-snug text-ink">{person.name}</h3>
          <p title={person.role} className="mt-1 line-clamp-3 text-xs leading-relaxed text-ink-soft">
            {person.role}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Speakers2025() {
  const { eyebrow, heading, subheading, heroImage, panels } = fabs2025Speakers;
  const total = panels.reduce((sum, p) => sum + p.people.length, 0);

  return (
    <>
      {/* Hero (height reduced ~40%: py-20/28 -> py-12/16, tighter inner spacing) */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Photo src={heroImage} bare className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/70 to-ink"
          aria-hidden="true"
        />
        <Container>
          <div className="mx-auto max-w-3xl px-5 py-12 text-center sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">{eyebrow}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{heading}</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75">
              {subheading}
            </p>

            <div className="mt-5 flex items-center justify-center gap-8 text-white">
              <div>
                <p className="text-2xl font-bold">{total}</p>
                <p className="text-[11px] uppercase tracking-widest text-white/60">Speakers</p>
              </div>
              <span className="h-8 w-px bg-white/20" aria-hidden="true" />
              <div>
                <p className="text-2xl font-bold">{panels.length}</p>
                <p className="text-[11px] uppercase tracking-widest text-white/60">Panels</p>
              </div>
            </div>

            {/* Jump links */}
            <nav aria-label="Speaker panels" className="mt-6 flex flex-wrap justify-center gap-2">
              {panels.map((panel) => (
                <a
                  key={panel.title}
                  href={`#${slugify(panel.title)}`}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-white hover:text-ink"
                >
                  {panel.title.replace(" Panel", "")}
                </a>
              ))}
            </nav>
          </div>
        </Container>
      </section>

      {/* Panels: padding around each section reduced ~40% (py-14/20 -> py-8/12) */}
      {panels.map((panel, index) => (
        <section
          key={panel.title}
          id={slugify(panel.title)}
          className={`scroll-mt-24 py-8 sm:py-12 ${index % 2 === 0 ? "bg-white" : "bg-paper"}`}
        >
          <Container>
            <div className="mx-auto max-w-6xl">
              <header className="mb-6 flex items-end justify-between gap-4 border-b border-ink/10 pb-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-brand/30 sm:text-5xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-bold uppercase tracking-wide text-ink sm:text-2xl">
                    {panel.title}
                  </h2>
                </div>
                <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">
                  {panel.people.length} speakers
                </p>
              </header>

              {/* Wraps on mobile/tablet; one line on desktop (4 or 5 speakers) */}
              <div className="flex flex-wrap justify-center gap-6 lg:flex-nowrap">
                {panel.people.map((person) => (
                  <SpeakerCard key={person.name} person={person} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}