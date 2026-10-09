// Inside src/pages/WhyLagos.jsx
import { useState, useEffect, useRef } from "react";
import Photo from "../components/ui/Photo";
import Container from "../components/ui/Container";
import { whyLagos } from "../data/whyLagos";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-brand"
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

// One column of cards joined by a vertical line running through the badges
function Timeline({ items }) {
  return (
    <ul className="space-y-6">
      {items.map((text, i) => {
        const isFirst = i === 0;
        const isLast = i === items.length - 1;

        return (
          <li key={i} className="relative pl-14">
            {/* Connecting line: starts at the first badge, ends at the last badge */}
            <span
              aria-hidden="true"
              className="absolute left-4 w-px -translate-x-1/2 bg-line"
              style={{
                top: isFirst ? "30%" : "-1.5rem", // -1.5rem bridges the gap (space-y-6)
                bottom: isLast ? "70%" : "0",
              }}
            />

            {/* Badge: centered at 30% of the card height */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-[30%] z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white shadow-sm"
            >
              <CheckIcon />
            </span>

            {/* Card */}
            <div className="bg-white p-6 shadow-md">
              <p className="text-[15px] leading-relaxed text-ink">{text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function WhyLagos() {
  const heroRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setZoomed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setZoomed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-[266px] items-center justify-center overflow-hidden bg-ink sm:min-h-[322px]"
      >
        <div
          className={`absolute inset-0 transition-transform duration-[2500ms] ease-out motion-reduce:transition-none ${
            zoomed ? "scale-[1.2]" : "scale-100"
          }`}
        >
          <Photo
            src={whyLagos.heroImage}
            bare
            className="h-full w-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
        <h1 className="relative px-5 text-center text-2xl font-bold text-accent sm:text-4xl">
          {whyLagos.heading}
        </h1>
      </section>

      {/* Light grey background with a faint diamond pattern */}
      <section
        className="py-14 sm:py-20"
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
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <Timeline items={whyLagos.points} />
            <Timeline items={whyLagos.pointsRight} />
          </div>
        </Container>
      </section>
    </>
  );
}