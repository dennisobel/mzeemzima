// Mock content for running the blog without a database.
// Each record has the same fields as the matching model in prisma/schema.prisma.
// The data is loaded once per server process: restart `pnpm dev` after editing.

// The account the login page's "demo account" button signs in as.
export const DEMO_USER_EMAIL = "demo@example.com";

export const categories = [
  { id: "cat_style", slug: "style", title: "Style", img: "/style.png" },
  { id: "cat_fashion", slug: "fashion", title: "Fashion", img: "/fashion.png" },
  { id: "cat_food", slug: "food", title: "Food", img: "/food.png" },
  { id: "cat_travel", slug: "travel", title: "Travel", img: "/travel.png" },
  { id: "cat_culture", slug: "culture", title: "Culture", img: "/culture.png" },
  { id: "cat_coding", slug: "coding", title: "Coding", img: "/coding.png" },
];

export const users = [
  {
    id: "user_amara",
    name: "Amara Okafor",
    email: "amara@example.com",
    emailVerified: null,
    image: "/mock/avatars/amara.svg",
  },
  {
    id: "user_daniel",
    name: "Daniel Mwangi",
    email: "daniel@example.com",
    emailVerified: null,
    image: "/mock/avatars/daniel.svg",
  },
  {
    id: "user_sofia",
    name: "Sofia Lindqvist",
    email: "sofia@example.com",
    emailVerified: null,
    image: "/mock/avatars/sofia.svg",
  },
  {
    id: "user_kenji",
    name: "Kenji Watanabe",
    email: "kenji@example.com",
    emailVerified: null,
    image: "/mock/avatars/kenji.svg",
  },
  {
    id: "user_demo",
    name: "Demo Writer",
    email: DEMO_USER_EMAIL,
    emailVerified: null,
    image: "/mock/avatars/demo.svg",
  },
];

export const posts = [
  {
    id: "post_01",
    createdAt: "2026-11-02T09:15:00.000Z",
    slug: "shipping-your-first-nextjs-app",
    title: "Shipping Your First Next.js App Without the Headaches",
    desc: `<p>Your first deploy is where tutorials end and real problems begin: environment variables that only exist on your laptop, images that load locally but not in production, and API calls hard-coded to localhost.</p>
<p>Start by listing every value your app reads from <code>process.env</code> and writing it down in an example env file. Then run a production build on your own machine before you push. Most deployment surprises show up there first.</p>
<h2>Keep the data layer swappable</h2>
<p>Put database access behind a small module with plain functions such as <em>getPosts</em> and <em>getPostBySlug</em>. You can start with mock data and change the backend later without touching a single component.</p>`,
    img: "/coding.png",
    views: 1840,
    catSlug: "coding",
    userEmail: "kenji@example.com",
  },
  {
    id: "post_02",
    createdAt: "2026-10-28T14:30:00.000Z",
    slug: "three-days-in-lisbon-on-a-budget",
    title: "Three Days in Lisbon on a Shoestring Budget",
    desc: `<p>Lisbon rewards anyone willing to walk. The city is built on seven hills, and every steep street seems to end at a viewpoint over terracotta roofs and the wide blue river.</p>
<p>Skip the taxis and buy a rechargeable transit card on day one. Tram 28 is famous for a reason, but ride it early in the morning, before the crowds arrive.</p>
<p>For food, follow the locals into small tascas at lunchtime, where the set menu is one of the best-value meals in the city.</p>`,
    img: "/travel.png",
    views: 1325,
    catSlug: "travel",
    userEmail: "sofia@example.com",
  },
  {
    id: "post_03",
    createdAt: "2026-10-21T18:05:00.000Z",
    slug: "the-weeknight-pasta-i-keep-making",
    title: "The Weeknight Pasta I Keep Coming Back To",
    desc: `<p>Some recipes earn their place by being impressive. This one earns it by being there for me on a Tuesday night with almost nothing in the fridge.</p>
<p>Garlic, chilli flakes, a tin of good tomatoes and a handful of parmesan: that is the whole list. The trick is to finish the pasta in the sauce with a splash of the starchy cooking water, so everything turns glossy instead of watery.</p>
<p>Make it once as written, then make it yours. Anchovies, olives and a squeeze of lemon all work well.</p>`,
    img: "/food.png",
    views: 980,
    catSlug: "food",
    userEmail: "amara@example.com",
  },
  {
    id: "post_04",
    createdAt: "2026-10-15T08:40:00.000Z",
    slug: "designing-a-calm-workspace",
    title: "Designing a Calm Workspace in a Small Apartment",
    desc: `<p>A small room doesn't need fewer things so much as fewer kinds of things. Pick a short palette of materials, such as light wood, linen and one metal finish, and let everything else go.</p>
<p>Put your desk where you get the best natural light, even if that isn't the obvious spot. A plant, a lamp with a warm bulb and one closed box for cables will do more for your focus than any gadget.</p>`,
    img: "/style.png",
    views: 760,
    catSlug: "style",
    userEmail: "daniel@example.com",
  },
  {
    id: "post_05",
    createdAt: "2026-10-09T11:20:00.000Z",
    slug: "a-capsule-wardrobe-in-ten-pieces",
    title: "Building a Capsule Wardrobe in Ten Pieces",
    desc: `<p>A capsule wardrobe is less about owning very little and more about owning things that work together. When every top goes with every bottom, getting dressed stops being a daily puzzle.</p>
<p>Start with the neutrals you already wear most, then add one or two colours you love. Shop for fit and fabric before trends: a well-made jacket you wear twice a week is better value than five pieces you reach for once a season.</p>`,
    img: "/fashion.png",
    views: 1102,
    catSlug: "fashion",
    userEmail: "sofia@example.com",
  },
  {
    id: "post_06",
    createdAt: "2026-10-02T16:45:00.000Z",
    slug: "why-local-bookshops-are-having-a-moment",
    title: "Why Local Bookshops Are Having a Moment",
    desc: `<p>Walk into a good independent bookshop and you'll rarely leave with the book you came for. That is the point. A handwritten staff recommendation can do what an algorithm can't: surprise you.</p>
<p>Many shops have become small community hubs, hosting readings, book clubs and children's story hours. They sell an experience as much as a product, and readers are showing up for it.</p>`,
    img: "/culture.png",
    views: 640,
    catSlug: "culture",
    userEmail: "amara@example.com",
  },
  {
    id: "post_07",
    createdAt: "2026-09-25T10:00:00.000Z",
    slug: "css-grid-layouts-that-read-like-a-newspaper",
    title: "CSS Grid Layouts That Read Like a Newspaper",
    desc: `<p>Print designers have used grids for centuries. On the web, CSS Grid finally lets us borrow their best ideas without a pile of nested wrappers.</p>
<p>Define a twelve-column grid, then let each story span as many columns as its importance deserves. Named grid areas keep the layout readable, and a couple of media queries collapse it into a single column on phones.</p>
<p>Use <code>grid-auto-flow: dense</code> sparingly. It fills gaps neatly, but it can also move content away from where readers expect it.</p>`,
    img: "/coding.png",
    views: 1490,
    catSlug: "coding",
    userEmail: "daniel@example.com",
  },
  {
    id: "post_08",
    createdAt: "2026-09-18T07:30:00.000Z",
    slug: "train-journeys-worth-taking-slowly",
    title: "Train Journeys Worth Taking Slowly",
    desc: `<p>Flying gets you there. A train lets you watch the country change outside the window, from city suburbs to farmland to mountains.</p>
<p>Book a window seat on the side that faces the scenery, bring more snacks than you think you'll need, and leave the laptop in your bag for at least the first hour.</p>`,
    img: "/travel.png",
    views: 870,
    catSlug: "travel",
    userEmail: "kenji@example.com",
  },
  {
    id: "post_09",
    createdAt: "2026-09-11T19:50:00.000Z",
    slug: "street-food-lessons-from-a-night-market",
    title: "Street Food Lessons from a Night Market",
    desc: `<p>The best stall at a night market is usually the one with the longest queue of locals, not the one with the brightest sign.</p>
<p>Go hungry, go with friends and order small portions from several stalls so you can share. Carry cash in small notes, and watch how others order before it's your turn.</p>`,
    img: "/food.png",
    views: 1215,
    catSlug: "food",
    userEmail: "kenji@example.com",
  },
  {
    id: "post_10",
    createdAt: "2026-09-04T06:10:00.000Z",
    slug: "a-five-minute-morning-routine",
    title: "The Five-Minute Morning Routine That Finally Stuck",
    desc: `<p>I've tried every elaborate morning routine on the internet. The one that lasted takes five minutes and needs no app.</p>
<p>Open the curtains, drink a glass of water, make the bed and write down the one thing that would make the day a success. It's small enough that I never skip it, and that is why it works.</p>`,
    img: "/style.png",
    views: 530,
    catSlug: "style",
    userEmail: "amara@example.com",
  },
];

