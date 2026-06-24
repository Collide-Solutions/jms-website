import { HeartHandshake } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import { getCsrPageData, parseLines } from "@/lib/wordpress";

export default async function CSRPage() {
  const csr = await getCsrPageData();
  const focusAreas = parseLines(csr.focus_areas ?? "");

  return (
    <>
      <PageHero
        eyebrow="CSR"
        title={csr.csr_hero_title}
        text={csr.csr_hero_text}
        image={csr.csr_hero_image.url}
      />
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow={csr.section_eyebrow} title={csr.section_title} />
          <div className="grid gap-5 md:grid-cols-3">
            {focusAreas.map((area) => (
              <Reveal key={area} className="card p-8">
                <HeartHandshake className="mb-12 text-[var(--blue)]" />
                <h3 className="text-2xl font-black text-[var(--navy)]">{area}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
