import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { urlFor } from "../../lib/sanity/image";
import { NEWSLETTER_PATH } from "../../data/navigation";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogCard({ post, basePath = NEWSLETTER_PATH }) {
  const imageSrc = post.mainImage
    ? urlFor(post.mainImage).width(800).height(500).url()
    : "/media/placeholder.png";

  return (
    <Link
      to={`${basePath}/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand shadow-sm backdrop-blur">
            {post.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-medium text-ink-soft">{formatDate(post.publishedAt)}</span>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
            {post.excerpt}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          Read more
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}