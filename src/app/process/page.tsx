import { ArrowDownRight } from "lucide-react";
import { PageHero } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import { industrialImages, processSteps } from "@/lib/data";

export default function ProcessPage() {
  return (
    <>
      <PageHero eyebrow="Process" title="Controlled execution timeline." text="A highly visual step progression from consultation to handover." image={industrialImages[4]} />
      <section className="section"><div className="container space-y-5">{processSteps.map((step, i) => <Reveal key={step} className="grid items-center gap-5 rounded-2xl border border-[var(--border)] bg-white p-6 md:grid-cols-[120px_1fr_80px]"><span className="text-4xl font-black text-[var(--blue)]">{String(i + 1).padStart(2, "0")}</span><h2 className="text-3xl font-black uppercase text-[var(--navy)] md:text-5xl">{step}</h2><ArrowDownRight className="text-[var(--blue)]" /></Reveal>)}</div></section>
    </>
  );
}
