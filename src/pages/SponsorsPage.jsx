// Inside src/pages/SponsorsPage.jsx
import { useState, useEffect, useRef } from "react";
import { Eye, KeyRound, Handshake, Megaphone, Building2, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Photo from "../components/ui/Photo";

// Update these paths to your real files.
const HERO_IMAGE = "/media/Panel VI.JPG";
const CHESS_IMAGE = "/media/about-epena2.png";
const PACKAGE_HREF = "/media/fabs-brochure-en2.pdf";

const benefits = [
  {
    icon: Eye,
    text: "Prime visibility among diverse decision-makers and companies propelling engagement with high-potential Francophone economies",
  },
  {
    icon: KeyRound,
    text: "Access to visionary insights from agenda-setting keynotes and panel discussions charting strategic expansion opportunities",
  },
  {
    icon: Handshake,
    text: "High-level networking with leading authorities and business innovators forging ties between linguistic spheres amidst rising intra-African investment",
  },
  {
    icon: Megaphone,
    text: "Top-tier branding across event promotions through prominent media partners",
  },
  {
    icon: Building2,
    text: "Visibility reinforcing your organization as an authority shaping the landscape of this unlocked potential",
  },
];

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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

function BenefitCard({ item, className = "" }) {
  const Icon = item.icon;
  return (
    <div
      className={`rounded-2xl border border-line bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon size={24} strokeWidth={1.7} />
      </span>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.text}</p>
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1400px] items-stretch lg:grid-cols-2">
          <div className="flex items-center px-5 py-14 sm:px-10 sm:py-20 lg:px-16">
            <Reveal className="mx-auto max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Sponsorship
              </span>

              <h1 className="mt-5 font-display text-3xl font-bold leading-tight text-brand sm:text-5xl">
                Pioneer New Frontiers as a FABS Sponsor
              </h1>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                <p>
                  As an unprecedented summit convening influential leaders to shape the next era
                  of pan-African collaboration, sponsoring the Francophone Africa Business Summit
                  aligns your brand with a pioneering movement.
                </p>
                <p>
                  This summit will spark crucial dialogue between policymakers, investors and
                  executives navigating the new frontier of Francophone African markets – where
                  early movers gain positional advantage.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href={PACKAGE_HREF}
                  download
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Download our sponsorship package
                  <Download
                    size={17}
                    className="transition-transform group-hover:translate-y-0.5"
                  />
                </a>
                <Link
                  to="/contact-us"
                  className="group inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-6 py-3.5 text-[15px] font-semibold text-brand transition hover:border-brand hover:shadow-md"
                >
                  Become a sponsor
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="relative min-h-[320px] lg:min-h-[640px]">
            <Photo
              src={HERO_IMAGE}
              alt="Speakers on stage in front of the Our Sponsors screen"
              bare
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent lg:from-white/30"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* Sponsorship provides */}
      <section
        className="py-14 sm:py-24"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(0,0,0,0.04), transparent 70%), #f7f7f7",
        }}
      >
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-ink sm:text-4xl">
              FABS Sponsorship Provides
            </h2>
            <span
              className="mx-auto mt-4 block h-1 w-12 rounded-full bg-accent"
              aria-hidden="true"
            />
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-6xl items-center gap-6 lg:grid-cols-3">
            {/* Left column */}
            <div className="space-y-6">
              <Reveal delay={0}>
                <BenefitCard item={benefits[0]} />
              </Reveal>
              <Reveal delay={120}>
                <BenefitCard item={benefits[2]} />
              </Reveal>
            </div>

            {/* Centre image */}
            <Reveal delay={100} className="order-first lg:order-none">
              <div className="relative mx-auto max-w-sm">
                <div
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-brand/20 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
                  <Photo
                    src={CHESS_IMAGE}
                    alt="Chess pieces stepping up a set of blocks"
                    bare
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            {/* Right column */}
            <div className="space-y-6">
              <Reveal delay={60}>
                <BenefitCard item={benefits[1]} />
              </Reveal>
              <Reveal delay={180}>
                <BenefitCard item={benefits[3]} />
              </Reveal>
            </div>
          </div>

          {/* Fifth benefit, centred below */}
          <Reveal className="mx-auto mt-6 max-w-2xl">
            <div className="flex items-center gap-5 rounded-2xl border border-line bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Building2 size={24} strokeWidth={1.7} />
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">{benefits[4].text}</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}