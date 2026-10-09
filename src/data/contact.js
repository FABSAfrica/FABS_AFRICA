// All Contact-page copy lives here.
import { contactInfo } from "./navigation";

export const contactHero = {
  heading:
    "Contact us for more information about the Francophone Africa Business Summit.",
};

export const contactCard = {
  heading: "For all enquiries, please contact the FABS team:",
  sections: [
    {
      heading: "General Enquiries:",
      email: contactInfo.email,
      phone: contactInfo.phone,
      phoneHref: contactInfo.phoneHref,
      emailIcon: "mail",
    },
    {
      heading: "Registration:",
      email: "registration@fabs.africa",
      phone: contactInfo.phone,
      phoneHref: contactInfo.phoneHref,
      emailIcon: "inbox",
    },
    {
      heading: "Sponsorship Opportunities & Partnerships:",
      email: "sponsors@fabs.africa",
      phone: contactInfo.phone,
      phoneHref: contactInfo.phoneHref,
      emailIcon: "sponsor",
    },
  ],
};