// src/data/epena.js  (plain JS: NO JSX allowed in this file)
import { colors } from "../theme/colors";

export const epenaIntro = {
  heading: "About Epena Law",
  tagline: "Like the city of Epena, we are at the center of the legal scene in Africa.",
  body: "Through our deep understanding of both civil and common laws system, we are able to seamlessly navigate through the various legal systems in Africa. We serve the needs of corporates, investment funds, growth companies and financial institutions by providing advisory services on a wide range of corporate and commercial transactions. Our core focus is Africa, where we have uniquely deep roots and knowledge of markets, regulations and key players.",
  callout:
    "We are passionate about innovation and are committed to working with our clients to deliver commercially driven legal solutions tailored to their businesses, disrupting traditional law firm models. We believe that innovation drives diversity and inclusion.",
  readMore: {
    label: "Download PDF",
    href: "/media/Epena-Law-Company-Profile-Eng.pdf",
  },
  badge: { start: 1, end: 40, suffix: "+", line1: "Years of", line2: "Cumulative Experiences" },
  imageTop: { src: "/media/about-epena.png", alt: "Glass skyscrapers seen from below" },
  imageBottom: { src: "/media/about-epena2.png", alt: "Chess pieces stepping up a set of blocks" },
};

export const epenaStats = [
  {
    icon: "award",
    value: "40",
    suffix: "+",
    label: "combined experience in London, Paris, New York, Luxembourg and Africa",
  },
  {
    icon: "dollar",
    value: "2",
    suffix: "B USD",
    label: "Completed transactions in Africa in 2024",
  },
  {
    icon: "building",
    value: "4",
    label: "Representations around the world",
  },
  {
    icon: "badge",
    value: "2",
    label: "Bar qualifications in Francophone African countries",
  },
];

export const gateway = {
  heading: "Your gateway to Francophone Africa",
  points: [
    "With a bilingual team of attorneys dually qualified in both Civil and Common Law, holding 5 bar admissions across Cameroon, Benin and beyond. Epena Law combines deep first-hand experience and a nuanced cultural affinity in facilitating major transactions throughout Francophone and Anglophone Africa.",
    "This unique expertise at the intersection of Africa's legal systems and business environments allows us to adeptly guide clients towards new frontiers of sustainable growth and seamlessly smooth complexity inherent to cross-border expansion.",
    "Through representations and a presence embedded in key African markets like Cameroon, Côte d'Ivoire, Benin and Nigeria plus affiliations with premier law firms across Senegal, DRC and more, we serve as the gateway connecting international investors to the yet untapped opportunities across the Francophone sphere.",
  ],
  map: {
    src: "/media/EPENA-MAP-scaled.webp",
    alt: "Map of Africa showing Epena Law's offices, representations and transactions",
    showLegend: true,
  },
  legend: [
    { color: colors.brandDark, label: "Epena office in Francophone Africa" },
    { color: colors.brand, label: "Epena representation in Francophone African Countries" },
    { color: colors.accent, label: "Significant transactions of Advisory experience in francophone Africa" },
    { color: colors.line, label: "Rest of Francophone Africa" },
  ],
};