"use client";

import { useState } from "react";
import { Leaf, MapPinned, Quote, Globe, Network, ArrowUpRight } from "lucide-react";
import { CTA, PageHero, SectionTitle } from "@/components/SiteShell";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";
import { Reveal } from "@/components/Motion";
import MultiStepForm, { contractorSteps, vendorSteps, careerSteps } from "@/components/MultiStepForm";
import type { Testimonial, PartnerSector } from "@/lib/wordpress";

type Props = {
  commitments: string[];
  testimonials: Testimonial[];
  workflow: string[];
  partnerSectors: PartnerSector[];
  indiaRegions: string[];
  networkStats: string[];
  globalStats: Array<{ label: string; value: string }>;
  globalMarkets: Array<{ title: string; desc: string }>;
  communityHeroTitle: string;
  communityHeroText: string;
  communityHeroImage: string;
};

export default function CommunityClient({
  commitments,
  testimonials,
  workflow,
  partnerSectors,
  indiaRegions,
  networkStats,
  globalStats,
  globalMarkets,
  communityHeroTitle,
  communityHeroText,
  communityHeroImage,
}: Props) {
  const [activeSection, setActiveSection] = useState<"contractor" | "vendor" | "career" | null>(null);

  const handleFormSubmit = (formType: "contractor" | "vendor" | "career") => async (data: Record<string, string | File[]>) => {
    const payload = new FormData();
    payload.append("formType", formType);

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => payload.append(key, file));
        return;
      }

      payload.append(key, value);
    });

    const response = await fetch("/api/community-form", {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      throw new Error("We could not submit the form right now. Please try again.");
    }
  };

  return (
    <>
      <PageHero eyebrow="Community" title={communityHeroTitle} text={communityHeroText} image={communityHeroImage} />

      {/* Green Commitments */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Green Commitments" title="Responsible practices for long-term value." />
          <div className="grid gap-5 md:grid-cols-5">
            {commitments.map((x) => (
              <Reveal key={x} className="card p-6">
                <Leaf className="mb-10 text-[var(--blue)]" size={24} />
                <h3 className="font-black text-[var(--navy)]">{x}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us / Forms */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Join Us" title="Contractors, vendors, and careers." text="Register your interest with our multi-step application process. Upload documents, share your expertise, and join the JMS network." />

          <div className="mb-10 flex flex-wrap gap-3">
            {[
              { id: "contractor" as const, label: "Contractor Registration" },
              { id: "vendor" as const, label: "Vendor Registration" },
              { id: "career" as const, label: "Join Our Team" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(activeSection === item.id ? null : item.id)}
                className={`rounded-full border px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.16em] transition ${
                  activeSection === item.id
                    ? "border-[var(--blue)] bg-[var(--blue)] text-white"
                    : "border-[var(--border)] bg-white text-[var(--navy)] hover:border-[var(--blue)]/40"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activeSection === "contractor" && (
              <div className="md:col-span-2 lg:col-span-3 max-w-2xl mx-auto w-full">
                <MultiStepForm title="Contractor Registration" steps={contractorSteps} onSubmit={handleFormSubmit("contractor")} submitLabel="Register as Contractor" onClose={() => setActiveSection(null)} />
              </div>
            )}
            {activeSection === "vendor" && (
              <div className="md:col-span-2 lg:col-span-3 max-w-2xl mx-auto w-full">
                <MultiStepForm title="Vendor Registration" steps={vendorSteps} onSubmit={handleFormSubmit("vendor")} submitLabel="Register as Vendor" onClose={() => setActiveSection(null)} />
              </div>
            )}
            {activeSection === "career" && (
              <div className="md:col-span-2 lg:col-span-3 max-w-2xl mx-auto w-full">
                <MultiStepForm title="Join Our Team" steps={careerSteps} onSubmit={handleFormSubmit("career")} submitLabel="Submit Application" onClose={() => setActiveSection(null)} />
              </div>
            )}

            {!activeSection && (
              <>
                {[
                  { title: "Contractor Registration", desc: "Register your contracting business for project collaborations with JMS. Share your expertise and past work.", count: "3-step process" },
                  { title: "Vendor Registration", desc: "Become a certified vendor in our supply chain. We work with trusted partners across all categories.", count: "3-step process" },
                  { title: "Join Our Team", desc: "Explore career opportunities at JMS. Submit your application and resume for open positions.", count: "3-step process" },
                ].map((item) => (
                  <Reveal key={item.title} className="card p-7">
                    <h3 className="text-xl font-black text-[var(--navy)]">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--blue)]">
                      {item.count} <ArrowUpRight size={14} />
                    </p>
                  </Reveal>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* India Coverage */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Network" title="Pan India coverage." text="A distributed delivery network designed for national rollouts and future international expansion." />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="relative rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
              <div className="mx-auto grid max-w-md grid-cols-3 gap-3">
                <div className="col-span-3 mb-4 flex justify-center">
                  <MapPinned size={48} className="text-[var(--blue)]" />
                </div>
                {indiaRegions.map((region, i) => {
                  const positions = [
                    "col-start-2",
                    "col-start-1 row-start-2",
                    "col-start-3 row-start-2",
                    "col-start-2 row-start-2",
                    "col-span-3 row-start-3",
                  ];
                  return (
                    <Reveal key={region} className={`card group p-5 text-center transition hover:border-[var(--blue)]/40 hover:shadow-md ${positions[i] || ""}`}>
                      <div className="mx-auto mb-2 h-2 w-2 rounded-full bg-[var(--blue)] transition group-hover:scale-150" />
                      <p className="text-sm font-black text-[var(--navy)]">{region}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-400">Coverage</p>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-7">
                <Network size={24} className="mb-4 text-[var(--blue)]" />
                <h3 className="text-2xl font-black text-[var(--navy)]">Nationwide Reach</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  JMS operates across all five regions of India - North, South, East, West, and Central - ensuring consistent retail execution, installation, and after-sales support no matter where your brand needs to be.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {networkStats.map((item) => (
                  <div key={item} className="rounded-xl border border-[var(--border)] bg-white p-4 text-center">
                    <p className="text-sm font-black text-[var(--navy)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Expansion */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Global Expansion" title="Beyond India, building globally." text="Building a stronger presence across global markets while maintaining excellence in retail execution and manufacturing." />

          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--soft)] via-white to-[var(--soft)] p-8 shadow-sm">
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 600 300" className="h-full w-full">
                  <circle cx="150" cy="150" r="80" fill="none" stroke="var(--blue)" strokeWidth="0.5" />
                  <circle cx="450" cy="120" r="60" fill="none" stroke="var(--blue)" strokeWidth="0.5" />
                  <line x1="230" y1="150" x2="390" y2="120" stroke="var(--blue)" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="150" y1="150" x2="450" y2="120" stroke="var(--blue)" strokeWidth="0.5" strokeDasharray="2 4" />
                  <circle cx="300" cy="150" r="40" fill="var(--blue)" opacity="0.06" />
                  <circle cx="150" cy="150" r="4" fill="var(--blue)" />
                  <circle cx="450" cy="120" r="4" fill="var(--blue)" />
                  <circle cx="300" cy="150" r="3" fill="var(--blue)" />
                </svg>
              </div>

              <div className="relative">
                <Globe size={48} className="text-[var(--blue)]" />
                <h3 className="mt-4 text-2xl font-black text-[var(--navy)]">Global Markets</h3>
                <p className="mt-3 max-w-lg leading-7 text-slate-600">
                  Building a stronger presence across global markets while maintaining excellence in retail execution and manufacturing.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {globalStats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-[var(--border)] bg-white p-4 text-center">
                      <AnimatedStatValue value={stat.value} className="block text-2xl font-black text-[var(--blue)]" />
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {globalMarkets.map((region) => (
                <Reveal key={region.title} className="card p-5 transition hover:border-[var(--blue)]/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-black text-[var(--navy)]">{region.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{region.desc}</p>
                    </div>
                    <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-[var(--blue)]" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Sectors */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Partners & Sectors" title="Retail clothing, automobile, and hospitality ecosystems." />
          <div className="grid gap-5 md:grid-cols-3">
            {partnerSectors.map((x) => (
              <Reveal key={x.label} className="card overflow-hidden">
                <img src={x.img} alt={x.label} className="h-72 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-black text-[var(--navy)]">{x.label}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Testimonials" title="What people notice." />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map(({ quote, author }) => (
              <Reveal key={author} className="card p-7">
                <Quote className="mb-8 text-[var(--blue)]" size={24} />
                <p className="text-2xl font-black text-[var(--navy)]">&ldquo;{quote}&rdquo;</p>
                <p className="mt-5 text-sm font-bold text-slate-500">{author}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Workflow" title="Teams aligned from study to installation." />
          <div className="grid gap-4 md:grid-cols-5">
            {workflow.map((x, i) => (
              <div key={x} className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--blue)]/30 hover:shadow-sm">
                <span className="text-sm font-black text-[var(--blue)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 font-black text-[var(--navy)]">{x}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
