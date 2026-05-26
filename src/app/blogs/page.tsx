import { insights } from "@/lib/data";
import { PageHero, SectionTitle } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";

export default function BlogsPage() {
  const cats = ["Manufacturing", "Retail Branding", "Architecture", "Signage", "Production", "Company Updates"];
  return (
    <>
      <PageHero eyebrow="Blogs" title="Magazine-style insights." text="Field notes and operational thinking across manufacturing, retail branding, signage, production, and company updates." />
      <section className="section bg-[var(--soft)]"><div className="container"><div className="mb-10 flex flex-wrap gap-3">{cats.map((x) => <span key={x} className="rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-bold text-[var(--navy)]">{x}</span>)}</div><SectionTitle eyebrow="Latest" title="Ideas from JMS." /><div className="grid gap-5 md:grid-cols-3">{insights.map((x, i) => <Reveal key={x} className={i === 0 ? "card p-8 md:col-span-2 md:row-span-2" : "card p-8"}><p className="eyebrow">{cats[i % cats.length]}</p><h2 className="mt-5 text-2xl font-black text-[var(--navy)] md:text-4xl">{x}</h2><p className="mt-5 leading-7 text-slate-600">A concise editorial article template ready for CMS content.</p></Reveal>)}</div></div></section>
    </>
  );
}
