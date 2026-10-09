
const POST_PROJECTION = `{
  _id,
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,
  "mainImage": mainImage,
  "category": category->title
}`;

// Every published post — used by the Blog listing, which shows everything.
export const POST_LIST_QUERY = `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${POST_PROJECTION}
`;

export const LATEST_POSTS_QUERY = `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...4] ${POST_PROJECTION}
`;

export const POSTS_BY_CATEGORY_QUERY = `
*[_type == "post" && defined(slug.current) && category->title == $category] | order(publishedAt desc) ${POST_PROJECTION}
`;

export const POST_BY_SLUG_QUERY = `
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  excerpt,
  publishedAt,
  body,
  "mainImage": mainImage,
  "category": category->title,
  "author": author->name
}
`;