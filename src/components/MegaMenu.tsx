"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Users, BookOpen, LayoutDashboard, Award, ArrowRight } from "lucide-react";

const menuItems = [
  { label: "Firm", href: "/firm", icon: Building2 },
  { label: "Community", href: "/community", icon: Users },
  { label: "Resources", href: "/resources", icon: BookOpen },
  { label: "Process", href: "/work-process", icon: LayoutDashboard },
  { label: "CSR", href: "/csr", icon: Award },
  { label: "PR", href: "/pr", icon: BookOpen },
];

export default function MegaMenu({ isMobile, onNavClick }: { isMobile?: boolean; onNavClick?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    // Match exact segment: pathname must start with href and be followed by / or be the exact path
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav
      className={`flex ${isMobile ? "flex-col" : "items-center gap-1"}`}
    >
      {/* Home link */}
      <Link
        href="/"
        className={`relative px-3 py-2 text-[12px] font-bold uppercase tracking-[0.16em] transition ${
          isMobile ? "block rounded-xl border border-white/10 px-4 py-4 text-white hover:bg-white/8 hover:text-white" : "text-white hover:text-white"
        } ${pathname === "/" ? "text-white" : ""}`}
        onClick={onNavClick}
      >
        Home
        {pathname === "/" && (
          <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[var(--blue)]" />
        )}
      </Link>

      {menuItems.map((item) => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`group relative flex items-center gap-1.5 ${
              isMobile
                ? "w-full rounded-xl border border-white/10 px-4 py-4 text-white/92 transition hover:bg-white/8 hover:text-white"
                : "px-3 py-2 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:text-white/78"
            } ${active ? "text-white" : ""}`}
            onClick={onNavClick}
          >
            <Icon size={14} />
            {item.label}
            {!isMobile && active && (
              <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[var(--blue)]" />
            )}
          </Link>
        );
      })}

      {/* Separator + Request a Quote for Desktop */}
      {!isMobile && (
        <>
          <span className="mx-2 text-white/30">|</span>
          <Link
            href="/reach-us"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:text-white/80"
          >
            <ArrowRight size={12} />
            Request a Quote
          </Link>
        </>
      )}
    </nav>
  );
}
