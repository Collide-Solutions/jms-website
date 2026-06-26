import {
  fallbackFaqs,
  fallbackFeaturedProjects,
  fallbackHomePageData,
  fallbackLeaders,
  fallbackAchievements,
  fallbackFacilities,
  fallbackWorks,
  fallbackFirmPageData,
  fallbackGreenCommitments,
  fallbackTestimonials,
  fallbackWorkflowSteps,
  fallbackPartnerSectors,
  fallbackCsrPageData,
  fallbackProcessCards,
  fallbackProcessPageData,
  fallbackResources,
  fallbackResourcesPageData,
  fallbackReachUsPageData,
  fallbackBlogs,
} from "./fallback";

const WP_BASE = process.env.NEXT_PUBLIC_WP_URL ?? "";
const API = `${WP_BASE}/wp-json`;
const WP_AVAILABLE = WP_BASE !== "";

async function wpFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    next: { revalidate: 60 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`WP fetch failed: ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

// Fetch ACF fields from a WordPress Page by its slug.
// Returns the acf object of the first matching page, or null.
async function getPageAcf<T>(slug: string): Promise<T | null> {
  const pages = await wpFetch<Array<{ acf: T }>>(`/wp/v2/pages?slug=${slug}&_fields=acf&acf_format=standard`);
  if (!pages.length) return null;
  return pages[0].acf;
}

// ─── Shared types ─────────────────────────────────────────────────────────

export type WpImage = { url: string; alt: string };

// ─── HOME SETTINGS (from site_settings CPT, first post) ──────────────────
// Free ACF has no repeater - lists come as newline-separated strings.
// stats rows use pipe: "100000+|Sq. Ft Facility"
// capabilities rows use pipe: "Corporate Identity|Description text"

export type HomePageData = {
  hero_video_url: string;
  home_hero_feature_image: WpImage;
  home_hero_title: string;
  home_hero_subtitle: string;
  home_hero_badge_line1: string;
  home_hero_badge_line2: string;
  home_process_steps: string;
  home_why_items: string;
  stats: string;
  capabilities: string;
};

// Parsing helpers - used by consuming page components.
// WP textarea fields use \r\n line endings.
export function parseLines(raw: string = ""): string[] {
  return raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}
// "value|label" per line
export function parseStats(raw: string = ""): Array<{ value: string; label: string }> {
  return parseLines(raw).map((row) => {
    const [value, label = ""] = row.split("|");
    return { value: value.trim(), label: label.trim() };
  });
}
// "title|description" per line - used for capabilities and capacity items
export function parsePairs(raw: string = ""): Array<{ title: string; text: string }> {
  return parseLines(raw).map((row) => {
    const [title, text = ""] = row.split("|");
    return { title: title.trim(), text: text.trim() };
  });
}
// Alias kept for home page compatibility
export const parseCapabilities = parsePairs;
// Split double-newline-separated paragraphs (journey text)
export function parseParagraphs(raw: string = ""): string[] {
  return raw.split(/\r?\n\s*\r?\n/).map((s) => s.trim()).filter(Boolean);
}

// Resolves an ACF image field that may be an integer ID or already a WpImage object.
async function resolveImage(value: WpImage | number | undefined): Promise<WpImage> {
  if (!value) return { url: "", alt: "" };
  if (typeof value === "object") return value;
  try {
    const media = await wpFetch<{ source_url: string; alt_text: string }>(`/wp/v2/media/${value}`);
    return { url: media.source_url, alt: media.alt_text ?? "" };
  } catch {
    return { url: "", alt: "" };
  }
}

async function getSiteSettingsRaw(): Promise<Record<string, unknown> | null> {
  const posts = await wpFetch<Array<{ acf: Record<string, unknown> }>>("/wp/v2/site_settings?per_page=1&_fields=acf&acf_format=standard");
  if (!posts.length) return null;
  return posts[0].acf;
}

// Image fields in site_settings that need resolving
const IMAGE_FIELDS = [
  "home_hero_feature_image",
  "firm_hero_image",
  "firm_journey_image",
  "csr_hero_image",
  "community_hero_image",
  "process_hero_image",
  "resources_hero_image",
  "reach_hero_image",
] as const;

async function getSiteSettings<T>(): Promise<T | null> {
  const raw = await getSiteSettingsRaw();
  if (!raw) return null;
  // Resolve all image fields in parallel
  const resolved = await Promise.all(
    IMAGE_FIELDS.map(async (field) => [field, await resolveImage(raw[field] as WpImage | number | undefined)] as const)
  );
  for (const [field, img] of resolved) {
    raw[field] = img;
  }
  return raw as T;
}

export async function getHomePageData(): Promise<HomePageData> {
  if (!WP_AVAILABLE) return fallbackHomePageData;
  try {
    return (await getSiteSettings<HomePageData>()) ?? fallbackHomePageData;
  } catch {
    return fallbackHomePageData;
  }
}

// ─── FIRM SETTINGS (from site_settings CPT) ──────────────────────────────
// Images return as integer IDs unless acf_format=standard - handled by getSiteSettings.
// journey_paragraphs: double-newline-separated paragraphs → parseParagraphs()
// capacity_items, people_programs: "title|description" per line → parsePairs()
// core_values, insights_jms: one item per line → parseLines()

export type FirmPageData = {
  firm_hero_title: string;
  firm_hero_text: string;
  firm_hero_image: WpImage;
  firm_journey_image: WpImage;
  firm_journey_paragraphs: string | undefined;
  firm_leadership_title: string;
  firm_leadership_text: string;
  capacity_items: string | undefined;
  core_values: string | undefined;
  people_programs: string | undefined;
  insights_jms: string | undefined;
};

export async function getFirmPageData(): Promise<FirmPageData> {
  if (!WP_AVAILABLE) return fallbackFirmPageData;
  try {
    return (await getSiteSettings<FirmPageData>()) ?? fallbackFirmPageData;
  } catch {
    return fallbackFirmPageData;
  }
}

// ─── COMMUNITY SETTINGS (from site_settings CPT) ─────────────────────────
// india_regions, network_stats: one item per line → parseLines()
// global_stats: "value|label" per line → parseStats()
// global_markets: "title|desc" per line → parsePairs() (text field = desc)

export type CommunityPageData = {
  community_hero_title: string;
  community_hero_text: string;
  community_hero_image: WpImage;
  india_regions: string | undefined;
  network_stats: string | undefined;
  global_stats: string | undefined;
  global_markets: string | undefined;
};

export async function getCommunityPageData(): Promise<CommunityPageData> {
  if (!WP_AVAILABLE) return fallbackCommunityPageData;
  try {
    return (await getSiteSettings<CommunityPageData>()) ?? fallbackCommunityPageData;
  } catch {
    return fallbackCommunityPageData;
  }
}

// ─── CSR SETTINGS (from site_settings CPT) ───────────────────────────────
// WP field names: section_eyebrow, section_title, focus_areas (not csr_* prefixed)
// focus_areas: one item per line → parseLines()

export type CsrPageData = {
  csr_hero_title: string;
  csr_hero_text: string;
  csr_hero_image: WpImage;
  section_eyebrow: string;
  section_title: string;
  focus_areas: string | undefined;
};

export async function getCsrPageData(): Promise<CsrPageData> {
  if (!WP_AVAILABLE) return fallbackCsrPageData;
  try {
    return (await getSiteSettings<CsrPageData>()) ?? fallbackCsrPageData;
  } catch {
    return fallbackCsrPageData;
  }
}

// ─── PROCESS SETTINGS (from site_settings CPT) ───────────────────────────

export type ProcessPageData = {
  process_hero_title: string;
  process_hero_text: string;
  process_hero_image: WpImage;
};

export async function getProcessPageData(): Promise<ProcessPageData> {
  if (!WP_AVAILABLE) return fallbackProcessPageData;
  try {
    return (await getSiteSettings<ProcessPageData>()) ?? fallbackProcessPageData;
  } catch {
    return fallbackProcessPageData;
  }
}

// ─── RESOURCES SETTINGS (from site_settings CPT) ─────────────────────────

export type ResourcesPageData = {
  resources_hero_title: string;
  resources_hero_text: string;
  resources_hero_image: WpImage;
};

export async function getResourcesPageData(): Promise<ResourcesPageData> {
  if (!WP_AVAILABLE) return fallbackResourcesPageData;
  try {
    return (await getSiteSettings<ResourcesPageData>()) ?? fallbackResourcesPageData;
  } catch {
    return fallbackResourcesPageData;
  }
}

// ─── REACH US SETTINGS (from site_settings CPT) ──────────────────────────

export type ReachUsPageData = {
  reach_hero_title: string;
  reach_hero_text: string;
  reach_hero_image: WpImage;
  contact_email: string;
  contact_address: string;
  factory_description: string;
};

export async function getReachUsPageData(): Promise<ReachUsPageData> {
  if (!WP_AVAILABLE) return fallbackReachUsPageData;
  try {
    return (await getSiteSettings<ReachUsPageData>()) ?? fallbackReachUsPageData;
  } catch {
    return fallbackReachUsPageData;
  }
}

// ─── CPT: FAQ ─────────────────────────────────────────────────────────────

export type FaqItem = { question: string; answer: string };

export async function getFaqs(): Promise<FaqItem[]> {
  if (!WP_AVAILABLE) return fallbackFaqs;
  try {
    const posts = await wpFetch<Array<{ acf: FaqItem }>>("/wp/v2/faq?per_page=20&order=asc&orderby=menu_order&_fields=acf");
    return posts.map((p) => p.acf);
  } catch {
    return fallbackFaqs;
  }
}

// ─── CPT: Featured Project ────────────────────────────────────────────────

export type FeaturedProject = { label: string; img: string };

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  if (!WP_AVAILABLE) return fallbackFeaturedProjects;
  try {
    const posts = await wpFetch<Array<{ acf: { label: string; image: WpImage } }>>("/wp/v2/featured_project?per_page=20&order=asc&orderby=menu_order&_fields=acf&acf_format=standard");
    return posts.map((p) => ({ label: p.acf.label, img: p.acf.image.url }));
  } catch {
    return fallbackFeaturedProjects;
  }
}

// ─── CPT: Leader ─────────────────────────────────────────────────────────

export type Leader = { name: string; role: string; photo: string | null };

export async function getLeaders(): Promise<Leader[]> {
  if (!WP_AVAILABLE) return fallbackLeaders;
  try {
    const posts = await wpFetch<Array<{ acf: { name: string; role: string; photo: WpImage | false } }>>("/wp/v2/leader?per_page=20&order=asc&orderby=menu_order&_fields=acf&acf_format=standard");
    return posts.map((p) => ({
      name: p.acf.name,
      role: p.acf.role,
      photo: p.acf.photo ? p.acf.photo.url : null,
    }));
  } catch {
    return fallbackLeaders;
  }
}

// ─── CPT: Achievement ────────────────────────────────────────────────────

export type Achievement = { value: string; label: string };

export async function getAchievements(): Promise<Achievement[]> {
  if (!WP_AVAILABLE) return fallbackAchievements;
  try {
    const posts = await wpFetch<Array<{ acf: Achievement }>>("/wp/v2/achievement?per_page=20&order=asc&orderby=menu_order&_fields=acf");
    return posts.map((p) => p.acf);
  } catch {
    return fallbackAchievements;
  }
}

// ─── CPT: Facility ───────────────────────────────────────────────────────

export type Facility = { name: string; description: string; image: string };

export async function getFacilities(): Promise<Facility[]> {
  if (!WP_AVAILABLE) return fallbackFacilities;
  try {
    const posts = await wpFetch<Array<{ acf: { name: string; description: string; image: WpImage } }>>("/wp/v2/facility?per_page=20&order=asc&orderby=menu_order&_fields=acf&acf_format=standard");
    return posts.map((p) => ({ name: p.acf.name, description: p.acf.description, image: p.acf.image.url }));
  } catch {
    return fallbackFacilities;
  }
}

// ─── CPT: Work ───────────────────────────────────────────────────────────

export type Work = { name: string; category: string; image: string };

export async function getWorks(): Promise<Work[]> {
  if (!WP_AVAILABLE) return fallbackWorks;
  try {
    const posts = await wpFetch<Array<{ acf: { name: string; category: string; image: WpImage } }>>("/wp/v2/work?per_page=50&order=asc&orderby=menu_order&_fields=acf&acf_format=standard");
    return posts.map((p) => ({ name: p.acf.name, category: p.acf.category, image: p.acf.image.url }));
  } catch {
    return fallbackWorks;
  }
}

// ─── CPT: Green Commitment ───────────────────────────────────────────────

export async function getGreenCommitments(): Promise<string[]> {
  if (!WP_AVAILABLE) return fallbackGreenCommitments;
  try {
    const posts = await wpFetch<Array<{ acf: { green_commitments: string } }>>("/wp/v2/commitment?per_page=1&_fields=acf");
    if (!posts.length) return fallbackGreenCommitments;
    return parseLines(posts[0].acf.green_commitments ?? "");
  } catch {
    return fallbackGreenCommitments;
  }
}

// ─── CPT: Testimonial ────────────────────────────────────────────────────

export type Testimonial = { quote: string; author: string };

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!WP_AVAILABLE) return fallbackTestimonials;
  try {
    const posts = await wpFetch<Array<{ acf: Testimonial }>>("/wp/v2/testimonial?per_page=20&order=asc&orderby=menu_order&_fields=acf");
    return posts.map((p) => p.acf);
  } catch {
    return fallbackTestimonials;
  }
}

// ─── CPT: Workflow Step ──────────────────────────────────────────────────

export async function getWorkflowSteps(): Promise<string[]> {
  if (!WP_AVAILABLE) return fallbackWorkflowSteps;
  try {
    const posts = await wpFetch<Array<{ acf: { step: string } }>>("/wp/v2/workflow_step?per_page=1&_fields=acf");
    if (!posts.length) return fallbackWorkflowSteps;
    return parseLines(posts[0].acf.step ?? "");
  } catch {
    return fallbackWorkflowSteps;
  }
}

// ─── CPT: Partner Sector ─────────────────────────────────────────────────

export type PartnerSector = { label: string; img: string };

export async function getPartnerSectors(): Promise<PartnerSector[]> {
  if (!WP_AVAILABLE) return fallbackPartnerSectors;
  try {
    const posts = await wpFetch<Array<{ acf: { label: string; image: WpImage } }>>("/wp/v2/partner_sector?per_page=20&order=asc&orderby=menu_order&_fields=acf&acf_format=standard");
    return posts.map((p) => ({ label: p.acf.label, img: p.acf.image.url }));
  } catch {
    return fallbackPartnerSectors;
  }
}

// ─── CPT: Process Card ───────────────────────────────────────────────────

export type ProcessCard = { title: string; image: string; text: string };

export async function getProcessCards(): Promise<ProcessCard[]> {
  if (!WP_AVAILABLE) return fallbackProcessCards;
  try {
    const posts = await wpFetch<Array<{ acf: { title: string; image: WpImage; text: string } }>>("/wp/v2/process_card?per_page=10&order=asc&orderby=menu_order&_fields=acf&acf_format=standard");
    return posts.map((p) => ({ title: p.acf.title, image: p.acf.image.url, text: p.acf.text }));
  } catch {
    return fallbackProcessCards;
  }
}

// ─── CPT: Resource ───────────────────────────────────────────────────────

export type Resource = { title: string; description: string; pdf: string };

export async function getResources(): Promise<{ brochures: Resource[]; certificates: Resource[] }> {
  if (!WP_AVAILABLE) return fallbackResources;
  try {
    const posts = await wpFetch<Array<{ acf: { title: string; description: string; pdf_url: string; type: "brochure" | "certificate" } }>>("/wp/v2/resource?per_page=30&order=asc&orderby=menu_order&_fields=acf");
    return {
      brochures: posts.filter((p) => p.acf.type === "brochure").map((p) => ({ title: p.acf.title, description: p.acf.description, pdf: p.acf.pdf_url })),
      certificates: posts.filter((p) => p.acf.type === "certificate").map((p) => ({ title: p.acf.title, description: p.acf.description, pdf: p.acf.pdf_url })),
    };
  } catch {
    return fallbackResources;
  }
}

// ─── CPT: Blog ───────────────────────────────────────────────────────────
// content_sections format (textarea, double-newline separated blocks):
//   "heading|Why Facades Matter"
//   "paragraph|Some text here."
//   "bullets|Item one.; Item two.; Item three."

export type BlogSection =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export type Blog = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  sections: BlogSection[];
};

type RawBlogPost = {
  slug: string;
  acf: {
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    image: WpImage;
    content_sections: string;
  };
};

function parseContentSections(raw: string = ""): BlogSection[] {
  return raw
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block): BlogSection => {
      const pipe = block.indexOf("|");
      if (pipe === -1) return { type: "paragraph", text: block };
      const type = block.slice(0, pipe).trim();
      const content = block.slice(pipe + 1).trim();
      if (type === "heading") return { type: "heading", text: content };
      if (type === "bullets") return { type: "bullets", items: content.split(";").map((s) => s.trim()).filter(Boolean) };
      return { type: "paragraph", text: content };
    });
}

function mapBlog(p: RawBlogPost): Blog {
  return {
    slug: p.slug,
    category: p.acf.category,
    title: p.acf.title,
    excerpt: p.acf.excerpt,
    author: p.acf.author,
    date: p.acf.date,
    image: p.acf.image?.url ?? "",
    sections: parseContentSections(p.acf.content_sections),
  };
}

export async function getBlogs(): Promise<Blog[]> {
  if (!WP_AVAILABLE) return fallbackBlogs;
  try {
    const posts = await wpFetch<RawBlogPost[]>("/wp/v2/blog?per_page=20&order=desc&orderby=date&_fields=slug,acf&acf_format=standard");
    return posts.map(mapBlog);
  } catch {
    return fallbackBlogs;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!WP_AVAILABLE) return fallbackBlogs.find((b) => b.slug === slug) ?? null;
  try {
    const posts = await wpFetch<RawBlogPost[]>(`/wp/v2/blog?slug=${encodeURIComponent(slug)}&_fields=slug,acf&acf_format=standard`);
    if (!posts.length) return null;
    return mapBlog(posts[0]);
  } catch {
    return fallbackBlogs.find((b) => b.slug === slug) ?? null;
  }
}

// ─── Fallback for community page data (used above) ────────────────────────

const fallbackCommunityPageData: CommunityPageData = {
  community_hero_title: "Sustainability at the core.",
  community_hero_text: "At JMS, we recognize that the future depends on the actions we take today.",
  community_hero_image: { url: "/HOME/FEATURED PROJECTS/HOSPITALITY/Fortis.png", alt: "" },
  india_regions: "North India\nSouth India\nEast India\nWest India\nCentral India",
  network_stats: "500+ Cities Served\nPan India Logistics\nRegional Hubs\nLocal Installation Teams",
  global_stats: "4+|Active Markets\n25+|International Projects\n10+|Global Partners\n6+|Export Destinations",
  global_markets: "Middle East|Expanding retail execution and facade solutions across UAE and GCC markets.\nSoutheast Asia|Building partnerships for retail rollout programs in ASEAN region.\nAfrica|Supporting brand expansion with manufacturing and installation capabilities.\nSouth Asia|Strengthening presence in neighboring markets with comprehensive retail solutions.",
};
