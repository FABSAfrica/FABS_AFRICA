// src/components/home/UpdatesGrid.jsx
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import BlogCard from "../blog/BlogCard";
import { CardSkeleton } from "../ui/Skeleton";
import { useSanityQuery } from "../../hooks/useSanityQuery";
import { LATEST_POSTS_QUERY } from "../../lib/sanity/queries";
import { BLOG_PATH } from "../../data/navigation";

export default function UpdatesGrid() {
  const { data: posts, loading, error, configured } = useSanityQuery(LATEST_POSTS_QUERY);

  return (
    <section
      className="py-16 sm:py-24"
      style={{
        background:
          "radial-gradient(50% 40% at 90% 0%, rgba(0,0,0,0.035), transparent 70%), #fafafa",
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="What's new"
          title="The latest from the Francophone Africa Business Summit"
          action={
            <Link
              to={BLOG_PATH}
              className="group inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-5 py-2.5 text-sm font-semibold text-brand shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              Go to Blog
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          }
        />

        {!configured && (
          <p className="mt-10 text-sm text-ink-soft">
            Add your Sanity credentials to <code className="font-mono text-xs">.env</code> to show
            the latest posts here.
          </p>
        )}

        {configured && error && (
          <p className="mt-10 text-sm text-ink-soft">
            Couldn't load the latest posts right now. Please try again later.
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading && Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}

          {!loading &&
            posts?.length > 0 &&
            posts.map((post) => (
              <BlogCard key={post._id} post={post} basePath={BLOG_PATH} />
            ))}
        </div>

        {!loading && configured && !error && posts?.length === 0 && (
          <p className="mt-2 text-ink-soft">No posts published yet — check back soon.</p>
        )}
      </Container>
    </section>
  );
}