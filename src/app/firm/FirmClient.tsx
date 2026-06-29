"use client";

import { useState } from "react";
import { CheckCircle2, Factory, Ruler, Wrench, Paintbrush, GlassWater, Printer, ShieldCheck, Building2, Sofa, Store, PanelsTopLeft, ArrowRight } from "lucide-react";
import { CTA, PageHero, SectionTitle } from "@/components/SiteShell";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";
import { Reveal } from "@/components/Motion";
import type { Leader, Achievement, Facility, Work } from "@/lib/wordpress";

const facilityIcons = [
  Factory, Building2, Ruler, Wrench, ShieldCheck, Printer, GlassWater, Paintbrush, Store,
];

const capacityIcons = [
  Building2, Sofa, Store, PanelsTopLeft,
];

type FirmData = {
  firm_hero_title: string;
  firm_hero_text: string;
  firm_hero_image: { url: string; alt: string };
  firm_journey_image: { url: string; alt: string };
  firm_journey_paragraphs: string[];
  firm_leadership_title: string;
  firm_leadership_text: string;
};

type PeopleProgram = { title: string; text: string };
type CapacityItem = { title: string; text: string };

type Props = {
  firm: FirmData;
  leaders: Leader[];
  achievements: Achievement[];
  facilities: Facility[];
  works: Work[];
  peoplePrograms: PeopleProgram[];
  coreValues: string[];
  insights: string[];
  capacityItems: CapacityItem[];
};

export default function FirmClient({
  firm,
  leaders,
  achievements,
  facilities,
  works,
  peoplePrograms,
  coreValues,
  insights,
  capacityItems,
}: Props) {
  const [activeFilter, setActiveFilter] = useState("All");

  const workCategories = ["All", ...Array.from(new Set(works.map((w) => w.category)))];

  const filteredWorks = works.filter((w) => {
    if (activeFilter === "All") return true;
    return w.category === activeFilter;
  });

  return (
    <>
      <PageHero
        eyebrow="Firm"
        title={firm.firm_hero_title}
        text={firm.firm_hero_text}
        image={firm.firm_hero_image.url}
      />

      {/* Our Journey */}
      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-start">
          <img src={firm.firm_journey_image.url} alt="" className="h-[620px] w-full rounded-2xl object-cover" />
          <Reveal>
            <p className="eyebrow">Our Journey</p>
            <div className="mt-5 space-y-5 text-lg leading-8 text-slate-650">
              {firm.firm_journey_paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p className="font-bold text-[var(--navy)]">~ Management ~</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="section glass-section">
        <div className="container">
          <SectionTitle eyebrow="Leadership" title={firm.firm_leadership_title} text={firm.firm_leadership_text} />
          <div className="flex flex-wrap justify-center gap-5">
            {leaders.map(({ name, role, photo }) => (
              <Reveal key={name} className="card card-glass relative w-full overflow-hidden before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-white/90 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:bg-gradient-to-br after:from-white/28 after:via-transparent after:to-white/10 sm:flex-[0_0_calc((100%_-_20px)/2)] lg:flex-[0_0_calc((100%_-_60px)/4)]">
                {photo
                  ? (
                    <div className="relative h-72 overflow-hidden bg-white/25">
                      <img
                        src={photo}
                        alt={name}
                        className="h-full w-full object-cover object-top grayscale transition hover:grayscale-0"
                      />
                    </div>
                  )
                  : <div className="flex h-72 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 text-sm font-bold">Photo N/A</div>
                }
                <div className="relative z-20 border-t border-white/60 bg-white/28 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl"><h3 className="font-black text-[var(--navy)]">{name}</h3><p className="mt-2 text-sm text-slate-600">{role}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Achievements" title="Numbers that speak for themselves." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map(({ value, label }, index) => (
              <Reveal key={label} delay={index * 0.05} className="card p-8 text-center">
                <AnimatedStatValue value={value} className="block text-5xl font-black text-[var(--navy)]" />
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Capacity" title="Integrated capacity from design desk to factory floor." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capacityItems.map(({ title, text }, i) => {
              const Icon = capacityIcons[i % capacityIcons.length];
              return (
                <Reveal key={title} className="card p-7">
                  <Icon className="mb-10 text-[var(--blue)]" size={28} />
                  <h3 className="text-xl font-black text-[var(--navy)]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Our Facilities" title="A manufacturing ecosystem built in-house." text="Integrated infrastructure covering every stage of retail execution - from design to fabrication to final installation." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map(({ name, description, image }, i) => {
              const Icon = facilityIcons[i % facilityIcons.length];
              return (
                <Reveal key={name} className="group card overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={image} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <Icon className="mb-4 text-[var(--blue)]" size={22} />
                    <h3 className="text-lg font-black text-[var(--navy)]">{name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Works Portfolio */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Our Works" title="Dedicated project portfolio." text="Explore our completed projects across categories. Filter by sector to discover relevant case studies." />

          <div className="mb-8 flex flex-wrap gap-2">
            {workCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full border px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] transition ${
                  activeFilter === cat
                    ? "border-[var(--blue)] bg-[var(--blue)] text-white"
                    : "border-[var(--border)] bg-white text-[var(--navy)] hover:border-[var(--blue)]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredWorks.map((work) => (
              <Reveal key={work.name} className="group card overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--navy)]/80 via-transparent to-transparent p-5 opacity-0 transition duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-white">
                      View Case Study <ArrowRight size={14} />
                    </span>
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--navy)] shadow-sm backdrop-blur-sm">
                    {work.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-black text-[var(--navy)]">{work.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Project showcase available. Click to explore full case study details and imagery.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* People */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="People" title="Training, safety, skills, and team wellbeing." />
          <div className="grid gap-3 md:grid-cols-3">
            {peoplePrograms.map(({ title, text }) => (
              <details key={title} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <summary className="cursor-pointer font-black text-[var(--navy)]">{title}</summary>
                <p className="mt-4 text-slate-600">{text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Core Values" title={coreValues.join(". ") + "."} />
          <div className="grid gap-5 md:grid-cols-6">
            {coreValues.map((x) => (
              <Reveal key={x} className="card p-6">
                <h3 className="text-2xl font-black text-[var(--navy)]">{x}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Insights JMS" title="Operational thinking from the factory floor." />
          <div className="grid gap-5 md:grid-cols-3">
            {insights.map((x) => (
              <Reveal key={x} className="card p-7">
                <p className="eyebrow">Article</p>
                <h3 className="mt-5 text-xl font-black text-[var(--navy)]">{x}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
