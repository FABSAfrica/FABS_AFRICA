// src/pages/Newsletter.jsx
import { useState } from "react";
import { Mail, User, ArrowRight, Check, ShieldCheck } from "lucide-react";
import Container from "../components/ui/Container";
import Photo from "../components/ui/Photo";
import { subscribe } from "../lib/subscribe";

const perks = [
  "Insights on Francophone and Anglophone markets",
  "Summit news, speakers and event updates",
  "Deal trends and opportunities across Africa",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError("");
    try {
      await subscribe({ name, email });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full min-h-[48px] rounded-xl border border-line bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <section
      className="relative overflow-hidden py-14 sm:py-20"
      style={{
        background:
          "radial-gradient(60% 50% at 10% 0%, rgba(0,0,0,0.04), transparent 70%), #fafafa",
      }}
    >
      {/* Soft decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 hidden h-72 w-72 rounded-full bg-accent/20 blur-3xl lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 hidden h-72 w-72 rounded-full bg-brand/10 blur-3xl lg:block"
      />

      <Container>
        <div className="relative mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 md:grid-cols-2">
          {/* Left: brand panel */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-accent md:block">
            <Photo
              src="/media/newsletter-hero.jpg"
              alt=""
              bare
              className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
            />
            <div
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent/30 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col justify-between p-10 text-white">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                FABS Newsletter
              </span>

              <div>
                <h2 className="text-2xl font-bold leading-tight lg:text-3xl">
                  Africa's business landscape, in your inbox.
                </h2>
                <ul className="mt-6 space-y-3">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm text-white/90">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Check size={12} strokeWidth={3.2} />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="flex flex-col justify-center p-8 text-center sm:p-12">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <Mail size={24} strokeWidth={1.8} />
            </span>

            <h1 className="mt-5 font-display text-2xl font-bold leading-tight text-brand sm:text-3xl">
              Stay Connected – Subscribe to Our Newsletter
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Fill in the form below to subscribe and keep your finger on the pulse of
              Africa's business landscape.
            </p>

            {submitted ? (
              <div
                role="status"
                className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-brand/10 px-4 py-4 text-sm font-semibold text-brand"
              >
                <Check size={18} strokeWidth={3} />
                You're subscribed. Look out for our next update.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
                <div className="relative">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Your email address
                  </label>
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/60"
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="newsletter-name" className="sr-only">
                    Your name
                  </label>
                  <User
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/60"
                  />
                  <input
                    id="newsletter-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing up..." : "Sign up"}
                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>

                {error && (
                  <p role="alert" className="text-center text-xs text-red-600">
                    {error}
                  </p>
                )}

                <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-ink-soft">
                  <ShieldCheck size={14} className="text-brand" />
                  Your email is safe with us, we don't spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}