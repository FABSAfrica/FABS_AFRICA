// src/pages/Register.jsx
import { useState, useEffect } from "react";
import Photo from "../components/ui/Photo";
import { submitRegistration } from "../lib/submitRegistration";

const HERO_IMAGE = "/media/FAB2026Reg.jpeg";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina",
  "Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados",
  "Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana",
  "Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon",
  "Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo (Brazzaville)","Congo (DRC)","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
  "Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
  "Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea",
  "Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan",
  "Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia",
  "Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives",
  "Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal",
  "Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia",
  "Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru",
  "Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa",
  "San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles",
  "Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga",
  "Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu",
  "Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const INDUSTRY_SECTORS = [
  "Agriculture","Banking & Financial Services","Construction","Consulting","Education",
  "Energy & Natural Resources","Extractives & Mining","FMCG & Distribution","Fintech",
  "Government & Public Sector","Healthcare","Infrastructure","Investment & Private Equity",
  "Law & Legal Services","Logistics & Supply Chain","Manufacturing","Media & Communications",
  "Real Estate","Technology","Trade & Commerce","Other",
];

const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Hon."];
const STEPS = ["Personal Info", "Additional Info"];

const inputClass =
  "w-full h-11 rounded-xl border border-line bg-white px-4 text-sm text-ink placeholder:text-ink-soft/50 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15";

const selectClass =
  "w-full h-11 appearance-none rounded-xl border border-line bg-white px-4 pr-10 text-sm text-ink transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15 cursor-pointer";

const labelClass = "mb-1.5 block text-xs font-semibold tracking-wide text-ink";

