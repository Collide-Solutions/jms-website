"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { SectionTitle } from "@/components/SiteShell";
import type { PortfolioCategory, PortfolioPhoto } from "@/lib/portfolio";

type GalleryPhoto = PortfolioPhoto & { project: string };

function PortfolioLightbox({
  category,
  photos,
  index,
  onClose,
  onNavigate,
}: {
  category: string;
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const photo = photos[index];
  const canNavigate = photos.length > 1;

  useEffect(() => {
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const close = () => dialog.current?.close();
  const controlClass = "grid size-11 shrink-0 cursor-pointer touch-manipulation place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  return (
    <dialog
      ref={dialog}
      aria-label={`${category} photo gallery`}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onKeyDown={(event) => {
        if (!canNavigate) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          onNavigate(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-slate-950 p-4 text-white sm:p-6"
    >
      <div className="mx-auto grid h-full max-w-[1400px] grid-rows-[auto_minmax(0,1fr)_auto] gap-4">
        <header className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest">{category}</h3>
          <button type="button" onClick={close} aria-label="Close photo gallery" className={controlClass}>
            <X size={21} />
          </button>
        </header>

        <div
          className="relative touch-pinch-zoom"
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start || !canNavigate) return;
            const touch = event.changedTouches[0];
            const distance = touch.clientX - start.x;
            if (Math.abs(distance) > 50 && Math.abs(distance) > Math.abs(touch.clientY - start.y)) {
              event.preventDefault();
              onNavigate(distance < 0 ? 1 : -1);
            }
          }}
        >
          <Image src={photo.image} alt={photo.alt} fill unoptimized draggable={false} className="select-none object-contain" />
        </div>

        <footer className="grid min-h-12 grid-cols-[2.75rem_1fr_2.75rem] items-center gap-3">
          {canNavigate && (
            <button type="button" onClick={() => onNavigate(-1)} aria-label="Previous photo" className={controlClass}>
              <ChevronLeft size={23} />
            </button>
          )}
          <div className="col-start-2 text-center" aria-live="polite">
            <p className="text-sm font-bold sm:text-base">{photo.project}</p>
            <p className="mt-1 text-xs tabular-nums text-slate-300">{index + 1} of {photos.length}</p>
          </div>
          {canNavigate && (
            <button type="button" onClick={() => onNavigate(1)} aria-label="Next photo" className={controlClass}>
              <ChevronRight size={23} />
            </button>
          )}
        </footer>
      </div>
    </dialog>
  );
}

export default function FirmPortfolio({ categories }: { categories: PortfolioCategory[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const filters = useRef<HTMLDivElement>(null);
  const selected = categories.find(({ name }) => name === activeCategory);
  const photos = selected?.projects.flatMap((project) => {
    return project.photos.map((photo) => ({ ...photo, project: project.name }));
  }) ?? [];
  const filtersList = [null, ...categories.map(({ name }) => name)];

  function selectCategory(category: string | null) {
    setActiveCategory(category);
    setPhotoIndex(null);
  }

  return (
    <section id="portfolio" aria-label="Project portfolio" className="section scroll-mt-20 bg-[var(--soft)]">
      <div className="container">
        <SectionTitle eyebrow="Our Works" title="Project portfolio" />
        <div ref={filters} role="group" aria-label="Filter portfolio by category" className="mb-8 flex flex-wrap gap-2">
          {filtersList.map((category) => (
            <button
              key={category ?? "all"}
              type="button"
              aria-pressed={activeCategory === category}
              aria-controls="portfolio-gallery"
              data-category={category ?? undefined}
              onClick={() => selectCategory(category)}
              className={`cursor-pointer rounded-full border px-4 py-2.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] sm:px-5 ${
                activeCategory === category
                  ? "border-[var(--navy)] bg-[var(--navy)] text-white"
                  : "border-[var(--border)] bg-white text-[var(--navy)] hover:border-[var(--blue)]/50"
              }`}
            >
              {category ?? "All"}
            </button>
          ))}
        </div>

        <div id="portfolio-gallery">
          {selected ? (
            <>
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--border)] pb-4">
                <h3 className="text-2xl font-black text-[var(--navy)] sm:text-3xl">{selected.name}</h3>
                <p className="text-sm text-slate-600" role="status">{photos.length} {photos.length === 1 ? "photo" : "photos"}</p>
              </div>
              <div className="space-y-8">
                {selected.projects.map((project) => (
                  <div key={project.name}>
                    <h4 className="mb-3 text-lg font-bold text-[var(--navy)]">{project.name}</h4>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                      {project.photos.map((photo) => (
                        <button
                          key={photo.image}
                          type="button"
                          aria-label={`Enlarge ${photo.alt}`}
                          aria-haspopup="dialog"
                          onClick={(event) => {
                            event.currentTarget.focus({ preventScroll: true });
                            setPhotoIndex(photos.findIndex((item) => item.project === project.name && item.image === photo.image));
                          }}
                          className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl border border-[var(--border)] bg-slate-200 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
                        >
                          <Image src={photo.thumbnail ?? photo.image} alt="" fill unoptimized className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105" />
                          <span className="absolute right-2.5 bottom-2.5 grid size-8 place-items-center rounded-full bg-slate-950/70">
                            <Maximize2 size={15} aria-hidden="true" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {categories.map(({ name, projects }) => {
                const cover = projects[0].photos[0];
                const photoCount = projects.reduce((total, project) => total + project.photos.length, 0);
                return (
                  <button
                    key={name}
                    type="button"
                    aria-controls="portfolio-gallery"
                    onClick={() => {
                      selectCategory(name);
                      Array.from(filters.current?.querySelectorAll("button") ?? [])
                        .find((button) => button.dataset.category === name)?.focus();
                    }}
                    className="group card flex h-full cursor-pointer flex-col overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
                  >
                    <span className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-200">
                      <Image src={cover.thumbnail ?? cover.image} alt="" fill unoptimized className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" />
                    </span>
                    <span className="flex w-full flex-1 items-center justify-between gap-3 px-4 py-4 sm:px-5">
                      <span>
                        <span className="block text-lg font-black text-[var(--navy)]">{name}</span>
                        <span className="mt-1 block text-sm text-slate-600">{photoCount} {photoCount === 1 ? "photo" : "photos"}</span>
                      </span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-[var(--blue)] transition group-hover:bg-[var(--blue)] group-hover:text-white">
                        <ArrowRight size={17} aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selected && photoIndex !== null && (
        <PortfolioLightbox
          category={selected.name}
          photos={photos}
          index={photoIndex}
          onClose={() => setPhotoIndex(null)}
          onNavigate={(direction) => {
            setPhotoIndex((index) => index === null ? null : (index + direction + photos.length) % photos.length);
          }}
        />
      )}
    </section>
  );
}
