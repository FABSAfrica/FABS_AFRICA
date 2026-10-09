import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Camera,
  ArrowLeft,
} from "lucide-react";
import Container from "../components/ui/Container";
import { ROUTES } from "../data/navigation";

/* ------------------------------------------------------------------ */
/* IMAGES                                                              */
/* Put all photos in: src/assets/road-to-fab-2025/                     */
/* Any file name works (jpg, jpeg, png, webp). They load automatically */
/* in alphabetical/numeric order.                                      */
/* ------------------------------------------------------------------ */
const IMAGE_FOLDER = "src/assets/road-to-fab-2025";

const imageModules = import.meta.glob(
  "../assets/road-to-fab-2025/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" }
);

const ALL_PHOTOS = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url], i) => ({ id: i + 1, src: url }));

// Which photo to use as the hero (0 = first photo in the folder).
const HERO_PHOTO_INDEX = 0;

const PER_ROW = 7; // images per row on large screens
const PAGE_SIZE = PER_ROW * 2; // load 2 rows (14 images) at a time

export default function DrcSipAndLearn() {
  const [broken, setBroken] = useState(() => new Set());
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState(null); // index in `photos` or null

  // Only keep photos that actually loaded.
  const photos = useMemo(
    () => ALL_PHOTOS.filter((p) => !broken.has(p.id)),
    [broken]
  );
  const heroPhoto = photos[HERO_PHOTO_INDEX] || photos[0];
  const shown = photos.slice(0, visibleCount);
  const remaining = Math.max(photos.length - visibleCount, 0);

  const markBroken = useCallback((id) => {
    setBroken((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  /* Lightbox controls */
  const closeLightbox = () => setLightbox(null);
  const lbPrev = useCallback(
    () => setLightbox((i) => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );
  const lbNext = useCallback(
    () => setLightbox((i) => (i + 1) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, lbPrev, lbNext]);

  return (
    <>
      {/* ---------------- Hero (single image, 40% tint) ---------------- */}
      <section className="relative h-[30vh] min-h-[190px] w-full overflow-hidden bg-ink md:h-[37.5vh]">
        {heroPhoto && (
          <img
            src={heroPhoto.src}
            alt="DRC - Sip and Learn"
            onError={() => markBroken(heroPhoto.id)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* 40% tint overlay */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        {/* Title card (small glass card) */}
        <div className="absolute inset-x-0 bottom-0 z-10 pb-5 md:pb-8">
          <Container>
            <div className="inline-block rounded-2xl bg-white/90 px-5 py-3 shadow-2xl backdrop-blur-md md:px-8 md:py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Road to FABS 2025
              </p>
              <h1 className="mt-1 font-display text-xl font-semibold text-ink md:text-3xl">
                DRC - Sip and Learn
              </h1>
            </div>
          </Container>
        </div>
      </section>

      {/* ---------------- Gallery ---------------- */}
      <section className="py-16 md:py-24">
        <Container>
          <Link
            to={ROUTES.roadToFabs2025}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-brand"
          >
            <ArrowLeft size={16} />
            Back to Road to FABS 2025
          </Link>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
              <Camera size={14} />
              Gallery
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-brand md:text-4xl">
              Photo Gallery of DRC - Sip and Learn
            </h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand to-accent" />
          </div>

          {/* 7 per row on large screens */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {shown.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-line/40 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
                aria-label={`Open photo ${i + 1}`}
              >
                <img
                  src={photo.src}
                  alt={`DRC - Sip and Learn photo ${i + 1}`}
                  loading="lazy"
                  onError={() => markBroken(photo.id)}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-brand/0 transition group-hover:bg-brand/20" />
              </button>
            ))}
          </div>

          {photos.length === 0 && (
            <p className="mt-12 text-center text-ink-soft">
              No photos found in <code>{IMAGE_FOLDER}</code>. Check the image
              names and extension.
            </p>
          )}

          {/* Load more */}
          {remaining > 0 && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-accent px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Load more
                <ChevronDown
                  size={18}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </button>
              <p className="text-sm text-ink-soft">
                Showing {shown.length} of {photos.length} photos
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* ---------------- Lightbox (natural image size) ---------------- */}
      {lightbox !== null && photos[lightbox] && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          {/* Fixed controls (stay in place while scrolling a large image) */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="fixed right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              lbPrev();
            }}
            aria-label="Previous"
            className="fixed left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:left-8"
          >
            <ChevronLeft size={26} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              lbNext();
            }}
            aria-label="Next"
            className="fixed right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-8"
          >
            <ChevronRight size={26} />
          </button>

          <p className="fixed bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
            {lightbox + 1} / {photos.length}
          </p>

          {/* Image at its original size; scrolls if larger than the screen */}
          <div className="flex min-h-full min-w-full items-center justify-center p-4">
            <img
              key={photos[lightbox].id}
              src={photos[lightbox].src}
              alt={`DRC - Sip and Learn photo ${lightbox + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="m-auto h-auto w-auto max-w-none rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}