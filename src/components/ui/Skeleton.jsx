export function CardSkeleton() {
  return (
    <div className="border border-line overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-line/60" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-24 bg-line/60" />
        <div className="h-5 w-full bg-line/60" />
        <div className="h-5 w-2/3 bg-line/60" />
        <div className="h-3 w-full bg-line/40" />
        <div className="h-3 w-4/5 bg-line/40" />
      </div>
    </div>
  );
}
