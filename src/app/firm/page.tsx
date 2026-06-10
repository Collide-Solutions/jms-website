"use client";

import { useState } from "react";
import { CheckCircle2, Factory, Ruler, Wrench, Paintbrush, GlassWater, Printer, ShieldCheck, Building2, Sofa, Store, PanelsTopLeft, ArrowRight } from "lucide-react";
import { CTA, PageHero, SectionTitle } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import { achievements, facilities, industrialImages, insights, leaders, works, capacityItems } from "@/lib/data";

const facilityIcons = [
  Factory, Building2, Ruler, Wrench, ShieldCheck, Printer, GlassWater, Paintbrush, Store,
];

const capacityIcons = [
  Building2, Sofa, Store, PanelsTopLeft,
];

const workCategories = [
  "All",
  "Automobile",
  "Bank",
  "Gas Station",
  "Healthcare",
  "Hospitality",
  "Retail",
];

export default function FirmPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredWorks = works.filter((w) => {
    if (activeFilter === "All") return true;
    const lower = w.toLowerCase();
    return lower.includes(activeFilter.toLowerCase());
  });

  return (
    <>
      <PageHero eyebrow="Firm" title="Who we are" text="Over a decade of turnkey retail execution and fabrication excellence." image={industrialImages[0]} />
      
      {/* Our Journey */}
      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-start">
          <img src={industrialImages[3]} alt="" className="h-[620px] w-full rounded-2xl object-cover" />
          <Reveal>
            <p className="eyebrow">Our Journey</p>
            <div className="mt-5 space-y-5 text-lg leading-8 text-slate-650">
              <p>Founded in 2012, JMS Universal Technologies Pvt. Ltd. began with a clear vision: to support brands in creating strong, consistent, and impactful retail identities. What started as a small venture has grown into a trusted name in Corporate Identity, Modular Furniture, Store Fixtures, and Facade Systems.</p>
              <p>Over the past decade, we have evolved with the changing landscape of retail, adapting to new technologies, expanding our capabilities, and deepening our understanding of brand environments.</p>
              <p>Every milestone reflects our belief that a brand's physical presence should be as powerful as its promise. With each project, we deliver turnkey solutions and build long-term relationships grounded in trust, performance, and shared success.</p>
              <p className="font-bold text-[var(--navy)]">~ Management ~</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Leadership" title="Driven by vision, led by experts." text="At JMS, our strength lies in our people. Visionary leadership and experienced teams turn ideas into impactful realities." />
          <div className="flex flex-wrap justify-center gap-5">
            {leaders.map(([name, role]) => <Reveal key={name} className="card w-full overflow-hidden sm:flex-[0_0_calc((100%_-_20px)/2)] lg:flex-[0_0_calc((100%_-_60px)/4)]"><div className="h-64 bg-gradient-to-br from-slate-100 to-slate-300 grayscale transition hover:grayscale-0" /><div className="p-6"><h3 className="font-black text-[var(--navy)]">{name}</h3><p className="mt-2 text-sm text-slate-500">{role}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Achievements" title="Numbers that speak for themselves." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map(([value, label], index) => (
              <Reveal key={label} delay={index * 0.05} className="card p-8 text-center">
                <div className="text-5xl font-black text-[var(--navy)]">{value}</div>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity Section - Reordered */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Capacity" title="Integrated capacity from design desk to factory floor." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capacityItems.map((item, i) => {
              const Icon = capacityIcons[i];
              return (
                <Reveal key={item} className="card p-7">
                  <Icon className="mb-10 text-[var(--blue)]" size={28} />
                  <h3 className="text-xl font-black text-[var(--navy)]">{item}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {i === 0 && "Consistent brand systems, signage, and retail identity programs built for scale."}
                    {i === 1 && "Commercial furniture programs engineered for durability and brand fit across retail and office environments."}
                    {i === 2 && "Precision fixtures, displays, counters, and rollouts designed for high-traffic retail spaces."}
                    {i === 3 && "Architectural storefronts, cladding, glazing, and external brand expressions for premium retail facades."}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 1: Our Facilities - Premium capability showcase */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Our Facilities" title="A manufacturing ecosystem built in-house." text="Integrated infrastructure covering every stage of retail execution — from design to fabrication to final installation." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, i) => {
              const Icon = facilityIcons[i % facilityIcons.length];
              return (
                <Reveal key={f} className="group card overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={industrialImages[i % industrialImages.length]} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <Icon className="mb-4 text-[var(--blue)]" size={22} />
                    <h3 className="text-lg font-black text-[var(--navy)]">{f}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {i === 0 && "End-to-end project coordination from site study to installation handover."}
                      {i === 1 && "Creative teams specializing in retail branding, identity design, and spatial planning."}
                      {i === 2 && "Precision joinery for custom fixtures, furniture, and display systems."}
                      {i === 3 && "Advanced metal fabrication for structural components and retail infrastructure."}
                      {i === 4 && "Complete in-house sign fabrication capability for all signage requirements."}
                      {i === 5 && "State-of-the-art digital printing for large-format graphics and branding elements."}
                      {i === 6 && "Specialized glass and aluminum fabrication for storefronts and facade systems."}
                      {i === 7 && "Comprehensive digital and static signage solutions for retail environments."}
                      {i === 8 && "Dedicated fixtures manufacturing line for retail displays and merchandising units."}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Our Works - Filterable Portfolio Gallery */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Our Works" title="Dedicated project portfolio." text="Explore our completed projects across categories. Filter by sector to discover relevant case studies." />
          
          {/* Filter Buttons */}
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

          {/* Portfolio Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredWorks.map((work, i) => (
              <Reveal key={work} className="group card overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={industrialImages[i % industrialImages.length]}
                    alt={work}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--navy)]/80 via-transparent to-transparent p-5 opacity-0 transition duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-white">
                      View Case Study <ArrowRight size={14} />
                    </span>
                  </div>
                  {/* Category badge */}
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--navy)] shadow-sm backdrop-blur-sm">
                    {workCategories.includes(work.split(" ")[0]) ? work.split(" ")[0] : "Retail"}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-black text-[var(--navy)]">{work}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Project showcase available. Click to explore full case study details and imagery.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* People Section */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="People" title="Training, safety, skills, and team wellbeing." />
          <div className="grid gap-3 md:grid-cols-3">{["Training", "Motivation sessions", "Safety training", "Communication skills", "Product updates", "Mental strength counseling", "Sports activities", "Family engagement programs", "Field study trips"].map((x) => <details key={x} className="rounded-2xl border border-[var(--border)] bg-white p-5"><summary className="cursor-pointer font-black text-[var(--navy)]">{x}</summary><p className="mt-4 text-slate-600">Structured programs that strengthen capability, confidence, and workplace culture.</p></details>)}</div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Core Values" title="Transparency. Dedication. Respect. Responsibility. Integrity. Legacy." />
          <div className="grid gap-5 md:grid-cols-6">{["Transparency", "Dedication", "Respect", "Responsibility", "Integrity", "Legacy"].map((x) => <Reveal key={x} className="card p-6"><h3 className="text-2xl font-black text-[var(--navy)]">{x}</h3></Reveal>)}</div>
        </div>
      </section>

      {/* Insights */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Insights JMS" title="Operational thinking from the factory floor." />
          <div className="grid gap-5 md:grid-cols-3">{insights.map((x) => <Reveal key={x} className="card p-7"><p className="eyebrow">Article</p><h3 className="mt-5 text-xl font-black text-[var(--navy)]">{x}</h3></Reveal>)}</div>
        </div>
      </section>
      <CTA />
    </>
  );
}
