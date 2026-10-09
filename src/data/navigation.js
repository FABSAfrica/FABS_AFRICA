// Inside src/data/navigation.js
// Central nav model — drives desktop dropdowns, mobile accordion, and route stubs.
//
// `clickable` only matters for items that have `children`:
//   false → renders as a button that just opens/closes its dropdown (no navigation)
//   true  → renders as a link to `path` (and can still show a dropdown)
// Items without children are always links.

export const NEWSLETTER_PATH = "/insights/newsletter";
export const BLOG_PATH = "/insights/blog";

export const ROUTES = {
  about: "/about",
  epenaLaw: "/epena-law",
  contact: "/contact-us",
  register: "/register",

  accommodation: "/resources/accommodation",
  travel: "/resources/travel",
  sponsorship: "/resources/sponsorship",

  fabs2024Speakers: "/past-events/fabs-2024/speakers",
  fabs2024MainProgram: "/past-events/fabs-2024/main-program",
  fabs2024SideEvents: "/past-events/fabs-2024/side-events-program",

  fabs2025Summit: "/past-events/fabs-2025/fabs-2025",
  fabs2025WhyLagos: "/past-events/fabs-2025/why-lagos",
  fabs2025Speakers: "/past-events/fabs-2025/speakers",
  roadToFabs2025: "/past-events/fabs-2025/road-to-fabs-2025",
  drcSipAndLearn: "/past-events/fabs-2025/road-to-fabs-2025/drc-sip-and-learn",
};

export const nav = [
  { label: "About", path: ROUTES.about, children: null },
  { label: "Epena Law", path: ROUTES.epenaLaw, children: null },
  {
    label: "Insights",
    path: "/insights",
    clickable: false,
    children: [
      { label: "Newsletter", path: NEWSLETTER_PATH },
      { label: "Blog", path: BLOG_PATH },
    ],
  },
  {
    label: "Resources",
    path: "/resources",
    clickable: false,
    children: [
      { label: "Photo Gallery", path: "/resources/photo-gallery" },
      { label: "Video Gallery", path: "/resources/video-gallery" },
      // { label: "Epena Company Profile", path: "/resources/epena-company-profile" },
      { label: "Travel", path: ROUTES.travel },
      { label: "Accommodation", path: ROUTES.accommodation },
      { label: "Sponsorship", path: ROUTES.sponsorship },
    ],
  },
  {
    label: "Past Events",
    path: "/past-events",
    clickable: false,
    children: [
      {
        label: "FABS 2024",
        path: "/past-events/fabs-2024",
        clickable: false,
        children: [
          { label: "Speakers", path: ROUTES.fabs2024Speakers },
          { label: "Main Program", path: ROUTES.fabs2024MainProgram },
          { label: "Side Events Program", path: ROUTES.fabs2024SideEvents },
        ],
      },
      {
        label: "Road To FABS 2025",
        path: ROUTES.roadToFabs2025,
        clickable: true, // navigates AND opens the dropdown
        children: [
          { label: "DRC - Sip and Learn", path: ROUTES.drcSipAndLearn },
        ],
      },
      {
        label: "FABS 2025",
        path: ROUTES.fabs2025Summit,
        clickable: false,
        children: [
          { label: "Why Lagos?", path: ROUTES.fabs2025WhyLagos },
          { label: "Speakers", path: ROUTES.fabs2025Speakers },
        ],
      },
    ],
  },
];

export const hasChildren = (item) =>
  Array.isArray(item.children) && item.children.length > 0;

export const isNavLink = (item) => !hasChildren(item) || item.clickable === true;

export const contactLink = { label: "Contact Us", path: ROUTES.contact };
export const registerLink = { label: "Register", path: ROUTES.register };

export const contactInfo = {
  phone: "+237 676 66 14 54",
  phoneHref: "tel:+237676661454",
  email: "info@fabs.africa",
};

// TODO: replace "#" with the real profile URLs.
export const socialLinks = [
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/francophone-africa-business-summit/posts/?feedView=all" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/fabsafrica/" },
  { key: "twitter", label: "X (formerly Twitter)", href: "https://x.com/fabsafrica" },
  { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@FABS.AFRICA" },
];

export const footerAbout = [
  { label: "About FABS", path: ROUTES.about },
  { label: "Contact Us", path: ROUTES.contact },
  { label: "Epena Law", path: ROUTES.epenaLaw },
  { label: "Register", path: ROUTES.register },
];

export const footerExplore = [
  { label: "FABS 2025", path: ROUTES.fabs2025Summit },
  { label: "Road To FABS 2025", path: ROUTES.roadToFabs2025 },
  { label: "Past Events", path: "/past-events" },
  { label: "Newsletter", path: NEWSLETTER_PATH },
  { label: "Blog", path: BLOG_PATH },
];

export const pageContent = {
  "/about": {
    eyebrow: "About",
    title: "About the Francophone Africa Business Summit",
    intro: "Amplifying Growth in Africa: From Momentum to Scale.",
  },
  "/epena-law": {
    eyebrow: "Epena Law",
    title: "Epena Law",
    intro: "Learn more about Epena Law and its connection to the summit.",
  },
  "/resources": {
    eyebrow: "Resources",
    title: "Resources",
    intro: "Galleries and reference material from the summit.",
  },
  "/resources/photo-gallery": {
    eyebrow: "Resources",
    title: "Photo Gallery",
    intro: "Moments from the summit.",
  },
  "/resources/video-gallery": {
    eyebrow: "Resources",
    title: "Video Gallery",
    intro: "Watch highlights and sessions from the summit.",
  },
  "/resources/epena-company-profile": {
    eyebrow: "Resources",
    title: "Epena Company Profile",
    intro: "Download or read the Epena company profile.",
  },
  "/past-events": {
    eyebrow: "Past Events",
    title: "Past events",
    intro: "Look back at previous editions of the Francophone Africa Business Summit — from FABS 2024 through FABS 2025.",
  },
  "/past-events/fabs-2024": {
    eyebrow: "Past Events",
    title: "FABS 2024",
    intro: "Highlights and resources from the 2024 edition.",
  },
  "/past-events/fabs-2025": {
    eyebrow: "Past Events",
    title: "FABS 2025",
    intro: "Explore the Road to FABS 2025 build-up events and the FABS 2025 summit itself, both now part of our past events archive.",
  },
  "/past-events/fabs-2025/road-to-fabs-2025": {
    eyebrow: "Past Events · FABS 2025",
    title: "The road to FABS 2025",
    intro: "Events and conversations that led up to the summit in Lagos.",
  },
  "/past-events/fabs-2025/road-to-fabs-2025/drc-sip-and-learn": {
    eyebrow: "Past Events · FABS 2025",
    title: "DRC – Sip & Learn",
    intro: "Details of the DRC Sip & Learn session on the road to FABS 2025.",
  },
  "/past-events/fabs-2025/fabs-2025": {
    eyebrow: "Past Events · FABS 2025",
    title: "Francophone Africa Business Summit 2025",
    intro: "Lagos, Nigeria — February 18th – 19th, 2025. Venue: Lagos Continental Hotel.",
  },
  "/contact-us": {
    eyebrow: "Contact",
    title: "Contact us",
    intro: "Reach the FABS team at info@fabs.africa or +237 676 66 14 54.",
  },
  "/register": {
    eyebrow: "Register",
    title: "Register for FABS 2025",
    intro: "Secure your place at the Francophone Africa Business Summit.",
  },
};