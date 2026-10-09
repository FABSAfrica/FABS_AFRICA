export default function SectionHeading({ eyebrow, title, action, className = "" }) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-sm font-bold text-brand mb-2">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink max-w-2xl leading-tight">
          {title}
        </h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}