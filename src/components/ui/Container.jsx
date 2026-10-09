export default function Container({ children, className = "" }) {
  return <div className={`container max-w-8xl ${className}`}>{children}</div>;
}
