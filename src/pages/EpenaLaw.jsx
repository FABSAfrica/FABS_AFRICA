import { useState, useEffect, useRef } from "react";
import {
  Award,
  CircleDollarSign,
  Building2,
  BadgeCheck,
  Check,
  Download,
} from "lucide-react";
import Photo from "../components/ui/Photo";
import Container from "../components/ui/Container";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import { epenaIntro, epenaStats, gateway } from "../data/epena";
import { colors, withAlpha } from "../theme/colors";

const statIcons = {
  award: Award,
  dollar: CircleDollarSign,
  building: Building2,
  badge: BadgeCheck,
};

// Returns [ref, shown]; flips to true the first time the element scrolls into view.
function useInView(threshold = 0.15) {
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
      { threshold },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, shown];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, shown] = useInView(0.12);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({ stat, delay }) {
  const [ref, shown] = useInView(0.3);
  const Icon = statIcons[stat.icon];
  const target = Number(stat.value);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon size={24} strokeWidth={1.7} />
      </span>

      <p className="mt-4 flex items-baseline gap-1.5 font-bold leading-none text-ink">
        <span className="text-3xl sm:text-4xl">
          <AnimatedCounter start={0} end={target} duration={1500} />
        </span>

        {stat.suffix && (
          <span className="text-base font-semibold text-brand sm:text-lg">
            {stat.suffix}
          </span>
        )}
      </p>

      <p className="mt-2 text-sm leading-snug text-ink-soft">{stat.label}</p>
    </div>
  );
}

export default function EpenaLaw() {
  const { badge } = epenaIntro;

  return (
    <>
      {/* Intro: collage + copy */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        {/* Decorative dotted texture, fades out toward the right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 lg:block"
          style={{
            backgroundImage: `radial-gradient(circle, ${withAlpha(
              colors.ink,
              0.15,
            )} 1.6px, transparent 1.7px)`,
            backgroundSize: "16px 16px",
            WebkitMaskImage:
              "radial-gradient(ellipse at 20% 30%, black 0%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse at 20% 30%, black 0%, transparent 70%)",
          }}
        />

        <Container>
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Collage */}
            <Reveal>
              <div className="relative mx-auto aspect-[6/7] w-full max-w-[460px]">
                <div
                  className="absolute -bottom-4 -left-4 h-1/2 w-1/2 rounded-3xl bg-accent/20"
                  aria-hidden="true"
                />

                <div className="absolute left-0 top-0 h-[68%] w-[72%] overflow-hidden rounded-3xl bg-white p-1.5 shadow-2xl ring-1 ring-black/5">
                  <Photo
                    src={epenaIntro.imageTop.src}
                    alt={epenaIntro.imageTop.alt}
                    className="h-full w-full rounded-[1.25rem] object-cover"
                  />
                </div>

                <div className="absolute bottom-0 right-0 z-10 h-[52%] w-[60%] overflow-hidden rounded-3xl bg-white p-1.5 shadow-2xl ring-1 ring-black/5">
                  <Photo
                    src={epenaIntro.imageBottom.src}
                    alt={epenaIntro.imageBottom.alt}
                    className="h-full w-full rounded-[1.25rem] object-cover"
                  />
                </div>

                {/* Counter badge */}
                <div className="absolute right-0 top-[6%] z-20 rounded-2xl bg-brand px-5 py-4 text-white shadow-2xl sm:-right-[4%]">
                  <p className="text-3xl font-bold leading-none sm:text-4xl">
                    <AnimatedCounter
                      start={badge.start}
                      end={badge.end}
                      suffix={badge.suffix}
                    />
                  </p>

                  <p className="mt-2 text-[11px] leading-tight text-white/80">
                    {badge.line1}
                  </p>

                  <p className="text-xs font-semibold leading-tight">
                    {badge.line2}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Copy */}
            <Reveal delay={150}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Epena Law
              </span>

              <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                {epenaIntro.heading}
              </h1>

              <p className="mt-3 text-lg font-medium leading-snug text-brand">
                {epenaIntro.tagline}
              </p>

              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                {epenaIntro.body}
              </p>

              <div className="relative mt-6 rounded-2xl border border-line bg-white p-6 pl-7 shadow-lg">
                <span
                  className="absolute inset-y-4 left-0 w-1 rounded-full bg-accent"
                  aria-hidden="true"
                />

                <p className="text-sm font-medium leading-relaxed text-ink">
                  {epenaIntro.callout}
                </p>
              </div>

              <a
                href={epenaIntro.readMore.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                {epenaIntro.readMore.label}

                <Download
                  size={16}
                  strokeWidth={2.2}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {epenaStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} delay={index * 100} />
            ))}
          </div>
        </Container>
      </section>

      {/* Gateway: timeline + map */}
      <section className="bg-paper py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                {gateway.heading}
              </h2>
              <span
                className="mt-3 block h-1 w-12 rounded-full bg-accent"
                aria-hidden="true"
              />
            </Reveal>

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-5">
              {/* Timeline points */}
              <ol className="space-y-5 lg:col-span-3">
                {gateway.points.map((text, i) => {
                  const isFirst = i === 0;
                  const isLast = i === gateway.points.length - 1;
                  return (
                    <li key={i} className="relative pl-14">
                      <span
                        aria-hidden="true"
                        className="absolute left-4 w-px -translate-x-1/2 bg-line"
                        style={{
                          top: isFirst ? "30px" : "-1.25rem",
                          bottom: isLast ? "calc(100% - 30px)" : "0",
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[14px] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-brand shadow-sm"
                      >
                        <Check size={16} strokeWidth={3.2} />
                      </span>
                      <Reveal delay={i * 120}>
                        <div className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
                          <p className="text-sm leading-relaxed text-ink-soft">
                            {text}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ol>

              {/* Map + legend */}
              <Reveal delay={150} className="lg:col-span-2">
                <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
                  <div className="p-4">
                    <Photo
                      src={gateway.map.src}
                      alt={gateway.map.alt}
                      className="aspect-square w-full object-contain"
                    />
                  </div>
                  {gateway.map.showLegend && (
                    <ul className="space-y-2.5 border-t border-line bg-white p-5">
                      {gateway.legend.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-start gap-3 text-xs leading-snug text-ink-soft"
                        >
                          <span
                            className="mt-0.5 h-3 w-3 shrink-0 rounded-full ring-1 ring-black/10"
                            style={{ backgroundColor: item.color }}
                          />
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
