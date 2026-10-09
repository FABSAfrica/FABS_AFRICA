import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import {
  nav,
  registerLink,
  contactLink,
  contactInfo,
  isNavLink,
} from "../../data/navigation";
import Container from "../ui/Container";
import SocialLinks from "../ui/SocialIcons";
import MobileNav from "./MobileNav";

// Colour rules for items that have a dropdown:
//   clickable     -> yellow
//   not clickable -> grey (opens the dropdown only)
const CLICKABLE_TONE = "text-accent hover:bg-accent/10";
const MUTED_TONE = "text-ink-soft hover:bg-black/[0.04]";

const rowBase =
  "block rounded-lg px-4 py-2.5 text-[14px] font-medium whitespace-nowrap transition-colors";

// Plain leaf link
const rowClass = `${rowBase} text-ink hover:bg-brand/5 hover:text-brand`;

// A single dropdown row. Three cases:
//  1. no children             -> plain link
//  2. children + clickable    -> yellow link that also opens a flyout
//  3. children, not clickable -> grey button that only opens the flyout
const dropdownPanel =
  "rounded-2xl border border-line bg-white p-2 shadow-2xl ring-1 ring-black/5";

function DropdownChild({ child, onNavigate }) {
  const [subOpen, setSubOpen] = useState(false);
  const closeTimer = useRef(null);
  const hasChildren = !!child.children?.length;

  const openSub = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSubOpen(true);
  };

  const scheduleCloseSub = () => {
    closeTimer.current = setTimeout(() => setSubOpen(false), 120);
  };

  if (!hasChildren) {
    return (
      <li>
        <Link to={child.path} className={rowClass} onClick={onNavigate}>
          {child.label}
        </Link>
      </li>
    );
  }

  const clickable = isNavLink(child);
  const tone = clickable ? CLICKABLE_TONE : MUTED_TONE;
  const flexRow = `flex w-full items-center justify-between gap-4 text-left ${rowBase} ${tone}`;

  const rowContent = (
    <>
      {child.label}
      <ChevronRight size={14} className="opacity-70" />
    </>
  );

  return (
    <li
      className="relative"
      onMouseEnter={openSub}
      onMouseLeave={scheduleCloseSub}
    >
      {clickable ? (
        <Link to={child.path} className={flexRow} onClick={onNavigate}>
          {rowContent}
        </Link>
      ) : (
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={subOpen}
          className={flexRow}
          onClick={() => setSubOpen((v) => !v)}
        >
          {rowContent}
        </button>
      )}

      {subOpen && (
        <div
          className="absolute left-full top-0 pl-2 animate-fade-up"
          style={{ animationDuration: "0.15s" }}
        >
          <ul className={`min-w-[220px] ${dropdownPanel}`}>
            {child.children.map((grandchild) => (
              <li key={grandchild.path}>
                <Link
                  to={grandchild.path}
                  className={rowClass}
                  onClick={onNavigate}
                >
                  {grandchild.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function Header() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setOpenIndex(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (idx) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIndex(idx);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120);
  };

  // tone: "plain" (no dropdown), "clickable" (yellow), "muted" (grey)
  const topClass = (active, tone = "plain") => {
    const base =
      "relative flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition-colors";
    if (active) return `${base} bg-brand/10 text-brand`;
    if (tone === "clickable") return `${base} ${CLICKABLE_TONE}`;
    if (tone === "muted") return `${base} ${MUTED_TONE}`;
    return `${base} text-ink hover:bg-black/[0.04] hover:text-brand`;
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "bg-white"
      }`}
    >
      {/* Contact bar */}
      <div
        className={`hidden overflow-hidden bg-gradient-to-r from-brand-dark via-brand to-brand-dark text-white transition-all duration-300 xl:block ${
          scrolled ? "max-h-0" : "max-h-14"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between py-2 text-[13px]">
            <div className="flex items-center gap-6">
              <a
                href={contactInfo.phoneHref}
                className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-accent"
              >
                <Phone size={14} />
                {contactInfo.phone}
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-accent"
              >
                <Mail size={14} />
                {contactInfo.email}
              </a>
            </div>

            <div className="flex items-center gap-4">
              <SocialLinks />

              <label htmlFor="lang-select" className="sr-only">
                Language
              </label>

              <select
                id="lang-select"
                defaultValue="en"
                className="min-w-[100px] cursor-pointer rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/40 [&>option]:text-ink"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </Container>
      </div>

      {/* Main nav */}
      <div className="border-b border-line/70">
        <Container>
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-16 xl:h-[72px]" : "h-20 xl:h-24"
            }`}
          >
            <Link
              to="/"
              className="shrink-0"
              aria-label="Francophone Africa Business Summit — home"
            >
              <img
                src="/media/fabslogo.png"
                alt="Francophone Africa Business Summit"
                className={`w-auto transition-all duration-300 ${
                  scrolled ? "h-10 xl:h-12" : "h-12 xl:h-16"
                }`}
              />
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden items-center gap-1 xl:flex"
              aria-label="Primary"
            >
              {nav.map((item, idx) => {
                const hasMenu = !!item.children?.length;
                const isOpen = openIndex === idx;
                const sectionActive =
                  pathname === item.path ||
                  pathname.startsWith(item.path + "/");

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (hasMenu) openMenu(idx);
                    }}
                    onMouseLeave={() => {
                      if (hasMenu) scheduleClose();
                    }}
                  >
                    {isNavLink(item) ? (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          topClass(isActive, hasMenu ? "clickable" : "plain")
                        }
                        aria-expanded={hasMenu ? isOpen : undefined}
                        aria-haspopup={hasMenu ? true : undefined}
                      >
                        {item.label}
                        {hasMenu && (
                          <ChevronDown
                            size={15}
                            className={`transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </NavLink>
                    ) : (
                      <button
                        type="button"
                        className={topClass(sectionActive, "muted")}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                      >
                        {item.label}
                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}

                    {/* Dropdown */}
                    {hasMenu && isOpen && (
                      <div
                        className="absolute left-0 top-full min-w-[230px] pt-3 animate-fade-up"
                        style={{ animationDuration: "0.15s" }}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-7 top-[5px] h-3 w-3 rotate-45 rounded-sm border-l border-t border-line bg-white"
                        />
                        <ul className={`relative ${dropdownPanel}`}>
                          {item.children.map((child) => (
                            <DropdownChild
                              key={child.path}
                              child={child}
                              onNavigate={() => setOpenIndex(null)}
                            />
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}

              <NavLink
                to={contactLink.path}
                className={({ isActive }) => topClass(isActive)}
              >
                {contactLink.label}
              </NavLink>
            </nav>

            {/* Register button and mobile menu */}
            <div className="flex items-center gap-3">
              <Link
                to={registerLink.path}
                className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-brand to-accent px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:shadow-xl xl:inline-flex"
              >
                {registerLink.label}
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <button
                type="button"
                className="-mr-2 rounded-full p-2.5 text-ink transition hover:bg-black/[0.05] xl:hidden"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}