export const comments = [
  {
    id: "comment_01",
    createdAt: "2026-11-03T10:12:00.000Z",
    desc: "The tip about running a production build locally first saved me hours last week.",
    userEmail: "daniel@example.com",
    postSlug: "shipping-your-first-nextjs-app",
  },
  {
    id: "comment_02",
    createdAt: "2026-11-04T08:47:00.000Z",
    desc: "Could you write a follow-up on environment variables for preview deployments?",
    userEmail: "sofia@example.com",
    postSlug: "shipping-your-first-nextjs-app",
  },
  {
    id: "comment_03",
    createdAt: "2026-10-29T12:05:00.000Z",
    desc: "Tram 28 at 7am is a completely different experience. Great advice!",
    userEmail: "amara@example.com",
    postSlug: "three-days-in-lisbon-on-a-budget",
  },
  {
    id: "comment_04",
    createdAt: "2026-10-30T17:22:00.000Z",
    desc: "Saving this for my trip in the spring.",
    userEmail: "kenji@example.com",
    postSlug: "three-days-in-lisbon-on-a-budget",
  },
  {
    id: "comment_05",
    createdAt: "2026-10-22T20:31:00.000Z",
    desc: "Made this last night with anchovies. Delicious.",
    userEmail: "sofia@example.com",
    postSlug: "the-weeknight-pasta-i-keep-making",
  },
  {
    id: "comment_06",
    createdAt: "2026-10-03T09:14:00.000Z",
    desc: "Our local shop's staff picks shelf is the only reason I read outside my comfort zone.",
    userEmail: "daniel@example.com",
    postSlug: "why-local-bookshops-are-having-a-moment",
  },
  {
    id: "comment_07",
    createdAt: "2026-09-26T13:40:00.000Z",
    desc: "Named grid areas changed how I think about layout.",
    userEmail: "kenji@example.com",
    postSlug: "css-grid-layouts-that-read-like-a-newspaper",
  },
];
