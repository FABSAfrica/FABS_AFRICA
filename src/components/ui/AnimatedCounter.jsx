import { useState, useEffect, useRef } from "react";

// Counts from `start` to `end` once, when it scrolls into view.
export default function AnimatedCounter({
  start = 1,
  end = 40,
  duration = 2000,
  suffix = "",
}) {
  const [value, setValue] = useState(start);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  // Wait until the counter is visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run the count-up
  useEffect(() => {
    if (!inView) return;
    let rafId;
    let startTime;
    const range = end - start;

    const step = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(start + Math.round(progress * range));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, start, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}