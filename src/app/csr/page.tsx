import { HeartHandshake } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import { industrialImages } from "@/lib/data";

export default function CSRPage() {
  const csr = ["Sustainability", "Workforce welfare", "Community initiatives", "Safety", "Skill development", "Environmental responsibility"];
  return (
    <>
      <PageHero eyebrow="CSR" title="Responsibility beyond production." text="CSR at JMS focuses on people, safety, skills, community, and environmental responsibility." image={industrialImages[5]} />
      <section className="section bg-[var(--soft)]"><div className="container"><SectionTitle eyebrow="Focus Areas" title="Built around welfare, safety, and sustainability." /><div className="grid gap-5 md:grid-cols-3">{csr.map((x) => <Reveal key={x} className="card p-8"><HeartHandshake className="mb-12 text-[var(--blue)]" /><h3 className="text-2xl font-black text-[var(--navy)]">{x}</h3></Reveal>)}</div></div></section>
    </>
  );
}
