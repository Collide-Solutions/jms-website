import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/SiteShell";
import { industrialImages } from "@/lib/data";

export default function ReachUsPage() {
  return (
    <>
      <PageHero eyebrow="Reach Us" title="Start an RFQ conversation." text="Connect with JMS for turnkey retail execution, facade, furniture, signage, and rollout programs." image={industrialImages[0]} />
      <section className="section bg-[var(--soft)]"><div className="container grid gap-8 md:grid-cols-[1.05fr_.95fr]">
        <form className="card space-y-4 p-7 md:p-10">
          <h2 className="text-3xl font-black uppercase text-[var(--navy)]">Request an RFQ</h2>
          {["Name", "Company", "Email", "Phone", "Project Location"].map((x) => <input key={x} className="w-full rounded-xl border border-[var(--border)] p-4" placeholder={x} />)}
          <textarea className="min-h-36 w-full rounded-xl border border-[var(--border)] p-4" placeholder="Project brief" />
          <button className="btn-primary" type="button">Submit RFQ</button>
        </form>
        <div className="space-y-5">
          {[["Mumbai Office", "JMS Universal Technologies Pvt. Ltd., Mumbai Headquarters"], ["Factory", "60,000 sq.ft production area with in-house fabrication and logistics"], ["RFQ Desk", "Pan India retail rollout and turnkey manufacturing support"]].map(([h, t]) => <div key={h} className="card p-7"><MapPin className="mb-8 text-[var(--blue)]" /><h3 className="text-2xl font-black text-[var(--navy)]">{h}</h3><p className="mt-3 leading-7 text-slate-600">{t}</p></div>)}
          <div className="grid gap-4 sm:grid-cols-2"><div className="card p-6"><Phone className="text-[var(--blue)]" /><p className="mt-4 font-black text-[var(--navy)]">Talk to team</p></div><div className="card p-6"><Mail className="text-[var(--blue)]" /><p className="mt-4 font-black text-[var(--navy)]">Email RFQ desk</p></div></div>
        </div>
      </div></section>
    </>
  );
}
