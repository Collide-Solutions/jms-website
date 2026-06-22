"use client";

import { useState } from "react";
import { Download, X, Eye, FileText } from "lucide-react";
import { PageHero } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import { industrialImages } from "@/lib/data";

const brochures = [
  {
    title: "Company Brochure",
    description: "Full overview of JMS Universal Technologies — capabilities, sectors, and reach.",
    pdf: "/Company-Brochure.pdf",
  },
  {
    title: "Factory Licence",
    description: "Certified factory licence authorising in-house manufacturing operations.",
    pdf: "/FACTORY-LICENCE_2024.pdf",
  },
  {
    title: "Product Catalogue",
    description: "Complete product catalogue across signage, fixtures, furniture, and facades.",
    pdf: "/Product-Catalogue.pdf",
  },
  {
    title: "Automobile Brochure",
    description: "Leaders in automotive showroom solutions — fit-outs, signage, and fixtures.",
    pdf: "/JMS-Automobile-Brochure-.pdf",
  },
  {
    title: "Facade Brochure",
    description: "Leaders in facade solutions — architectural cladding, glazing, and storefronts.",
    pdf: "/JMS-Facade-Brochure.pdf",
  },
];

const certificates = [
  {
    title: "GST Certificate",
    description: "Goods & Services Tax registration certificate issued by the Government of India.",
    pdf: "/GST-CERTIFICATE.pdf",
  },
  {
    title: "Incorporation Certificate",
    description: "Certificate of Incorporation confirming legal registration of JMS Universal Technologies.",
    pdf: "/Incorporation-Certificate.pdf",
  },
  {
    title: "JMS – ISO Certificate",
    description: "ISO 9001:2015 certification affirming our quality management standards.",
    pdf: "/JMS-ISO-Certificate.pdf",
  },
];

type ResourceItem = (typeof brochures)[number];

function ResourceCard({ item, onView }: { item: ResourceItem; onView: (item: ResourceItem) => void }) {
  return (
    <Reveal>
      <div className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1">
        <div className="flex h-44 items-center justify-center bg-[var(--soft)]">
          <FileText size={56} className="text-[#c8952a] opacity-80 transition duration-300 group-hover:scale-110" />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-black text-[#c8952a]">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => onView(item)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#c8952a] py-2.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#c8952a] transition hover:bg-[#c8952a] hover:text-white"
            >
              <Eye size={14} /> View
            </button>
            <a
              href={item.pdf}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--navy)] py-2.5 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-[var(--navy-2)] hover:-translate-y-0.5"
            >
              <Download size={14} /> Download
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function PdfModal({ item, onClose }: { item: ResourceItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ height: "min(90vh, 860px)" }}>
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-[#c8952a]" />
            <span className="text-sm font-black uppercase tracking-[0.14em] text-[var(--navy)]">{item.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={item.pdf}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[var(--navy)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-[var(--navy-2)]"
            >
              <Download size={13} /> Download
            </a>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-slate-500 transition hover:bg-[var(--soft)] hover:text-[var(--navy)]"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        {/* PDF iframe */}
        <iframe
          src={`${item.pdf}#toolbar=1&navpanes=0`}
          title={item.title}
          className="h-full w-full flex-1 border-0"
        />
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [active, setActive] = useState<ResourceItem | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Official documents and credentials."
        text="Access company documents, brochures, and official certifications."
        image={industrialImages[2]}
      />

      {/* Brochures & Downloads */}
      <section className="section">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brochures.map((item) => (
              <ResourceCard key={item.title} item={item} onView={setActive} />
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="section border-t border-[var(--border)] pt-0">
        <div className="container">
          <div className="mb-10">
            <h2 className="text-center text-2xl font-black uppercase tracking-[0.06em] text-[#c8952a] sm:text-3xl">
              Certificates
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-[#c8952a]" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((item) => (
              <ResourceCard key={item.title} item={item} onView={setActive} />
            ))}
          </div>
        </div>
      </section>

      {/* PDF modal */}
      {active && <PdfModal item={active} onClose={() => setActive(null)} />}
    </>
  );
}
