import { Download } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import { industrialImages } from "@/lib/data";

export default function ResourcesPage() {
  const items = ["Insights", "Downloads", "Manufacturing standards", "PDFs", "Certifications", "Case studies", "Blogs"];
  return (
    <>
      <PageHero eyebrow="Resources" title="Resource center" text="Standards, certifications, case studies, downloads, and operational insight for enterprise teams." image={industrialImages[2]} />
      <section className="section bg-[var(--soft)]"><div className="container"><SectionTitle eyebrow="Library" title="Filterable-ready knowledge hub." /><div className="grid gap-5 md:grid-cols-3">{items.map((x) => <Reveal key={x} className="card p-7"><Download className="mb-14 text-[var(--blue)]" /><p className="eyebrow">Resource</p><h3 className="mt-4 text-2xl font-black text-[var(--navy)]">{x}</h3><p className="mt-4 leading-7 text-slate-600">Prepared for CMS-driven files, articles, PDFs, and certification records.</p></Reveal>)}</div></div></section>
    </>
  );
}
