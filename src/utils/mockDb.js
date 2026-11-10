// In-memory stand-in for the database while the blog runs on mock data.
//
// Every function returns records shaped like Prisma's results for
// prisma/schema.prisma, so a real data layer can replace this module later
// without changing the pages, components or API routes that call it.
// New posts, comments and view counts last until the server restarts.
import {
  categories,
  users,
  posts,
  comments,
  DEMO_USER_EMAIL,
} from "../data/mockData.js";

// Next.js bundles pages and API routes separately. Keeping the store on
// globalThis gives them all the same copy within one server process.
const db = (globalThis.__mockDb ??= structuredClone({
  categories,
  users,
  posts,
  comments,
}));

// Return copies, like rows from a database, so callers can't edit the store.
const copy = (value) => structuredClone(value);

const findUser = (email) => db.users.find((user) => user.email === email) ?? null;

const newId = (prefix) =>
  `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const requireString = (value, field) => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`"${field}" is required`);
  }
};

export const getCategories = () => copy(db.categories);

// The account behind the login page's demo button (see src/utils/auth.js).
export const getDemoUser = () => copy(findUser(DEMO_USER_EMAIL));

// Newest first, with the total matching count for pagination.
export const getPosts = ({ page = 1, cat, perPage }) => {
  const matching = db.posts
    .filter((post) => !cat || post.catSlug === cat)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const start = perPage * (page - 1);

  return {
    posts: copy(matching.slice(start, start + perPage)),
    count: matching.length,
  };
};

// Returns null when no post has this slug.
export const getPostBySlug = (slug, { incrementViews = false } = {}) => {
  const post = db.posts.find((item) => item.slug === slug);
  if (!post) return null;
  if (incrementViews) post.views += 1;

  return copy({ ...post, user: findUser(post.userEmail) });
};

export const getComments = (postSlug) =>
  copy(
    db.comments
      .filter((comment) => !postSlug || comment.postSlug === postSlug)
      .map((comment) => ({ ...comment, user: findUser(comment.userEmail) }))
  );

// With a database, the auth adapter creates a User row at sign-in and posts
// and comments point to it by email. Record signed-in users the same way.
const ensureUser = ({ name = null, email, image = null }) => {
  requireString(email, "email");
  if (!findUser(email)) {
    db.users.push({ id: newId("user"), name, email, emailVerified: null, image });
  }
};

export const createPost = ({ title, desc, img, slug, catSlug }, sessionUser) => {
  requireString(title, "title");
  requireString(slug, "slug");
  if (typeof desc !== "string") throw new Error('"desc" is required');
  if (!db.categories.some((category) => category.slug === catSlug)) {
    throw new Error(`Unknown category "${catSlug}"`);
  }
  if (db.posts.some((post) => post.slug === slug)) {
    throw new Error(`A post with the slug "${slug}" already exists`);
  }
  ensureUser(sessionUser);

  const post = {
    id: newId("post"),
    createdAt: new Date().toISOString(),
    slug,
    title,
    desc,
    img: img || null,
    views: 0,
    catSlug,
    userEmail: sessionUser.email,
  };
  db.posts.push(post);
  return copy(post);
};

export const createComment = ({ desc, postSlug }, sessionUser) => {
  requireString(desc, "desc");
  if (!db.posts.some((post) => post.slug === postSlug)) {
    throw new Error(`Unknown post "${postSlug}"`);
  }
  ensureUser(sessionUser);

  const comment = {
    id: newId("comment"),
    createdAt: new Date().toISOString(),
    desc,
    userEmail: sessionUser.email,
    postSlug,
  };
  db.comments.push(comment);
  return copy(comment);
};
