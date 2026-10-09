import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import Container from "../ui/Container";
import SocialLinks from "../ui/SocialIcons";
import {
  footerAbout,
  footerExplore,
  contactInfo,
} from "../../data/navigation";

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold text-white mb-4">
        {title}
      </h3>

      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.path}>
            <Link
              to={l.path}
              className="text-sm text-white/70 hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <LinkColumn title="About FABS" links={footerAbout} />

          <LinkColumn title="Explore" links={footerExplore} />

          <div>
            <h3 className="font-display text-lg font-bold text-white mb-4">
              Contact
            </h3>

            <a
              href={contactInfo.phoneHref}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-accent mb-2.5"
            >
              <Phone size={15} />
              {contactInfo.phone}
            </a>

            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-accent"
            >
              <Mail size={15} />
              {contactInfo.email}
            </a>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-white mb-4">
              Follow
            </h3>

            <SocialLinks className="text-white/80" />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/50">
          © {new Date().getFullYear()} Francophone Africa Business Summit. All
          rights reserved.
        </div>
      </Container>
    </footer>
  );
}