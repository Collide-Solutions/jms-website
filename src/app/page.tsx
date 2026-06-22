import { ArrowRight, Factory, Ruler, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { HomeHero } from "@/components/HomeHero";
import { CTA, SectionTitle } from "@/components/SiteShell";
import { capabilities, stats } from "@/lib/data";
import FAQ from "@/components/FAQ";

const projectCats = [
  { label: "Retail Outlets", img: "/HOME/FEATURED PROJECTS/RETAIL OUTLETS/Westside.jpg" },
  { label: "Automobile Showrooms", img: "/HOME/FEATURED PROJECTS/AUTOMOBILE SHOWROOMS/Kia.jpg" },
  { label: "Hospitality", img: "/HOME/FEATURED PROJECTS/HOSPITALITY/Ginger.jpg" },
  { label: "Corporate Spaces", img: "/HOME/FEATURED PROJECTS/CORPORATE SPACES/Voltas.jpg" },
  { label: "Gas Stations", img: "/HOME/FEATURED PROJECTS/GAS STATIONS/IOCL.jpg" },
];
const why = ["Pan India Network", "Single Window Execution", "Experienced Team", "In-House Manufacturing", "Fast Rollouts", "Premium Quality"];

export default function Home() {
  return (
    <>
      <HomeHero featureImage="/HOME/FEATURED PROJECTS/RETAIL OUTLETS/Westside.png" />

      <section className="section bg-[var(--soft)]">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label], index) => (
            <Reveal key={label} delay={index * 0.05} className="card p-7">
              <Factory className="mb-8 text-[var(--blue)]" />
              <div className="text-4xl font-black text-[var(--navy)]">{value}</div>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Capabilities" title="Manufacturing systems for national brand rollouts." text="A single-window delivery model covering identity, furniture, fixtures, facades, signage, and installation." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.04} className="card p-7">
                <Ruler className="mb-10 text-[var(--blue)]" />
                <h3 className="text-2xl font-black text-[var(--navy)]">{title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Process" title="From brief to handover with controlled precision." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {["Consultation", "Design", "Engineering", "Manufacturing","Delivery","Installation"].map((step, index) => (
              <Reveal key={step} className="relative rounded-2xl border border-[var(--border)] bg-white p-6">
                <span className="text-sm font-black text-[var(--blue)]">0{index + 1}</span>
                <h3 className="mt-12 text-xl font-black text-[var(--navy)]">{step}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Featured Projects" title="Image-first work across retail categories." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {projectCats.map((cat) => (
              <Reveal key={cat.label} className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <img src={cat.img} alt={cat.label} className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-5"><p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--navy)]">{cat.label}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--soft)]">
        <div className="container grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-start">
          <SectionTitle eyebrow="Why JMS" title="Built for brands that need consistency at scale." />
          <div className="grid gap-4 sm:grid-cols-2">
            {why.map((item) => <Reveal key={item} className="card flex items-center gap-4 p-6"><ShieldCheck className="text-[var(--blue)]" /><span className="font-black text-[var(--navy)]">{item}</span></Reveal>)}
          </div>
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
