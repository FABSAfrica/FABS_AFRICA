export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

const COOKIE = "googtrans";

function writeCookie(value, expires = "") {
  const host = window.location.hostname;
  document.cookie = `${COOKIE}=${value};path=/;${expires}`;
  document.cookie = `${COOKIE}=${value};path=/;domain=${host};${expires}`;
}

export function getCurrentLang() {
  const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
  return match ? match[1] : "en";
}

// Switch language. A quick reload keeps React and the translator in sync.
export function setLang(code) {
  if (code === getCurrentLang()) return;
  if (code === "en") {
    writeCookie("", "expires=Thu, 01 Jan 1970 00:00:00 GMT");
  } else {
    writeCookie(`/en/${code}`);
  }
  window.location.reload();
}

// Loads Google's translator only when French is active.
export function initTranslate() {
  if (getCurrentLang() === "en") return;

  document.documentElement.lang = getCurrentLang();

  const holder = document.createElement("div");
  holder.id = "google_translate_element";
  document.body.appendChild(holder);

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,fr",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  const script = document.createElement("script");
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

// Google wraps text nodes in <font> tags. Without this patch, React can crash
// with "removeChild" errors when it re-renders translated text.
export function patchDomForTranslation() {
  if (typeof Node !== "function" || !Node.prototype) return;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return originalInsertBefore.apply(this, arguments);
  };
}