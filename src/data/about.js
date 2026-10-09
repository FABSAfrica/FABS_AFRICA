// All About-page copy and media paths live here.
// Rename the image paths to match the real files in public/media/.

export const aboutHero = {
  title: "About the Francophone Africa Business Summit (FABS)",
  image: "/media/Sponosor I.JPG",
};

export const overview = {
  heading: "Francophone Africa Business Summit",
  portrait: { src: "/media/OBJ00110.jpeg", alt: "Speaker addressing the summit" },
  handshake: { src: "/media/conract-us.jpg", alt: "Business partners shaking hands" },
  paragraphs: [
    "Africa is home to over 300 million French speakers – the largest French-speaking population globally. Francophone countries make up 21 of the continent's 55 nations, creating immense potential for trade and cross-border investment.",
    "While interest from companies in English speaking Africa continues growing across sectors like finance, mining, and technology, prospective investors still face significant barriers, ranging from unfamiliarity with the regulatory systems, cross-border legal differences, and not least limited knowledge of the business environments and communities across markets.",
    "However, momentum keeps building. The stability of the CFA currency zone, among other factors, appeals to foreign parties.",
  ],
  callout:
    "To foster more seamless, mutually beneficial deals between these two “worlds”, Epena Law launches the pioneering Francophone Africa Business Summit in Lagos, Nigeria convening business leaders, senior policymakers and investors from economic powerhouses like Nigeria, Ivory Coast, Cameroon, Senegal, DRC and beyond.",
  brochure: {
    label: "Download our brochure",
    href: "public/media/FABS-2025-BROCHURE-EN.pdf", // put the PDF in public/media/
  },
};

// Text wrapped in {{ }} renders bold + italic.
export const amplifying = {
  heading: "Amplifying Growth in Africa: From Momentum to Scale",
  paragraphs: [
    "The Second Edition of the Francophone Africa Business Summit, organised by Epena Law, a law firm headquartered in Cameroon with offices in London and representations in Nigeria and Abidjan, with the support of major operators of the private and public sectors, aims to catalyze new partnerships and scale up existing collaborations between English-speaking and French-speaking African economies. By bringing together a diverse range of stakeholders, FABS 2025 seeks to create a platform for fostering mutual prosperity and growth across the continent.",
    "FABS 2025 builds upon the momentum of the 2024 summit, which marked the first in a series of business summits designed to boost intra-African trade between Francophone and English-speaking Africa. While FABS 2024 laid the foundation for lasting connections, the 2025 edition promises to dive deeper into the various opportunities for growth and expansion available in neighboring francophone markets. The summit will gather investors, decision-makers, and entrepreneurs to explore concrete strategies for scaling up cross-border trade and investment. FABS 2025 is positioned as an essential platform to drive growth and amplify opportunities in the two zones.",
    "Themed {{“Amplifying Growth in Africa: From Momentum to Scale”}}, the Francophone Africa Business Summit 2025 edition will serve as a platform to discuss the most promising opportunities, address pressing challenges, and explore incentivization frameworks to encourage investment flows between Anglophone and Francophone African countries.",
    "In addition to groundbreaking leadership insights and analyses, FABS 2025 promises to offer valuable networking opportunities to forge strategic business relationships that can drive economic transformation across Africa.",
    "This second edition of the Lagos summit continues the annual tradition established in 2024, where policymakers, executives, and investors from Anglophone and Francophone Africa come together to bridge divides and unlock the continent's unbounded potential. Building on the successes and lessons learned from the previous edition, FABS 2025 is poised to be a transformative event that will amplify growth and take the momentum generated in 2024 to new heights.",
  ],
};

// Add one entry per logo. If a file is missing, the name shows as text instead.
export const attendeesHeading = "Some of our 2024 Attendees";
export const attendees = [
  { name: "Mazars", logo: "/media/attendees/mazars.png" },
  { name: "CAT", logo: "/media/attendees/cat.png" },
  // { name: "Company name", logo: "/media/attendees/company.png" },
];