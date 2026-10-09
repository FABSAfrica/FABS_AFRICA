import { contactHero, contactCard } from "../data/contact";

function EmailIcon({ type }) {
  if (type === "inbox") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12h4l2 3h6l2-3h4" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M5.5 5h13l2.5 7v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7l2.5-7z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "sponsor") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path
          d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.3c0 1.4 1.3 1.9 3 2.2c1.7.3 3 .8 3 2.2c0 1.3-1.3 2.3-3 2.3s-3-1.1-3-2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6l9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M6.5 3.5c.6 0 1.1.4 1.3.9l1 2.6c.2.5.1 1-.2 1.4L7.3 10c1 2.4 3.3 4.7 5.7 5.7l1.6-1.3c.4-.3.9-.4 1.4-.2l2.6 1c.5.2.9.7.9 1.3v2.2c0 1-1 1.7-2 1.5C11.6 19 5 12.4 3.7 6.5c-.2-1 .5-2 1.5-2h1.3z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* Left: heading */}
        <div>
          <h1 className="text-3xl font-bold leading-tight text-[#7A1E1E] sm:text-4xl lg:text-[42px]">
            {contactHero.heading}
          </h1>
        </div>

        {/* Right: enquiries card */}
        <div className="bg-[#7A1E1E] px-8 py-10 text-white sm:px-12 sm:py-14">
          <h2 className="text-lg font-semibold sm:text-xl">{contactCard.heading}</h2>
          <div className="mt-3 h-[3px] w-20 bg-[#E8963C]" />

          <div className="mt-8 space-y-8">
            {contactCard.sections.map((item, i) => (
              <div key={item.heading}>
                <h3 className="text-base font-semibold sm:text-lg">{item.heading}</h3>

                <div className="mt-3 flex items-center gap-3 text-sm sm:text-base">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/40">
                    <EmailIcon type={item.emailIcon} />
                  </span>
                  <a href={`mailto:${item.email}`} className="hover:underline">
                    {item.email}
                  </a>
                </div>

                <div className="mt-3 flex items-center gap-3 text-sm sm:text-base">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/40">
                    <PhoneIcon />
                  </span>
                  <a href={item.phoneHref} className="hover:underline">
                    {item.phone}
                  </a>
                </div>

                {i < contactCard.sections.length - 1 && (
                  <div className="mt-8 h-px w-full bg-white/25" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}