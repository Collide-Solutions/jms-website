"use client";

import { useState } from "react";
import { CheckCircle2, Factory, Ruler, Wrench, Paintbrush, GlassWater, Printer, ShieldCheck, Building2, Sofa, Store, PanelsTopLeft } from "lucide-react";
import { CTA, PageHero, SectionTitle } from "@/components/SiteShell";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";
import { Reveal } from "@/components/Motion";
import type { PortfolioCategory } from "@/lib/portfolio";
import type { Leader, Achievement, Facility } from "@/lib/wordpress";
import FirmPortfolio from "./FirmPortfolio";

const facilityIcons = [
  Factory, Building2, Ruler, Wrench, ShieldCheck, Printer, GlassWater, Paintbrush, Store,
];

const capacityIcons = [
  Building2, Sofa, Store, PanelsTopLeft,
];

const leadershipSlotCount = 11;

const leadershipOrder = [
  "manmohan",
  "harveen",
  "gurveen",
  "subramanian",
  "jigar",
  "jatin malhotra",
  "jatin sharof",
  "manoj",
  "santosh",
  "sachin",
  "anil",
];

const getLeadershipOrder = (name: string) => {
  const normalizedName = name.toLowerCase();
  const index = leadershipOrder.findIndex((leaderName) => normalizedName.includes(leaderName));
  return index === -1 ? leadershipOrder.length : index;
};

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
  portfolio: PortfolioCategory[];
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
  portfolio,
  peoplePrograms,
  coreValues,
  insights,
  capacityItems,
}: Props) {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const orderedLeaders = leaders
    .map((leader, originalIndex) => ({ leader, originalIndex }))
    .sort(
      (a, b) =>
        getLeadershipOrder(a.leader.name) - getLeadershipOrder(b.leader.name) ||
        a.originalIndex - b.originalIndex,
    )
    .map(({ leader }) => leader);

  const displayedLeaders: Leader[] = [
    ...orderedLeaders,
    ...Array.from(
      { length: Math.max(leadershipSlotCount - orderedLeaders.length, 0) },
      () => ({
        name: "Leadership Member",
        role: "Details coming soon",
        photo: null,
      }),
    ),
  ];

  const leadershipRows = [
    displayedLeaders.slice(0, 3),
    ...Array.from(
      { length: Math.ceil(Math.max(displayedLeaders.length - 3, 0) / 4) },
      (_, index) => displayedLeaders.slice(3 + index * 4, 7 + index * 4),
    ),
  ].filter((row) => row.length > 0);

  const toggleRow = (rowIndex: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

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
          <Reveal className="md:order-2">
            <p className="eyebrow">Our Journey</p>
            <div className="mt-5 space-y-5 text-lg leading-8 text-slate-650">
              {firm.firm_journey_paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p className="font-bold text-[var(--navy)]">~ Management ~</p>
            </div>
          </Reveal>
          <img src={firm.firm_journey_image.url} alt="" className="aspect-square w-full rounded-2xl object-cover md:order-1 md:aspect-auto md:h-[620px]" />
        </div>
      </section>

      {/* Leadership */}
      <section className="section glass-section">
        <div className="container">
          <SectionTitle eyebrow="Leadership" title={firm.firm_leadership_title} text={firm.firm_leadership_text} />
          <div className="space-y-5">
            {leadershipRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap justify-center gap-5">
                {row.map(({ name, role, photo }, index) => (
                  <Reveal
                    key={`${name}-${rowIndex}-${index}`}
                    className="group card card-glass leadership-card relative w-full overflow-hidden before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-white/90 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:bg-gradient-to-br after:from-white/18 after:via-transparent after:to-white/8 sm:flex-[0_0_calc((100%_-_20px)/2)] lg:flex-[0_0_calc((100%_-_60px)/4)]"
                  >
                    {photo
                      ? (
                        <div className="relative h-[24.5rem] overflow-hidden bg-white/25">
                          <img
                            src={photo}
                            alt={name}
                            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        </div>
                      )
                      : <div className="flex h-[24.5rem] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 text-sm font-bold">Photo N/A</div>
                    }
                    <div className="leadership-info absolute inset-x-0 bottom-0 z-20 p-6">
                      <h3 className="font-black text-[var(--navy)]">{name}</h3>
                      <p className="mt-2 text-sm font-semibold text-slate-700">{role}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
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

      <FirmPortfolio categories={portfolio} />

      {/* People */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="People" title="Training, safety, skills, and team wellbeing." />
          <div className="grid gap-3 md:grid-cols-3">
            {peoplePrograms.map(({ title, text }, index) => {
              const rowIndex = Math.floor(index / 3);
              const isExpanded = !!expandedRows[rowIndex];
              return (
                <div
                  key={title}
                  className="rounded-2xl border border-[var(--border)] bg-white p-5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <button
                      onClick={() => toggleRow(rowIndex)}
                      className="flex w-full items-start gap-2.5 text-left font-black text-[var(--navy)] focus:outline-none group/summary cursor-pointer"
                    >
                      <span className={`mt-1 text-[10px] shrink-0 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-90 text-[var(--blue)]" : ""}`}>
                        ▶
                      </span>
                      <span className="hover:text-[var(--blue)] transition-colors duration-200">
                        {title}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-slate-500 text-sm leading-6">{text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
