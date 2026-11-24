import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";
import { getBlogs } from "@/lib/wordpress";

const publicPages = [
  "/",
  "/firm",
  "/community",
  "/csr",
  "/work-process",
  "/resources",
  "/pr",
  "/reach-us",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();
  const articlePages = blogs.map(({ slug }) => `/pr/${encodeURIComponent(slug)}`);

  return [...publicPages, ...articlePages].map((path) => ({
    url: new URL(path, SITE_ORIGIN).href,
  }));
}
