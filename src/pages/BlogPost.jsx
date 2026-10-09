import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Container from "../components/ui/Container";
import { useSanityQuery } from "../hooks/useSanityQuery";
import { POST_BY_SLUG_QUERY } from "../lib/sanity/queries";
import { urlFor } from "../lib/sanity/image";
import { NEWSLETTER_PATH } from "../data/navigation";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Maps Sanity block content to styled elements matching the site's design system.
const portableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-bold text-ink mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-ink-soft leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-5 my-6 text-lg font-display text-ink italic">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(1200).url()}
        alt={value.alt || ""}
        className="w-full my-8 border border-line"
      />
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} className="text-ink underline decoration-accent hover:text-brand">
        {children}
      </a>
    ),
  },
};

export default function BlogPost({ basePath = NEWSLETTER_PATH, backLabel = "Newsletter" }) {
  const { slug } = useParams();
  const { data: post, loading, error, configured } = useSanityQuery(POST_BY_SLUG_QUERY, { slug });

  if (!configured) {
    return (
      <Container className="py-20">
        <div className="border border-line bg-white p-6 max-w-2xl">
          <h1 className="font-display text-lg font-bold text-ink mb-2">Sanity isn't connected yet</h1>
          <p className="text-sm text-ink-soft leading-relaxed">
            Add your project credentials to .env and individual {backLabel.toLowerCase()} posts will render here
            automatically.
          </p>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-20 animate-pulse">
        <div className="h-4 w-32 bg-line/60 mb-6" />
        <div className="h-10 w-3/4 bg-line/60 mb-4" />
        <div className="aspect-[16/9] bg-line/60 mb-8" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-line/40" />
          <div className="h-4 w-full bg-line/40" />
          <div className="h-4 w-2/3 bg-line/40" />
        </div>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container className="py-20">
        <div className="border border-line bg-white p-6 max-w-2xl">
          <h1 className="font-display text-lg font-bold text-ink mb-2">Post not found</h1>
          <p className="text-sm text-ink-soft leading-relaxed mb-4">
            {error?.message || "This post may have been unpublished or the link is out of date."}
          </p>
          <Link to={basePath} className="text-sm font-semibold text-ink hover:text-brand">
            ← Back to {backLabel}
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <article>
      <section className="bg-paper border-b border-line">
        <Container className="py-14 sm:py-20">
          <Link
            to={basePath}
            className="text-sm font-semibold text-ink-soft hover:text-ink"
          >
            ← {backLabel}
          </Link>
          {post.category && (
            <p className="text-sm font-bold text-brand mt-5 mb-3">{post.category}</p>
          )}
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink max-w-3xl leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-ink-soft mt-5">
            {formatDate(post.publishedAt)}
            {post.author && ` · ${post.author}`}
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto">
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(1200).url()}
              alt=""
              className="w-full mb-10 border border-line"
            />
          )}
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-ink-soft">{post.excerpt}</p>
          )}
        </div>
      </Container>
    </article>
  );
}