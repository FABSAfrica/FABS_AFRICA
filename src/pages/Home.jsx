import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import UpdatesGrid from "../components/home/UpdatesGrid";
import MembershipBand from "../components/home/MembershipBand";
import NewsletterStrip from "../components/home/NewsletterStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro/>
      <UpdatesGrid />
      <MembershipBand />
      <NewsletterStrip />
    </>
  );
}
