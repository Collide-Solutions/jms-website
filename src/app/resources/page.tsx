import { PageHero } from "@/components/SiteShell";
import { getResources, getResourcesPageData, type Resource } from "@/lib/wordpress";
import ResourcesClient from "./ResourcesClient";

export default async function ResourcesPage() {
  const [hero, { brochures, certificates }] = await Promise.all([
    getResourcesPageData(),
    getResources(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={hero.resources_hero_title}
        text={hero.resources_hero_text}
        image={hero.resources_hero_image.url}
      />
      <ResourcesClient brochures={brochures} certificates={certificates} />
    </>
  );
}
