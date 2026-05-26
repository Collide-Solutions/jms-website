"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { navItems } from "@/lib/data";

const logoUrl = "https://www.jmsuniversal.com/wp-content/uploads/2023/02/jms-logo.png";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--navy)]/96 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:h-20 sm:px-5 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="JMS Universal home">
          <img src={logoUrl} alt="JMS Universal Technologies" className="h-auto w-28 object-contain transition hover:scale-105 sm:w-40 lg:w-44 px-10" />
        </Link>

        <nav className="hidden items-center gap-7 text-[12px] font-bold uppercase tracking-[0.16em] text-white/82 lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>

        <Link href="/reach-us" className="group hidden items-center gap-2 rounded-full border border-white/70 px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[var(--navy)] lg:flex">
          Request an RFQ <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[var(--navy)] px-4 py-5 lg:hidden">
          <nav className="grid gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-white/86 sm:grid-cols-2">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-white/10 px-4 py-4 transition hover:bg-white/8 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            href="/reach-us"
            className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--navy)]"
            onClick={() => setIsOpen(false)}
          >
            Request an RFQ <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr_1.1fr] lg:px-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <img src={logoUrl} alt="JMS Universal Technologies" className="h-auto w-36 object-contain sm:w-44" />
          <p className="mt-8 max-w-sm text-base leading-7 text-white/72">
            Turnkey retail execution, fabrication, fixtures, furniture, facade systems, and brand rollout solutions across India.
          </p>
          <Link href="/reach-us" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--navy)] transition hover:-translate-y-0.5">
            Contact Us <ArrowRight size={15} />
          </Link>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.2em] text-white/55">Company</h3>
          <ul className="space-y-3 text-sm text-white/78">
            {[
              ["Firm", "/firm"],
              ["Community", "/community"],
              ["CSR", "/csr"],
              ["Blogs", "/blogs"],
              ["Reach Us", "/reach-us"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link className="transition hover:text-white" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.2em] text-white/55">Services</h3>
          <ul className="space-y-3 text-sm text-white/78">
            {["Retail Fixtures", "Facade Systems", "Signage Solutions", "Furniture", "Turnkey Rollouts"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-white/55">Contact Us</h3>
          <div className="mt-6 space-y-5 text-sm text-white/78">
            <p className="flex gap-3 leading-6">
              <MapPin size={18} className="mt-1 shrink-0 text-[var(--blue)]" />
              Mumbai Headquarters and pan India project execution network.
            </p>
            <p className="flex gap-3">
              <Phone size={18} className="shrink-0 text-[var(--blue)]" />
              RFQ Desk / Project Enquiries
            </p>
            <p className="flex gap-3">
              <Mail size={18} className="shrink-0 text-[var(--blue)]" />
              info@jmsuniversal.com
            </p>
          </div>
          <Link href="/reach-us" className="mt-7 flex min-h-12 items-center justify-center rounded-full border border-white/35 px-5 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[var(--navy)]">
            Request an RFQ
          </Link>
        </div>
      </div>
      <div className="border-t border-white/12 px-5 py-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 text-sm text-white/62 md:flex-row md:items-center md:justify-between">
          <p className="font-extrabold uppercase tracking-[0.18em] text-white/82 sm:tracking-[0.28em]">WE ENHANCE BRANDS WORLDWIDE</p>
          <p>© {new Date().getFullYear()} JMS Universal Technologies Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image?: string }) {
  return (
    <section className="grid-bg">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 sm:py-18 md:grid-cols-[1.05fr_.95fr] md:items-end lg:px-8 lg:py-28">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.92] tracking-normal text-[var(--navy)] sm:text-6xl md:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{text}</p>
        </div>
        {image && <img src={image} alt="" className="h-72 w-full rounded-2xl object-cover sm:h-[420px]" />}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-10 max-w-4xl sm:mb-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black uppercase leading-[0.98] text-[var(--navy)] sm:text-4xl md:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{text}</p>}
    </div>
  );
}

export function CTA() {
  return (
    <section className="px-5 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-[1400px] rounded-2xl border border-[var(--border)] bg-white p-7 text-center shadow-sm sm:p-10 md:p-16">
        <p className="eyebrow">RFQ Desk</p>
        <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black uppercase leading-[0.98] text-[var(--navy)] sm:text-4xl md:text-6xl">
          Let&apos;s build your next retail experience.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link className="btn-primary" href="/reach-us">Submit RFQ</Link>
          <Link className="btn-secondary" href="/reach-us">Talk to Team</Link>
        </div>
      </div>
    </section>
  );
}
