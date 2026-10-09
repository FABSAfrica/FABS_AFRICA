// Single source of truth for the brand palette when a JS hex value is needed
// (inline styles, SVG/legend dots, computed backgrounds, etc.) instead of a
// Tailwind class. These values MUST stay in sync with:
//   - tailwind.config.js -> theme.extend.colors
//   - src/index.css -> the :root custom properties
export const colors = {
  ink: "#151111",
  inkSoft: "#4B4545",
  paper: "#FAF6F2",
  line: "#E9E3DD",
  brand: "#93302F",
  brandDark: "#7A2524",
  brandLight: "#A83B39",
  accent: "#E8963A",
  accentDark: "#B8661A",
};

// Returns `hex` as an rgba() string at the given alpha (0–1), so decorative
// tints/textures reuse a brand color instead of introducing a new one.
export function withAlpha(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}