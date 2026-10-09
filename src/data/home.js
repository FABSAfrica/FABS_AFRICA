import { colors } from "../theme/colors";

// All copy for the home page lives here. Edit text and links without touching components.
// Paths point at routes that exist in your nav; repoint them as you build real pages.

export const heroContent = {
  image: "/media/placeholder.png",
  headline: "Enabling private capital investment in Africa",
  cta: { label: "Become a member", to: "/register" },
};

export const introContent = {
  heading:
    "Unlocking the potential of private capital's transformative role in building a prosperous Africa.",
  body: "As AVCA – The African Private Capital Association, we are committed to championing and enabling private capital investment in Africa. We play a significant role as an effective change agent for the industry by educating, equipping and connecting members and key stakeholders with independent industry research, advocacy, best-practice professional development programmes, and unparalleled networking opportunities.",
  links: [
    { label: "Benefits of AVCA Membership", to: "/register" },
    { label: "Meet the Leadership Team", to: "/about" },
    { label: "Discover our Data & Intelligence", to: "/resources" },
    { label: "Explore our Events & Training Opportunities", to: "/past-events/fabs-2025" },
  ],
};

export const updatesHeading =
  "The latest events, research and member updates from AVCA";

export const membershipContent = {
  text: "Our Members include Fund Managers, Direct Investors, Third Party Fund Managers, Institutional Investors, Foundations, Financial Institutions, Professional Services Firms and Academic Institutions.",
  cta: { label: "Why become an AVCA member?", to: "/register" },
};

// Backgrounds are pulled from the central brand palette (src/theme/colors.js)
// instead of one-off hex values, so this carousel always matches the rest of
// the site.
export const statsContent = [
  {
    value: "50+",
    label: "Speakers",
    description: "Expert panels unlocking insights on investment, trade, legal frameworks.",
    bg: colors.brand,
  },
  {
    value: "250+",
    label: "Attendees",
    description: "Leaders, innovators, and decision-makers shaping Africa's economic future.",
    bg: colors.accent,
  },
  {
    value: "15+",
    label: "Partners and sponsors",
    description: "Strategic collaborations driving regional growth and development.",
    bg: colors.brand,
  },
  {
    value: "10+",
    label: "Countries represented",
    description: "Diverse participation from across Francophone Africa and beyond.",
    bg: colors.accent,
  },
  {
    value: "10+",
    label: "Panel Sessions",
    description: "In-depth discussions on critical issues shaping the continent's business landscape.",
    bg: colors.brand,
  },
];

export const convenesContent = [
  {
    headline: "Highlight Untapped Potential for Business, Trade and Investment",
    body: "This summit will uncover the immense yet untapped opportunities for cross-border trade, investment, and economic collaboration between major Anglophone economies like Nigeria and Ghana and Francophone powerhouses such as Ivory Coast, Cameroon, Senegal and more.",
  },
  {
    headline: "Facilitate Strategic Connections",
    body: "The event program facilitates direct B2B exchanges, strategic networking, and partnerships between attendees. The summit has been structured as to catalyze tangible relationships and connections between leaders and businesses looking to expand across Africa.",
  },
  {
    headline: "Shape a Unified Vision for Pan-African Business Integration",
    body: "By convening influential voices from across sub-Saharan Africa, we aim to shape a unifying vision for seamless business integration and cooperation between the Anglophone and Francophone markets in order to fully realize the continent's immense combined potential.",
  },
];