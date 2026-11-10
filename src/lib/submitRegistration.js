const ZOHO_REGISTER_URL = import.meta.env.VITE_ZOHO_REGISTER_URL;

export async function submitRegistration(form) {
  // Use FormData (multipart/form-data) — matches Zoho's HTML export exactly
  const body = new FormData();

  body.append("SingleLine",   form.title);
  body.append("SingleLine6",  form.firstName);
  body.append("SingleLine7",  form.lastName);
  body.append("SingleLine5",  form.email);
  body.append("SingleLine4",  form.contactNumber);
  body.append("SingleLine3",  form.company);
  body.append("SingleLine2",  form.jobTitle);
  body.append("SingleLine8",  form.industrySector);
  body.append("SingleLine9",  form.country);
  body.append("SingleLine1",  form.preferredLanguage);
  body.append("SingleLine10", form.gender);
  body.append("SingleLine11", form.participationType);
  body.append("SingleLine12", form.linkedin);
  body.append("SingleLine13", form.twitter);
  body.append("SingleLine14", form.instagram);
  body.append("SingleLine15", form.attendedFabs2025);
  body.append("SingleLine16", form.visaInvitation);
  body.append("SingleLine17", form.hotelReservation);
  body.append("zf_referrer_name", "");
  body.append("zf_redirect_url",  "");
  body.append("zc_gad",           "");

  await fetch(ZOHO_REGISTER_URL, {
    method: "POST",
    mode: "no-cors",
    body, // FormData sets the correct Content-Type automatically
  });
}