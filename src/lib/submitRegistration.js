const ZOHO_REGISTER_URL = import.meta.env.VITE_ZOHO_REGISTER_URL;

// Maps form state -> Zoho link names (from the form's HTML export).
export async function submitRegistration(form) {
  const body = new URLSearchParams({
    SingleLine: form.title,
    SingleLine6: form.firstName,
    SingleLine7: form.lastName,
    SingleLine5: form.email,
    SingleLine4: form.contactNumber,
    SingleLine3: form.company,
    SingleLine2: form.jobTitle,
    SingleLine8: form.industrySector,
    SingleLine9: form.country,
    SingleLine1: form.preferredLanguage,
    SingleLine10: form.gender,
    SingleLine11: form.participationType,
    SingleLine12: form.linkedin,
    SingleLine13: form.twitter,
    SingleLine14: form.instagram,
    SingleLine15: form.attendedFabs2025,
    SingleLine16: form.visaInvitation,
    SingleLine17: form.hotelReservation,
    zf_referrer_name: "",
    zf_redirect_url: "",
    zc_gad: "",
  });

  await fetch(ZOHO_REGISTER_URL, {
    method: "POST",
    mode: "no-cors",
    body,
  });
}