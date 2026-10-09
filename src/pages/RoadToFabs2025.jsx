import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, Lightbulb, Handshake } from "lucide-react";
import Container from "../components/ui/Container";
import { ROUTES } from "../data/navigation";

const pillars = [
  { icon: MapPin, title: "Host-country focus", text: "Each stop spotlights the unique investment opportunities and challenges of its host country." },
  { icon: Users, title: "Intimate by design", text: "Key decision-makers, industry experts and investors in smaller, in-depth settings." },
  { icon: Lightbulb, title: "Shared knowledge", text: "Discussions and networking sessions built around one specific theme per stop." },
  { icon: Handshake, title: "Lasting partnerships", text: "A platform to explore collaboration and lay the groundwork for the main summit." },
];

export default function RoadToFabs2025() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        {/* Swap this path for your real hero image */}
        <img
          src="/media/Sponsor IV.JPG"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-dark/95 via-brand-dark/80 to-black/70" />
        <Container>
          <div className="py-24 md:py-36">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur">
              Past Events · FABS 2025
            </p>
            <h1 className="font-display text-4xl font-semibold text-white md:text-6xl">
              Road to <span className="text-accent">FABS 2025</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              A series of targeted mini conferences leading up to the Francophone Africa Business Summit.
            </p>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 -z-10 rotate-3 rounded-3xl bg-gradient-to-br from-brand to-accent opacity-20" />
              {/* Swap this path for your real "2025 road" image */}
              <img
                src="/media/road-2025.jpg"
                alt="Road leading to 2025"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-black/5"
              />
            </div>

            <div>
              <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
                Road to FABS 2025
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                The <strong className="text-ink">Francophone Africa Business Summit (FABS)</strong> is
                dedicated to fostering economic development and trade within Francophone Africa. As part
                of our ongoing commitment to creating opportunities for collaboration and growth, we are
                proud to launch our <strong className="text-ink">“Road to FABS 2025”</strong> event series.
              </p>

              <blockquote className="my-6 rounded-r-2xl border-l-4 border-accent bg-accent/10 p-5 leading-relaxed text-ink">
                <strong>“Road to FABS 2025”</strong> is a series of targeted mini conferences and events
                held in various Francophone African countries. Each stop on this journey focuses on a
                specific theme, highlighting the unique investment opportunities and challenges within
                each host country.
              </blockquote>

              <p className="leading-relaxed text-ink-soft">
                These events, which are more intimate than the main FABS summit, bring together key
                decision-makers, industry experts, and investors for in-depth discussions, networking
                sessions, and fruitful exchanges. The goal is to create a platform for participants to
                explore collaboration opportunities, share knowledge, and lay the groundwork for lasting
                partnerships.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Join us on this exciting journey towards FABS 2025 as we explore the vast potential of
                Francophone Africa together. Stay tuned for announcements on the dates and locations of
                our upcoming “Road to FABS 2025” events!
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="bg-brand/[0.03] py-16">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white">
                  <Icon size={20} />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stops */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-ink">Stops on the journey</h2>
          <Link
            to={ROUTES.drcSipAndLearn}
            className="group mt-8 flex items-center justify-between gap-6 rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-xl md:p-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Road to FABS 2025
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink">DRC – Sip &amp; Learn</h3>
              <p className="mt-2 text-ink-soft">
                A session on the road to FABS 2025 focused on the Democratic Republic of Congo.
              </p>
            </div>
            <ArrowRight className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </section>
    </>
  );
}