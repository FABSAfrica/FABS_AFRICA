import { useLocation } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import MembershipBand from "../components/home/MembershipBand";
import { pageContent } from "../data/navigation";

const fallback = {
  eyebrow: "FABS",
  title: "Page content coming soon",
  intro: "This section is being prepared. Check back shortly.",
};

export default function GenericPage() {
  const { pathname } = useLocation();
  const content = pageContent[pathname] || fallback;

  return (
    <>
      <section className="bg-paper border-b border-line">
        <Container className="py-14 sm:py-20">
          <p className="text-sm font-bold text-brand mb-3">{content.eyebrow}</p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink max-w-3xl leading-tight">
            {content.title}
          </h1>
          <p className="text-base sm:text-lg text-ink-soft mt-5 max-w-2xl leading-relaxed">
            {content.intro}
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 prose-content">
              <div className="aspect-[16/9] overflow-hidden mb-8 bg-paper border border-line">
                <img
                  src="/media/placeholder.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-ink-soft leading-relaxed">
                Placeholder content. Replace this block with the page's real copy, imagery and
                any components it needs (for example a speaker grid, a photo gallery or an
                embedded video).
              </p>
              <p className="text-ink-soft leading-relaxed mt-4">
                Because the header, footer and page shell are shared components, updating the
                design system in one place — colours, type, spacing — updates every page
                consistently.
              </p>
            </div>
            <aside className="border border-line p-6 h-fit">
              <h2 className="font-display text-lg font-bold text-ink mb-3">Need something specific?</h2>
              <p className="text-sm text-ink-soft leading-relaxed mb-4">
                Get in touch with the team for registration, media or partnership enquiries.
              </p>
              <Button to="/contact-us" variant="outline" className="w-full">
                Contact us
              </Button>
            </aside>
          </div>
        </Container>
      </section>

      <MembershipBand />
    </>
  );
}