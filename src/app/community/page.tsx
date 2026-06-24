import {
  getGreenCommitments,
  getTestimonials,
  getWorkflowSteps,
  getPartnerSectors,
  getCommunityPageData,
  parseLines,
  parseStats,
  parsePairs,
} from "@/lib/wordpress";
import CommunityClient from "./CommunityClient";

export default async function CommunityPage() {
  const [commitments, testimonials, workflow, partnerSectors, community] = await Promise.all([
    getGreenCommitments(),
    getTestimonials(),
    getWorkflowSteps(),
    getPartnerSectors(),
    getCommunityPageData(),
  ]);

  const globalStats = parseStats(community.global_stats ?? "").map(({ value, label }) => ({ value, label }));
  const globalMarkets = parsePairs(community.global_markets ?? "").map(({ title, text }) => ({ title, desc: text }));

  return (
    <CommunityClient
      commitments={commitments}
      testimonials={testimonials}
      workflow={workflow}
      partnerSectors={partnerSectors}
      indiaRegions={parseLines(community.india_regions ?? "")}
      networkStats={parseLines(community.network_stats ?? "")}
      globalStats={globalStats}
      globalMarkets={globalMarkets}
      communityHeroTitle={community.community_hero_title}
      communityHeroText={community.community_hero_text}
      communityHeroImage={community.community_hero_image.url}
    />
  );
}
