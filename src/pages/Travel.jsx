// Inside src/pages/Travel.jsx
import Container from "../components/ui/Container";
import Photo from "../components/ui/Photo";

const BOOKING_EMAIL = "info@fabsafrica.com";
const SUPPORT_EMAIL = "info@fabs.africa";
const SUPPORT_PHONE = "+237 676 66 14 54";

const highlights = [
  {
    title: "Exclusive reduced rates",
    text: "Special fares to and from the event for FABS participants.",
    icon: (
      <path d="M12 2v20M17 6.5C17 4.6 14.8 3 12 3S7 4.6 7 6.5 9.2 10 12 10s5 1.6 5 3.5S14.8 17 12 17s-5-1.6-5-3.5" />
    ),
  },
  {
    title: "All cabin classes",
    text: "Discounted fares across every class, with excellent onboard service.",
    icon: (
      <path d="M2 16l20-5-4-4-6 2-6-5-2 1 4 6-6 2v3z" />
    ),
  },
  {
    title: "Extensive global network",
    text: "Preferential rates available exclusively to registered participants.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
      </>
    ),
  },
];

function Icon({ children, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Travel() {
  return (
    <>
      {/* Intro + image */}
      <section
        className="relative overflow-hidden py-14 sm:py-20"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 0%, rgba(0,0,0,0.04), transparent 70%), #fafafa",
        }}
      >
        <Container>
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Official Airline Partner
              </span>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-ink sm:text-5xl">
                Fly to FABS 2025 with <span className="text-brand">Air Peace</span>
              </h1>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                <p>
                  We have partnered with Air Peace, our official airline partner for FABS 2025.
                  Our participants can enjoy exclusive reduced rates on their flights to and from
                  the event.
                </p>
                <p>
                  As our official carrier, Air Peace offers FABS attendees special discounted
                  fares across all cabin classes, complemented by their excellent service and
                  extensive global network. These preferential rates are available exclusively to
                  registered FABS participants.
                </p>
                <p>
                  To take advantage of these spfecial fares, view our step-by-step booking
                  instructions to access the dedicated booking platform.
                </p>
                <p>
                  For your discounted bookings, send an email to{" "}
                  <a
                    href={`mailto:${BOOKING_EMAIL}`}
                    className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-brand"
                  >
                    {BOOKING_EMAIL}
                  </a>
                </p>
              </div>

              <a
                href={`mailto:${BOOKING_EMAIL}?subject=FABS%202025%20Discounted%20Flight%20Booking`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Book Now
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            {/* Image */}
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-brand/20 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
                <Photo
                  src="/media/Peace-Air.avif"
                  alt="Air Peace aircraft flying above the clouds"
                  bare
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              {/* Floating label */}
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-black/5 sm:left-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon>
                    <path d="M2 16l20-5-4-4-6 2-6-5-2 1 4 6-6 2v3z" />
                  </Icon>
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Air Peace</p>
                  <p className="text-xs text-ink-soft">Official carrier · FABS 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {/* <div className="mx-auto mt-20 grid max-w-6xl gap-5 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon>{item.icon}</Icon>
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div> */}
        </Container>
      </section>

      {/* Need assistance */}
      <section className="bg-brand py-14 text-white sm:py-16">
        <Container>
          <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Need Assistance?</h2>
              <p className="mt-2 text-white/80">
                For booking support or special requirements, contact us
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
              >
                <Icon className="h-5 w-5 shrink-0">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </Icon>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/70">Email</span>
                  <span className="font-semibold">{SUPPORT_EMAIL}</span>
                </span>
              </a>

              <a
                href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
              >
                <Icon className="h-5 w-5 shrink-0">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                </Icon>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/70">Phone</span>
                  <span className="font-semibold">{SUPPORT_PHONE}</span>
                </span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}