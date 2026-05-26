import { CheckCircle2 } from "lucide-react";
import { CTA, PageHero, SectionTitle } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import { achievements, facilities, industrialImages, insights, leaders, works } from "@/lib/data";

export default function FirmPage() {
  return (
    <>
      <PageHero eyebrow="Firm" title="Who we are" text="13+ years of turnkey retail execution and fabrication excellence." image={industrialImages[0]} />
      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-start">
          <img src={industrialImages[3]} alt="" className="h-[620px] w-full rounded-2xl object-cover" />
          <Reveal>
            <p className="eyebrow">Our Journey</p>
            <div className="mt-5 space-y-5 text-lg leading-8 text-slate-650">
              <p>Founded in 2012, JMS Universal Technologies Pvt. Ltd. began with a clear vision: to support brands in creating strong, consistent, and impactful retail identities. What started as a small venture has grown into a trusted name in Corporate Identity, Modular Furniture, Store Fixtures, and Facade Systems.</p>
              <p>Over the past 13 years, we have evolved with the changing landscape of retail, adapting to new technologies, expanding our capabilities, and deepening our understanding of brand environments.</p>
              <p>Every milestone reflects our belief that a brand&apos;s physical presence should be as powerful as its promise. With each project, we deliver turnkey solutions and build long-term relationships grounded in trust, performance, and shared success.</p>
              <p className="font-bold text-[var(--navy)]">~ Management ~</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Leadership" title="Driven by vision, led by experts." text="At JMS, our strength lies in our people. Visionary leadership and experienced teams turn ideas into impactful realities." />
          <div className="flex flex-wrap justify-center gap-5">
            {leaders.map(([name, role]) => <Reveal key={name} className="card w-full overflow-hidden sm:flex-[0_0_calc((100%_-_20px)/2)] lg:flex-[0_0_calc((100%_-_60px)/4)]"><div className="h-64 bg-gradient-to-br from-slate-100 to-slate-300 grayscale transition hover:grayscale-0" /><div className="p-6"><h3 className="font-black text-[var(--navy)]">{name}</h3><p className="mt-2 text-sm text-slate-500">{role}</p></div></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-4 md:grid-cols-4">{achievements.map(([v, l]) => <Reveal key={l} className="text-center"><div className="text-5xl font-black text-[var(--navy)]">{v}</div><p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">{l}</p></Reveal>)}</div>
      </section>
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Capacity" title="Integrated capacity from design desk to factory floor." />
          <div className="grid gap-5 md:grid-cols-4">{["Retail Fixtures & Displays", "Retail & Commercial Furniture", "Corporate Identity Execution", "Facade & Storefront Design"].map((x) => <Reveal key={x} className="card p-7"><CheckCircle2 className="mb-12 text-[var(--blue)]" /><h3 className="text-xl font-black text-[var(--navy)]">{x}</h3></Reveal>)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Facilities" title="A manufacturing ecosystem built in-house." />
          <div className="grid gap-5 md:grid-cols-3">{facilities.map((f, i) => <Reveal key={f} className="card overflow-hidden"><img src={industrialImages[i % industrialImages.length]} alt="" className="h-56 w-full object-cover" /><div className="p-6"><h3 className="font-black text-[var(--navy)]">{f}</h3></div></Reveal>)}</div>
        </div>
      </section>
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="People" title="Training, safety, skills, and team wellbeing." />
          <div className="grid gap-3 md:grid-cols-3">{["Training", "Motivation sessions", "Safety training", "Communication skills", "Product updates", "Mental strength counseling", "Sports activities", "Family engagement programs", "Field study trips"].map((x) => <details key={x} className="rounded-2xl border border-[var(--border)] bg-white p-5"><summary className="cursor-pointer font-black text-[var(--navy)]">{x}</summary><p className="mt-4 text-slate-600">Structured programs that strengthen capability, confidence, and workplace culture.</p></details>)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Core Values" title="Transparency. Dedication. Respect. Responsibility. Integrity. Legacy." />
          <div className="grid gap-5 md:grid-cols-6">{["Transparency", "Dedication", "Respect", "Responsibility", "Integrity", "Legacy"].map((x) => <Reveal key={x} className="card p-6"><h3 className="text-2xl font-black text-[var(--navy)]">{x}</h3></Reveal>)}</div>
        </div>
      </section>
      <section className="section bg-[var(--soft)]">
        <div className="container">
          <SectionTitle eyebrow="Our Works" title="Filterable-ready project categories." />
          <div className="grid gap-4 md:grid-cols-5">{works.map((x) => <div key={x} className="rounded-full border border-[var(--border)] bg-white px-5 py-4 text-sm font-bold text-[var(--navy)]">{x}</div>)}</div>
        </div>
      </section>
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
