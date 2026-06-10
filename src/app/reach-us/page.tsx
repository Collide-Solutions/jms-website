import { Mail, MapPin, Phone, Building2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/SiteShell";
import { industrialImages } from "@/lib/data";

const contactData = {
  email: "jatinshroff@jmsuniversal.com",
  address: "Suite No. 1207–1208, Hubtown Solaris One, Andheri East, Opp. Telli Gully, Mumbai – 400069",
};

export default function ReachUsPage() {
  return (
    <>
      <PageHero eyebrow="Reach Us" title="Start an RFQ conversation." text="Connect with JMS for turnkey retail execution, facade, furniture, signage, and rollout programs." image={industrialImages[0]} />
      <section className="section bg-[var(--soft)]">
        <div className="container grid gap-8 md:grid-cols-[1.05fr_.95fr]">
          <form className="card space-y-4 p-7 md:p-10">
            <h2 className="text-3xl font-black uppercase text-[var(--navy)]">Request an RFQ</h2>
            {["Name", "Company", "Email", "Phone", "Project Location"].map((x) => (
              <input
                key={x}
                className="w-full rounded-xl border border-[var(--border)] bg-white p-4 text-sm transition focus:border-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/20"
                placeholder={x}
              />
            ))}
            <textarea className="min-h-36 w-full rounded-xl border border-[var(--border)] bg-white p-4 text-sm transition focus:border-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/20" placeholder="Project brief" />
            <button className="btn-primary w-full" type="button">Submit RFQ</button>
          </form>
          <div className="space-y-5">
            <div className="card p-7">
              <Building2 className="mb-6 text-[var(--blue)]" size={24} />
              <h3 className="text-2xl font-black text-[var(--navy)]">Mumbai Headquarters</h3>
              <p className="mt-3 leading-7 text-slate-600">{contactData.address}</p>
            </div>
            <div className="card p-7">
              <MapPin className="mb-6 text-[var(--blue)]" size={24} />
              <h3 className="text-2xl font-black text-[var(--navy)]">Factory</h3>
              <p className="mt-3 leading-7 text-slate-600">60,000 sq.ft production area with in-house fabrication and logistics</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card p-6 transition hover:border-[var(--blue)]/30">
                <Phone className="mb-3 text-[var(--blue)]" size={20} />
                <p className="font-black text-[var(--navy)]">RFQ Desk</p>
                <p className="mt-1 text-sm text-slate-500">Project Enquiries</p>
              </div>
              <div className="card p-6 transition hover:border-[var(--blue)]/30">
                <Mail className="mb-3 text-[var(--blue)]" size={20} />
                <p className="font-black text-[var(--navy)]">Email</p>
                <a href={`mailto:${contactData.email}`} className="mt-1 block text-sm text-[var(--blue)] transition hover:underline">{contactData.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
