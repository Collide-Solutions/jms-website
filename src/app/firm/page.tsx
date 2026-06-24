import {
  getFirmPageData,
  getLeaders,
  getAchievements,
  getFacilities,
  getWorks,
  parsePairs,
  parseLines,
  parseParagraphs,
} from "@/lib/wordpress";
import FirmClient from "./FirmClient";

export default async function FirmPage() {
  const [firm, leaders, achievements, facilities, works] = await Promise.all([
    getFirmPageData(),
    getLeaders(),
    getAchievements(),
    getFacilities(),
    getWorks(),
  ]);

  return (
    <FirmClient
      firm={{
        firm_hero_title: firm.firm_hero_title,
        firm_hero_text: firm.firm_hero_text,
        firm_hero_image: firm.firm_hero_image,
        firm_journey_image: firm.firm_journey_image,
        firm_journey_paragraphs: parseParagraphs(firm.firm_journey_paragraphs ?? ""),
        firm_leadership_title: firm.firm_leadership_title,
        firm_leadership_text: firm.firm_leadership_text,
      }}
      leaders={leaders}
      achievements={achievements}
      facilities={facilities}
      works={works}
      peoplePrograms={parsePairs(firm.people_programs ?? "")}
      coreValues={parseLines(firm.core_values ?? "")}
      insights={parseLines(firm.insights_jms ?? "")}
      capacityItems={parsePairs(firm.capacity_items ?? "")}
    />
  );
}
