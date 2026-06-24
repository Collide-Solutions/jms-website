import { PageHero } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import { getProcessCards, getProcessPageData } from "@/lib/wordpress";

export default async function ProcessPage() {
  const [hero, processCards] = await Promise.all([
    getProcessPageData(),
    getProcessCards(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Process"
        title={hero.process_hero_title}
        text={hero.process_hero_text}
        image={hero.process_hero_image.url}
      />

      <section className="section">
        <div className="container">
          <div className="grid gap-10 sm:grid-cols-2">
            {processCards.map((card) => (
              <Reveal key={card.title}>
                <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow-card)]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-64 w-full object-cover sm:h-72"
                  />
                  <div className="p-7 sm:p-8">
                    <h2 className="text-2xl font-black uppercase text-[#c8952a] sm:text-3xl">
                      {card.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                      {card.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
