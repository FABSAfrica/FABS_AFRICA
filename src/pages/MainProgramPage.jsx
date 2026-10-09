import Container from "../components/ui/Container";

const EMAIL = "info@fabs.africa";
const PHONE = "+237 676 66 14 54";

export default function MainProgramPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-white">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 rounded-full bg-red-200/30 blur-3xl" />

      <Container>
        <div className="relative grid items-center gap-7 py-10 sm:py-14 lg:grid-cols-2 lg:gap-10">
          {/* Left: Content */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
              Agenda in progress
            </span>

            <h1 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Main{" "}
              <span className="bg-gradient-to-r from-red-800 to-orange-500 bg-clip-text text-transparent">
                Program
              </span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              Please click below to access the initial agenda overview
              outlining the focus areas and discussions slated for the day,
              while additional program specifics continue to be finalized.
            </p>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              If you need any further details about session topics or have
              questions as you make plans to join us February 28th – 29th in
              Lagos, please email:
            </p>

            {/* Contact Card */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>

                <span className="text-xs font-semibold text-ink">
                  {EMAIL}
                </span>
              </a>

              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-100 text-red-800">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>

                <span className="text-xs font-semibold text-ink">
                  {PHONE}
                </span>
              </a>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/media/FABS-Program-Final.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40"
              >
                Download PDF

                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 transition group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 20h16" />
                </svg>
              </a>

              <a
                href="/register"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-red-800 px-4 py-2 text-xs font-bold text-red-800 transition hover:bg-red-800 hover:text-white"
              >
                Register

                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-tr from-red-800/20 via-orange-400/20 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <img
                src="/media/Panel II.JPG"
                alt="Speakers on a panel at the Francophone Africa Business Summit"
                className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/90 p-2.5 backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-600">
                  Francophone Africa Business Summit
                </p>
                <p className="mt-0.5 text-xs font-semibold text-ink">
                  Investing in Francophone Africa: Playbook and Opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}