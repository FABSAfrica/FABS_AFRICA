import { useState } from "react";

// Image that never leaves an empty hole: shows a brand gradient (or nothing, if `bare`) on error.
export default function Photo({ src, alt = "", className = "", bare = false }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return bare ? null : (
      <div aria-hidden="true" className={`bg-gradient-to-br from-brand to-accent ${className}`} />
    );
  }
  return <img src={src} alt={alt} onError={() => setOk(false)} className={className} />;
}