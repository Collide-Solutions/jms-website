"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Motion";

type HomeHeroProps = {
  featureImage: string;
  heroTitle: string;
  heroSubtitle: string;
  badgeLine1: string;
  badgeLine2: string;
  videoUrl: string;
};

export function HomeHero({ featureImage, heroTitle, heroSubtitle, badgeLine1, badgeLine2, videoUrl }: HomeHeroProps) {
  const [showVideo, setShowVideo] = useState(true);
  const heroTextColor = showVideo ? "text-white" : "text-[#112443]";
  const bodyTextColor = showVideo ? "text-white/80" : "text-[#112443]";

  return (
    <section className={`grid-bg relative overflow-hidden ${showVideo ? "bg-[var(--navy)]" : "bg-white"}`}>
      {showVideo && (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover sm:scale-[1.2]"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}
      <div className="absolute right-4 top-4 z-20 hidden sm:block sm:right-6 sm:top-6">
        <label className="flex cursor-pointer items-center gap-3 rounded-full border border-white/30 bg-[var(--navy)]/80 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur">
          <input
            type="checkbox"
            checked={showVideo}
            onChange={(event) => setShowVideo(event.target.checked)}
            className="peer sr-only"
          />
          <span className="h-5 w-9 rounded-full bg-white/25 p-0.5 transition peer-checked:bg-[var(--blue)]">
            <span className={`block h-4 w-4 rounded-full bg-white transition ${showVideo ? "translate-x-4" : ""}`} />
          </span>
          BG {showVideo ? "On" : "Off"}
        </label>
      </div>
      <div className="relative mx-auto grid min-h-[calc(100svh-64px)] max-w-[1400px] gap-8 px-5 py-8 sm:min-h-[calc(100vh-80px)] sm:gap-10 sm:py-16 md:grid-cols-[1fr_.9fr] md:items-center lg:px-8">
        <Reveal>
          <p className="eyebrow max-w-full text-[10px] font-black leading-5 tracking-[0.12em] sm:text-base sm:tracking-[0.28em]">JMS Universal Technologies Pvt. Ltd.</p>
          <h1 className={`mt-5 max-w-full text-[2.08rem] font-black uppercase leading-[0.92] sm:text-6xl md:text-8xl lg:text-9xl ${heroTextColor}`}>{heroTitle}</h1>
          <p className={`mt-5 max-w-2xl text-base leading-7 sm:mt-8 sm:text-lg sm:leading-8 ${bodyTextColor}`}>{heroSubtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
            <Link href="#" className="btn-primary text-[10px] tracking-[0.08em] sm:text-[12px] sm:tracking-[0.16em]">Ecommerce Site - <i>Coming Soon</i></Link>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative">
            <img src={featureImage} alt="Premium retail architecture and fabrication" className="h-80 w-full rounded-2xl object-cover sm:h-[460px] lg:h-[560px]" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/35 bg-white/88 p-4 backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--blue)] sm:text-sm">{badgeLine1}</p>
              <p className="mt-2 text-xl font-black text-[var(--navy)] sm:text-2xl">{badgeLine2}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
