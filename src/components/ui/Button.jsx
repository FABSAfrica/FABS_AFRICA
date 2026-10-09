// Inside src/components/ui/Button.jsx
import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-semibold rounded-lg transition duration-150 focus-visible:outline-2";

const variants = {
  primary: "bg-gradient-to-r from-brand to-accent text-white hover:brightness-110",
  outline: "border border-brand text-brand hover:bg-brand hover:text-white",
  ghost: "text-ink hover:text-brand",
  inverse: "bg-white text-brand hover:bg-paper",
};

export default function Button({ to, href, variant = "primary", children, className = "" }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button className={cls}>{children}</button>;
}