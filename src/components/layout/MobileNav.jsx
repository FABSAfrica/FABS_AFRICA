import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown, Phone, Mail } from "lucide-react";
import { nav, registerLink, contactLink, contactInfo } from "../../data/navigation";
import SocialLinks from "../ui/SocialIcons";

// Recursive accordion row so any depth of nav nesting works — we currently
// need two levels: Past Events -> FABS 2025 -> [Road To FABS 2025, FABS 2025].
function MobileNavItem({ item, level = 0, onNavigate }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  if (!hasChildren) {
    return (
      <Link
        to={item.path}
        onClick={onNavigate}
        className={`flex items-center min-h-[44px] ${
          level > 0
            ? "py-3 pl-3 text-[15px] text-ink-soft"
            : "py-4 text-[17px] font-medium text-ink"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        className={`w-full flex items-center justify-between min-h-[44px] text-left ${
          level > 0
            ? "py-3 pl-3 text-[15px] text-ink-soft font-medium"
            : "py-4 text-[17px] font-medium text-ink"
        }`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <ChevronDown
          size={20}
          className={`text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="pb-2 pl-3">
          {item.children.map((child) => (
            <MobileNavItem
              key={child.path}
              item={child}
              level={level + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileNav({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-ink/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl flex flex-col animate-drawer-in">
        <div className="flex items-center justify-between h-20 px-5 border-b border-line shrink-0">
          <img
            src="/media/fabslogo.png"
            alt="Francophone Africa Business Summit"
            className="h-10 w-auto"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-2 text-ink"
          >
            <X size={26} />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-5 py-4"
          aria-label="Mobile primary"
        >
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.label}>
                <MobileNavItem item={item} onNavigate={onClose} />
              </li>
            ))}
            <li>
              <MobileNavItem item={contactLink} onNavigate={onClose} />
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t border-line space-y-1 text-sm text-ink-soft">
            <a
              href={contactInfo.phoneHref}
              className="flex items-center gap-2 py-3 min-h-[44px]"
            >
              <Phone size={15} />
              {contactInfo.phone}
            </a>

            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-2 py-3 min-h-[44px]"
            >
              <Mail size={15} />
              {contactInfo.email}
            </a>

            <SocialLinks className="pt-3 text-brand" />
          </div>
        </nav>

        <div className="p-5 border-t border-line shrink-0">
          <Link
            to={registerLink.path}
            onClick={onClose}
            className="flex items-center justify-center bg-gradient-to-r from-brand to-accent text-white font-semibold py-3.5 w-full"
          >
            {registerLink.label}
          </Link>
        </div>
      </div>
    </div>
  );
}