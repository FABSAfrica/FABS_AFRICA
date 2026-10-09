import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Calendar, Search, X } from "lucide-react";
import Container from "../components/ui/Container";
import BlogCard from "../components/blog/BlogCard";
import { CardSkeleton } from "../components/ui/Skeleton";
import { useSanityQuery } from "../hooks/useSanityQuery";
import { POST_LIST_QUERY, POSTS_BY_CATEGORY_QUERY } from "../lib/sanity/queries";
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

export default function BlogListing({
  mode = "all",
  category,
  title = "Newsletter",
  eyebrow = "Insights",
  intro = "News, updates and insights from the Francophone Africa Business Summit.",
  basePath = NEWSLETTER_PATH,
}) {
  const query = mode === "category" ? POSTS_BY_CATEGORY_QUERY : POST_LIST_QUERY;
  const params = mode === "category" ? { category } : {};
  const { data: posts, loading, error, configured } = useSanityQuery(query, params);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sort, setSort] = useState("newest");

  const hasFilters =
    search.trim() !== "" || fromDate !== "" || toDate !== "" || activeCategory !== "";

  const categories = useMemo(() => {
    if (!posts || mode === "category") return [];
    return [...new Set(posts.map((p) => p.category).filter(Boolean))];
  }, [posts, mode]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    const terms = search.toLowerCase().split(/\s+/).filter(Boolean);

    const result = posts.filter((post) => {
      if (activeCategory && post.category !== activeCategory) return false;

      if (terms.length > 0) {
        const haystack = `${post.title || ""} ${post.excerpt || ""} ${post.category || ""}`.toLowerCase();
        if (!terms.every((t) => haystack.includes(t))) return false;
      }

      const day = post.publishedAt ? post.publishedAt.slice(0, 10) : "";
      if (fromDate && (!day || day < fromDate)) return false;
      if (toDate && (!day || day > toDate)) return false;
      return true;
    });

    return [...result].sort((a, b) => {
      const diff = new Date(a.publishedAt || 0) - new Date(b.publishedAt || 0);
      return sort === "newest" ? -diff : diff;
    });
  }, [posts, search, fromDate, toDate, activeCategory, sort]);

  const clearFilters = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setActiveCategory("");
  };

  const hasPosts = !loading && posts?.length > 0;
  const noMatches = hasPosts && filteredPosts.length === 0;

  const showFeatured = hasPosts && !hasFilters && sort === "newest" && filteredPosts.length > 1;
  const featured = showFeatured ? filteredPosts[0] : null;
  const gridPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  const field =
    "rounded-full border border-line bg-white text-sm text-ink transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10";

  return (
    <>
      {/* Hero */}
      {/* <section className="relative overflow-hidden border-b border-line bg-green-300">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <Container className="relative py-16 sm:py-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brand" />
            <span className="text-sm font-bold tracking-wide text-brand">{eyebrow}</span>
          </div>
          <h1 className="mt-4 font-display text-5xl font-bold leading-none tracking-tight text-ink sm:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-xl">
            {intro}
          </p>
        </Container>
      </section> */}

      {/* Listing */}
      <section className="bg-white pb-16 pt-10 sm:pb-24">
        <Container>
          {/* Toolbar */}
          <div className="rounded-3xl border border-line bg-accent p-2 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <label htmlFor="blog-search" className="sr-only">
                  Search articles
                </label>
                <Search
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
                />
                <input
                  id="blog-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, keyword or category"
                  className={`${field} w-full py-3 pl-11 pr-4 placeholder:text-ink-soft/70`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                <label className="relative flex-1 sm:flex-none">
                  <span className="sr-only">From date</span>
                  <Calendar
                    size={14}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
                  />
                  <input
                    type="date"
                    value={fromDate}
                    max={toDate || undefined}
                    onChange={(e) => setFromDate(e.target.value)}
                    aria-label="From date"
                    className={`${field} w-full py-3 pl-9 pr-3 sm:w-44`}
                  />
                </label>
                <span className="text-xs font-semibold text-ink-soft">to</span>
                <label className="relative flex-1 sm:flex-none">
                  <span className="sr-only">To date</span>
                  <Calendar
                    size={14}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
                  />
                  <input
                    type="date"
                    value={toDate}
                    min={fromDate || undefined}
                    onChange={(e) => setToDate(e.target.value)}
                    aria-label="To date"
                    className={`${field} w-full py-3 pl-9 pr-3 sm:w-44`}
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort articles"
                  className={`${field} flex-1 px-4 py-3 lg:flex-none`}
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasFilters}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <X size={15} aria-hidden="true" />
                  Clear
                </button>
              </div>
            </div>

            {categories.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
                {["", ...categories].map((cat) => (
                  <button
                    key={cat || "all"}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                      activeCategory === cat
                        ? "bg-brand text-white"
                        : "bg-white text-ink-soft hover:bg-brand/10 hover:text-brand"
                    }`}
                  >
                    {cat || "All"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasPosts && (
            <p className="mb-8 mt-4 px-1 text-sm text-ink-soft" aria-live="polite">
              Showing <span className="font-bold text-ink">{filteredPosts.length}</span> of{" "}
              <span className="font-bold text-ink">{posts.length}</span>{" "}
              {posts.length === 1 ? "article" : "articles"}
            </p>
          )}
          {!hasPosts && <div className="mb-8" />}

          {!configured && (
            <div className="mb-10 max-w-2xl rounded-2xl border border-line border-l-4 border-l-brand bg-paper p-5 sm:p-6">
              <h2 className="mb-2 font-display text-lg font-bold text-ink">
                Sanity isn't connected yet
              </h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                Add your project credentials to{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs text-ink">.env</code>{" "}
                (copy from{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs text-ink">.env.example</code>
                ) and this page will pull posts live from your Sanity dataset — no other code
                changes needed.
              </p>
            </div>
          )}

          {configured && error && (
            <div className="mb-10 max-w-2xl rounded-2xl border border-line border-l-4 border-l-red-500 bg-paper p-5 sm:p-6">
              <h2 className="mb-2 font-display text-lg font-bold text-ink">Couldn't load posts</h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                {error.message ||
                  "There was a problem reaching Sanity. Check your project ID, dataset and CORS origin settings."}
              </p>
            </div>
          )}

          {/* Featured */}
          {featured && (
            <Link
              to={`${basePath}/${featured.slug}`}
              className="group mb-10 grid overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 lg:grid-cols-5"
            >
              <div className="aspect-[16/10] overflow-hidden bg-paper lg:col-span-3 lg:aspect-auto lg:min-h-[22rem]">
                <img
                  src={
                    featured.mainImage
                      ? urlFor(featured.mainImage).width(1200).height(800).url()
                      : "/media/placeholder.png"
                  }
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-2">
                <div className="flex flex-wrap items-center gap-3">
                  {featured.category && (
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                      {featured.category}
                    </span>
                  )}
                  <span className="text-xs text-ink-soft">{formatDate(featured.publishedAt)}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="mt-4 line-clamp-3 leading-relaxed text-ink-soft">{featured.excerpt}</p>
                )}
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  Read more
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {loading && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
            {hasPosts &&
              gridPosts.map((post) => (
                <BlogCard key={post._id} post={post} basePath={basePath} />
              ))}
          </div>

          {noMatches && (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-line bg-paper px-6 py-14 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Search size={22} aria-hidden="true" />
              </div>
              <p className="font-display text-lg font-bold text-ink">No matching articles</p>
              <p className="mt-1 text-sm text-ink-soft">
                Try different keywords or widen the date range.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                Clear filters <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          )}

          {!loading && configured && !error && posts?.length === 0 && (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-line bg-paper px-6 py-14 text-center">
              <p className="font-display text-lg font-bold text-ink">No posts yet</p>
              <p className="mt-1 text-sm text-ink-soft">
                We're working on new articles. Check back soon.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}