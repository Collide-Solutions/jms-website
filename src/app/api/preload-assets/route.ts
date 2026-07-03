import { NextResponse } from "next/server";
import {
  getBlogs,
  getCommunityPageData,
  getCsrPageData,
  getFacilities,
  getFeaturedProjects,
  getFirmPageData,
  getHomePageData,
  getLeaders,
  getPartnerSectors,
  getProcessCards,
  getProcessPageData,
  getReachUsPageData,
  getResources,
  getResourcesPageData,
  getWorks,
} from "@/lib/wordpress";

const IMAGE_EXTENSIONS = /\.(avif|gif|jpe?g|jfif|png|svg|webp)(\?.*)?$/i;
const PDF_EXTENSIONS = /\.pdf(\?.*)?$/i;

function pushAsset(list: string[], value: string | null | undefined) {
  if (!value) return;
  const url = value.trim();
  if (!url || url.startsWith("data:") || url.startsWith("blob:")) return;
  list.push(url);
}

export async function GET() {
  const [
    home,
    firm,
    community,
    csr,
    process,
    resourcesPage,
    reach,
    featuredProjects,
    leaders,
    facilities,
    works,
    partnerSectors,
    processCards,
    resources,
    blogs,
  ] = await Promise.all([
    getHomePageData(),
    getFirmPageData(),
    getCommunityPageData(),
    getCsrPageData(),
    getProcessPageData(),
    getResourcesPageData(),
    getReachUsPageData(),
    getFeaturedProjects(),
    getLeaders(),
    getFacilities(),
    getWorks(),
    getPartnerSectors(),
    getProcessCards(),
    getResources(),
    getBlogs(),
  ]);

  const urls: string[] = ["/jms-logo.png", "/made-in-india.png"];

  pushAsset(urls, home.home_hero_feature_image.url);
  pushAsset(urls, firm.firm_hero_image.url);
  pushAsset(urls, firm.firm_journey_image.url);
  pushAsset(urls, community.community_hero_image.url);
  pushAsset(urls, csr.csr_hero_image.url);
  pushAsset(urls, process.process_hero_image.url);
  pushAsset(urls, resourcesPage.resources_hero_image.url);
  pushAsset(urls, reach.reach_hero_image.url);

  featuredProjects.forEach((item) => pushAsset(urls, item.img));
  leaders.forEach((item) => pushAsset(urls, item.photo));
  facilities.forEach((item) => pushAsset(urls, item.image));
  works.forEach((item) => pushAsset(urls, item.image));
  partnerSectors.forEach((item) => pushAsset(urls, item.img));
  processCards.forEach((item) => pushAsset(urls, item.image));
  blogs.forEach((item) => pushAsset(urls, item.image));
  resources.brochures.forEach((item) => pushAsset(urls, item.pdf));
  resources.certificates.forEach((item) => pushAsset(urls, item.pdf));

  const unique = Array.from(new Set(urls));

  return NextResponse.json({
    images: unique.filter((url) => IMAGE_EXTENSIONS.test(url)),
    pdfs: unique.filter((url) => PDF_EXTENSIONS.test(url)),
  });
}
