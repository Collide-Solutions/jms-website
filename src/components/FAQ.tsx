"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight } from "lucide-react";

const faqData = [
  {
    question: "Do you manufacture retail fixtures in-house?",
    answer:
      "Yes. JMS operates its own dedicated manufacturing facilities for retail fixtures, modular furniture, signage, facade systems, and branding solutions. All fabrication, joinery, metalwork, printing, and assembly are completed in-house under strict quality control, ensuring consistency and faster turnaround across projects.",
  },
  {
    question: "Can JMS handle multi-city retail rollouts?",
    answer:
      "Absolutely. JMS specializes in coordinated multi-city and multi-location retail rollouts. With centralized project management, standardized manufacturing processes, and a pan-India installation network, we ensure brand consistency and timely execution across all locations simultaneously.",
  },
  {
    question: "What is the typical project execution timeline?",
    answer:
      "Timelines vary based on scope and scale. A standard single-store rollout typically takes 4-6 weeks from design finalization to installation. Large-scale multi-location projects are planned in phases with detailed milestone schedules. We provide a clear timeline during the proposal stage.",
  },
  {
    question: "Do you provide facade and signage solutions?",
    answer:
      "Yes. JMS offers comprehensive facade systems including architectural cladding, glazing, storefronts, and external brand expressions, along with complete signage solutions such as illuminated signs, wayfinding systems, digital signage, and custom branding for both interior and exterior applications.",
  },
  {
    question: "Which industries does JMS work with?",
    answer:
      "JMS serves retail brands, automotive showrooms, corporate offices, healthcare facilities, commercial spaces, hospitality, and any business requiring branded physical environments and standardized store rollouts.",
  },
  {
    question: "Can JMS support nationwide installations?",
    answer:
      "Yes. JMS has a robust pan-India execution network that enables project delivery, installation, and on-site support across all major cities and regional markets. Our teams are equipped to handle projects anywhere in the country.",
  },
  {
    question: "How do I submit an RFQ?",
    answer:
      "You can submit a Request for Quotation directly through our website via the RFQ Desk section, or contact our team through the Contact Us page. We typically respond within 24-48 hours with a detailed proposal covering scope, timeline, and pricing.",
  },
  {
    question: "What makes JMS different from other retail execution companies?",
    answer:
      "JMS stands apart through our fully integrated in-house manufacturing capabilities, single-window execution model, pan-India reach, centralized quality control, and deep expertise across fixtures, furniture, facades, signage, and turnkey rollouts. We deliver brand consistency at scale without compromising on quality or timelines.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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
            {/* Left Column */}
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

            {/* Right Column - Accordion */}
            <div itemScope itemType="https://schema.org/FAQPage">
              {faqData.map((item, index) => {
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
                        className={`text-sm font-bold leading-5 sm:text-base sm:leading-6 ${
                          isOpen ? "text-[var(--navy)]" : "text-[var(--navy)]"
                        }`}
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