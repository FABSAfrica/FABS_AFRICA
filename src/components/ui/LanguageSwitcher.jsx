import { LANGUAGES, getCurrentLang, setLang } from "../../lib/translate";

// variant="select"  -> dropdown for the desktop contact bar
// variant="buttons" -> pill buttons for the mobile drawer
export default function LanguageSwitcher({ variant = "select", className = "" }) {
  const current = getCurrentLang();

  if (variant === "buttons") {
    return (
      <div className={`notranslate flex gap-2 ${className}`} role="group" aria-label="Language">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLang(lang.code)}
            aria-pressed={current === lang.code}
            className={`min-h-[40px] flex-1 rounded-full border px-4 text-sm font-semibold transition ${
              current === lang.code
                ? "border-brand bg-brand text-white"
                : "border-line bg-white text-ink hover:border-brand hover:text-brand"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="notranslate">
      <label htmlFor="lang-select" className="sr-only">
        Language
      </label>
      <select
        id="lang-select"
        value={current}
        onChange={(e) => setLang(e.target.value)}
        className={`min-w-[100px] cursor-pointer rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/40 [&>option]:text-ink ${className}`}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}