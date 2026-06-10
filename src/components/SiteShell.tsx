"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Menu, Phone, X, Facebook, Instagram, Youtube, Plus, Minus } from "lucide-react";
import { navItems, industrialImages } from "@/lib/data";
import MegaMenu from "@/components/MegaMenu";

const logoUrl = "https://www.jmsuniversal.com/wp-content/uploads/2023/02/jms-logo.png";
const makeUrl = "https://www.jmsuniversal.com/wp-content/uploads/2023/02/Made-In-India-Logo.png";

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--navy)]/96 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:h-20 sm:px-5 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="JMS Universal home">
          <img src={logoUrl} alt="JMS Universal Technologies" className="h-auto w-28 object-contain transition hover:scale-105 sm:w-40 lg:w-44 px-10" />
        </Link>

        <div className="hidden lg:flex lg:items-center">
          <MegaMenu />
        </div>

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
          <MegaMenu isMobile onNavClick={() => setIsOpen(false)} />
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
  const contactData = {
    email: "jatinshroff@jmsuniversal.com",
    address: "Suite No. 1207–1208, Hubtown Solaris One, Andheri East, Opp. Telli Gully, Mumbai – 400069",
  };

  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr_1.2fr] lg:px-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <img src={logoUrl} alt="JMS Universal Technologies" className="h-auto w-36 object-contain sm:w-44" />
          <p className="mt-8 max-w-sm text-base leading-7 text-white/72">
            Turnkey retail execution, fabrication, fixtures, furniture, facade systems, and brand rollout solutions across India.
          </p>
          <Link href="/reach-us" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--navy)] transition hover:-translate-y-0.5">
            Contact Us <ArrowRight size={15} />
          </Link>
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
            <img src={makeUrl} alt="JMS Universal Technologies" className="h-auto w-36 object-contain sm:w-44" />
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/50">PROUDLY MADE IN INDIA</p>
              <p className="mt-0.5 text-xs leading-5 text-white/65">Manufacturing and executing retail projects nationwide through our in-house facilities.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.2em] text-white/55">Company</h3>
          <ul className="space-y-3 text-sm text-white/78">
            {[
              ["Firm", "/firm"],
              ["Community", "/community"],
              ["CSR", "/csr"],
              ["PR", "/pr"],
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
            <div className="flex gap-3 leading-6">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--blue)]" />
              <div>
                <p className="font-bold text-white/90">Mumbai Headquarters</p>
                <p className="mt-0.5">{contactData.address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone size={18} className="shrink-0 text-[var(--blue)]" />
              <div>
                <p className="font-bold text-white/90">RFQ Desk / Project Enquiries</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail size={18} className="shrink-0 text-[var(--blue)]" />
              <div>
                <p className="font-bold text-white/90">Email</p>
                <a href={`mailto:${contactData.email}`} className="transition hover:text-white">{contactData.email}</a>
              </div>
            </div>
          </div>
          <hr className="my-5 border-white/12" />
          <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-white/55">Follow Us</h4>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.linkedin.com/company/jmsuniversal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/78 transition hover:border-white hover:bg-white hover:text-[var(--navy)]"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={18} />
            </a>
            <a
              href="https://www.instagram.com/jmsuniversal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/78 transition hover:border-white hover:bg-white hover:text-[var(--navy)]"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/jmsuniversal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/78 transition hover:border-white hover:bg-white hover:text-[var(--navy)]"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.youtube.com/@jmsuniversal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/78 transition hover:border-white hover:bg-white hover:text-[var(--navy)]"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
          <Link href="/reach-us" className="mt-7 flex min-h-12 items-center justify-center rounded-full border border-white/35 px-5 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[var(--navy)]">
            Request an RFQ
          </Link>
        </div>
      </div>
      <div className="border-t border-white/12 px-5 py-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 text-sm text-white/62 md:flex-row md:items-center md:justify-between">
          <p className="font-extrabold uppercase tracking-[0.18em] text-white/82 sm:tracking-[0.28em]">WE BUILD RETAIL EXPERIENCES ACROSS INDIA</p>
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
          <p className="eyebrow text-[var(--blue)]">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.92] tracking-normal text-[var(--blue)] sm:text-6xl md:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--navy)]/80 sm:text-lg sm:leading-8">{text}</p>
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
          RFQ Desk
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          Let's build your next retail success.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link className="btn-primary" href="/reach-us">Submit RFQ</Link>
          <Link className="btn-secondary" href="/reach-us">Talk to Team</Link>
        </div>
      </div>
    </section>
  );
}
