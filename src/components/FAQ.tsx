"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight } from "lucide-react";
import type { FaqItem } from "@/lib/wordpress";

export default function FAQ({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="px-5 py-12 sm:py-16 lg:px-8" aria-label="Frequently Asked Questions">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:items-start">
            <div className="md:sticky md:top-32">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[0.98] text-[var(--navy)] sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Have questions about retail execution, manufacturing capabilities, signage solutions, or nationwide rollouts? We've answered the most common ones below.
              </p>
              <Link
                href="/reach-us"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5"
              >
                Request RFQ <ArrowRight size={15} />
              </Link>
            </div>

            <div itemScope itemType="https://schema.org/FAQPage">
              {faqs.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`rounded-xl border transition-colors ${
                      isOpen
                        ? "border-[var(--blue)]/20 bg-[var(--soft)]"
                        : "border-[var(--border)] bg-white"
                    } ${index > 0 ? "mt-3" : ""}`}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h3
                        className="text-sm font-bold leading-5 sm:text-base sm:leading-6 text-[var(--navy)]"
                        itemProp="name"
                      >
                        {item.question}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full p-1 transition-colors ${
                          isOpen
                            ? "bg-[var(--blue)] text-white"
                            : "bg-[var(--soft)] text-[var(--navy)]"
                        }`}
                      >
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div className="overflow-hidden">
                        <div
                          className="px-4 pb-5 leading-7 text-slate-600 sm:px-5 sm:pb-6"
                          itemProp="text"
                        >
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
