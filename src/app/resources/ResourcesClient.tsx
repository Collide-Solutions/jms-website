"use client";

import { useState } from "react";
import { Download, X, Eye, FileText } from "lucide-react";
import { Reveal } from "@/components/Motion";
import type { Resource } from "@/lib/wordpress";

function ResourceCard({ item, onView }: { item: Resource; onView: (item: Resource) => void }) {
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

function PdfModal({ item, onClose }: { item: Resource; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ height: "min(90vh, 860px)" }}>
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
        <iframe
          src={`${item.pdf}#toolbar=1&navpanes=0`}
          title={item.title}
          className="h-full w-full flex-1 border-0"
        />
      </div>
    </div>
  );
}

export default function ResourcesClient({
  brochures,
  certificates,
}: {
  brochures: Resource[];
  certificates: Resource[];
}) {
  const [active, setActive] = useState<Resource | null>(null);

  return (
    <>
      {/* Brochures */}
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

      {active && <PdfModal item={active} onClose={() => setActive(null)} />}
    </>
  );
}