function ChevronIcon() {
  return (
    <svg
      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowIcon({ back = false, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {back ? <path d="M19 12H5M12 19l-7-7 7-7" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
    </svg>
  );
}

// Wraps a field with a consistent label and error message
function Field({ label, htmlFor, required, error, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// Group of options shown as pill-style radio buttons
function RadioPills({ name, options, value, onChange, error }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={`cursor-pointer select-none rounded-xl border px-4 py-2.5 text-sm transition ${
                checked
                  ? "border-brand bg-brand/5 font-semibold text-brand"
                  : "border-line bg-white text-ink hover:border-brand/40"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt}
                checked={checked}
                onChange={onChange}
                className="sr-only"
              />
              {opt}
            </label>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function Register() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    contactNumber: "",
    company: "",
    jobTitle: "",
    industrySector: "",
    country: "",
    participationType: "",
    preferredLanguage: "",
    preferredLanguageOther: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    attendedFabs2025: "",
    visaInvitation: "",
    hotelReservation: "",
  });

  const [errors, setErrors] = useState({});

  // Jump to the top whenever the step changes or the success message appears.
  // Runs after render, so it works even on small screens where the new
  // content is shorter or taller than the previous one.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [step, submitted]);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Contact number: allow digits and a single "+" at the start only
  const handleContactNumber = (e) => {
    const cleaned = e.target.value
      .replace(/[^\d+]/g, "")
      .replace(/(?!^)\+/g, "");
    setForm((prev) => ({ ...prev, contactNumber: cleaned }));
  };

  const validateStep0 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.gender) e.gender = "Please select your gender";

    if (!form.email.trim()) e.email = "Email is required";
    else if (!form.email.includes("@")) e.email = "Email must contain an @ symbol";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";

    // Zoho marks Contact Number as Mandatory, so it must be required here too.
    if (!form.contactNumber.trim()) e.contactNumber = "Contact number is required";
    else if (!/^\+?\d+$/.test(form.contactNumber))
      e.contactNumber = "Use numbers only, with an optional + at the start";

    if (!form.company.trim()) e.company = "Company/Organisation is required";
    if (!form.jobTitle.trim()) e.jobTitle = "Job title is required";
    if (!form.industrySector) e.industrySector = "Please select your industry";
    if (!form.country) e.country = "Please select your country";
    if (!form.participationType) e.participationType = "Please select participation type";

    if (!form.preferredLanguage) e.preferredLanguage = "Please select a language";
    else if (form.preferredLanguage === "Others" && !form.preferredLanguageOther.trim())
      e.preferredLanguageOther = "Please specify your preferred language";

    return e;
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.attendedFabs2025) e.attendedFabs2025 = "Please answer this question";
    if (!form.visaInvitation) e.visaInvitation = "Please answer this question";
    if (!form.hotelReservation) e.hotelReservation = "Please answer this question";
    return e;
  };

  const handleNext = () => {
    const e = validateStep0();
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(1);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (loading) return;
    const e = validateStep1();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Send the specified language in place of "Others" when applicable
    const payload = {
      ...form,
      preferredLanguage:
        form.preferredLanguage === "Others"
          ? form.preferredLanguageOther.trim()
          : form.preferredLanguage,
    };

    setLoading(true);
    setSubmitError("");
    try {
      await submitRegistration(payload);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const progress = step === 0 ? 50 : 100;

  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">

        {/* Left: poster */}
        <div className="relative hidden min-h-[560px] lg:block">
          <Photo
            src={HERO_IMAGE}
            alt="The Dialogue · Kenya Edition — Bridging Markets, Building Partnerships. 25 November 2026, Nairobi."
            bare
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        {/* Right: form */}
        <div className="flex flex-col px-5 py-10 sm:px-10 xl:px-16">

          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <img src="/media/fabslogo.png" alt="FABS" className="h-10 w-auto" />
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-xs text-ink-soft">
              <span className="font-semibold">{STEPS[step]}</span>
              <span>Step {step + 1} of {STEPS.length}</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h2 className="mt-6 font-display text-2xl font-bold text-ink">Registration received</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                Thank you, <strong className="text-ink">{form.firstName}</strong>. We've received your registration
                and will be in touch at <strong className="text-ink">{form.email}</strong> shortly.
              </p>
              <a
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
              >
                Back to home
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">

              {/* ── STEP 0 ── */}
              {step === 0 && (
                <>
                  <div className="mb-8">
                    <h1 className="font-display text-2xl font-bold text-brand sm:text-3xl">
                      Register for FABS
                    </h1>
                    <p className="mt-2 text-sm text-ink-soft">
                      Tell us a little about yourself. Fields marked <span className="text-red-500">*</span> are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                    {/* Name */}
                    <Field label="Title" htmlFor="title">
                      <div className="relative">
                        <select id="title" value={form.title} onChange={set("title")} className={selectClass}>
                          {TITLES.map((t) => <option key={t}>{t}</option>)}
                        </select>
                        <ChevronIcon />
                      </div>
                    </Field>

                    <Field label="First Name" htmlFor="firstName" required error={errors.firstName}>
                      <input id="firstName" type="text" placeholder="Jane" value={form.firstName} onChange={set("firstName")} className={inputClass} />
                    </Field>

                    <Field label="Last Name" htmlFor="lastName" required error={errors.lastName}>
                      <input id="lastName" type="text" placeholder="Doe" value={form.lastName} onChange={set("lastName")} className={inputClass} />
                    </Field>

                    <Field label="Email Address" htmlFor="email" required error={errors.email}>
                      <input id="email" type="email" placeholder="jane@company.com" value={form.email} onChange={set("email")} className={inputClass} />
                    </Field>

                    <Field label="Contact Number" htmlFor="phone" required error={errors.contactNumber}>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        placeholder="+1234567890"
                        value={form.contactNumber}
                        onChange={handleContactNumber}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Company / Organisation" htmlFor="company" required error={errors.company}>
                      <input id="company" type="text" placeholder="Acme Ltd." value={form.company} onChange={set("company")} className={inputClass} />
                    </Field>

                    <Field label="Job Title" htmlFor="jobTitle" required error={errors.jobTitle}>
                      <input id="jobTitle" type="text" placeholder="Chief Executive Officer" value={form.jobTitle} onChange={set("jobTitle")} className={inputClass} />
                    </Field>

                    <Field label="Industry Sector" htmlFor="industry" required error={errors.industrySector}>
                      <div className="relative">
                        <select id="industry" value={form.industrySector} onChange={set("industrySector")} className={selectClass}>
                          <option value="">Select option</option>
                          {INDUSTRY_SECTORS.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <ChevronIcon />
                      </div>
                    </Field>

                    <Field label="Country" htmlFor="country" required error={errors.country}>
                      <div className="relative">
                        <select id="country" value={form.country} onChange={set("country")} className={selectClass}>
                          <option value="">Select country</option>
                          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <ChevronIcon />
                      </div>
                    </Field>

                    <Field label="Preferred Language" htmlFor="language" required error={errors.preferredLanguage}>
                      <div className="relative">
                        <select id="language" value={form.preferredLanguage} onChange={set("preferredLanguage")} className={selectClass}>
                          <option value="">Select option</option>
                          <option value="English">English</option>
                          <option value="French">French</option>
                          <option value="Others">Others (please specify)</option>
                        </select>
                        <ChevronIcon />
                      </div>
                    </Field>

                    {form.preferredLanguage === "Others" && (
                      <Field
                        label="Please specify your preferred language"
                        htmlFor="languageOther"
                        required
                        error={errors.preferredLanguageOther}
                      >
                        <input
                          id="languageOther"
                          type="text"
                          placeholder="e.g. Swahili, Arabic, Portuguese"
                          value={form.preferredLanguageOther}
                          onChange={set("preferredLanguageOther")}
                          className={inputClass}
                        />
                      </Field>
                    )}

                    {/* Gender */}
                    <div className="md:col-span-2">
                      <p className={labelClass}>Gender <span className="text-red-500">*</span></p>
                      <RadioPills
                        name="gender"
                        options={["Male", "Female"]}
                        value={form.gender}
                        onChange={set("gender")}
                        error={errors.gender}
                      />
                    </div>

                    {/* Participation type */}
                    <div className="md:col-span-2">
                      <p className={labelClass}>Participation Type <span className="text-red-500">*</span></p>
                      <RadioPills
                        name="participationType"
                        options={["Delegate", "Speaker", "Media"]}
                        value={form.participationType}
                        onChange={set("participationType")}
                        error={errors.participationType}
                      />
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end border-t border-line pt-6">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl"
                    >
                      Continue
                      <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </>
              )}

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <>
                  <div className="mb-8">
                    <h1 className="font-display text-2xl font-bold text-brand sm:text-3xl">
                      Additional Information
                    </h1>
                    <p className="mt-2 text-sm text-ink-soft">
                      A few final questions before you submit.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <p className={labelClass}>Did you attend FABS 2025? <span className="text-red-500">*</span></p>
                      <RadioPills
                        name="attendedFabs2025"
                        options={["Yes", "No"]}
                        value={form.attendedFabs2025}
                        onChange={set("attendedFabs2025")}
                        error={errors.attendedFabs2025}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <p className={labelClass}>Will you require a visa invitation letter? <span className="text-red-500">*</span></p>
                      <RadioPills
                        name="visaInvitation"
                        options={["Yes", "No"]}
                        value={form.visaInvitation}
                        onChange={set("visaInvitation")}
                        error={errors.visaInvitation}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <p className={labelClass}>Will you require a hotel reservation? <span className="text-red-500">*</span></p>
                      <RadioPills
                        name="hotelReservation"
                        options={["Yes", "No"]}
                        value={form.hotelReservation}
                        onChange={set("hotelReservation")}
                        error={errors.hotelReservation}
                      />
                    </div>

                    {/* Social media */}
                    <div className="md:col-span-2 rounded-2xl border border-line bg-white p-6">
                      <p className="text-sm font-semibold text-ink">Social media</p>
                      <p className="mt-1 text-xs text-ink-soft">
                        Help us connect with you during the event. All fields are optional.
                      </p>
                      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                        <Field label="LinkedIn" htmlFor="linkedin">
                          <input id="linkedin" type="url" placeholder="linkedin.com/in/you" value={form.linkedin} onChange={set("linkedin")} className={inputClass} />
                        </Field>
                        <Field label="Twitter / X" htmlFor="twitter">
                          <input id="twitter" type="text" placeholder="@yourhandle" value={form.twitter} onChange={set("twitter")} className={inputClass} />
                        </Field>
                        <Field label="Instagram" htmlFor="instagram" className="md:col-span-2">
                          <input id="instagram" type="text" placeholder="@yourhandle" value={form.instagram} onChange={set("instagram")} className={inputClass} />
                        </Field>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="md:col-span-2 rounded-2xl bg-brand/5 p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                        Registering as
                      </p>
                      <p className="mt-2 text-lg font-bold text-ink">
                        {form.title} {form.firstName} {form.lastName}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-soft">
                        {form.jobTitle}{form.company ? `, ${form.company}` : ""}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-soft">{form.email}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {form.participationType && (
                          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                            {form.participationType}
                          </span>
                        )}
                        {form.country && (
                          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-dark">
                            {form.country}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      {submitError}
                    </p>
                  )}

                  <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => { setStep(0); setErrors({}); setSubmitError(""); }}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <ArrowIcon back />
                      Previous
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? "Submitting..." : "Submit registration"}
                      {!loading && <ArrowIcon className="transition-transform group-hover:translate-x-1" />}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}