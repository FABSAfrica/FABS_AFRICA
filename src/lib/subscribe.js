const ZOHO_URL = import.meta.env.VITE_ZOHO_FORM_URL;

export async function subscribe({ name, email }) {
  const body = new URLSearchParams({
    SingleLine: name || "",
    Email: email,
    zf_referrer_name: "",
    zf_redirect_url: "",
    zc_gad: "",
  });

  await fetch(ZOHO_URL, {
    method: "POST",
    mode: "no-cors", // Zoho sends no CORS headers; the data still arrives
    body,
  });
}