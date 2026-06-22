import { PageHero } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";

const processCards = [
  {
    title: "Design",
    image: "/FIRM/Our Facilities/In-House Design Teams/in-house.jpg",
    text: "The result of balanced collaboration and closer integration between the engineering, production, and installation team members is our design and engineering capability. We set a high bar for perfection for every procedure that supports it up front. Superior goods, cutting-edge technology, and tried-and-true production techniques enable clients' ideas on canvas to become reality.",
  },
  {
    title: "Manufacturing",
    image: "/FIRM/Our Facilities/Metal Fabrication/a41fa39e-dcd2-41f7-bcaa-dbbfe9d5f86d.png",
    text: "Our manufacturing facility, which spans over 100,000 square feet, is one of the biggest and most integrated in the sector. utilising highly skilled technicians and engineers who meticulously monitor the necessary output to ensure that it satisfies the highest standards of quality. Take it for granted that JMS will give your corporate IDs a fresh review and will guarantee on-time delivery.",
  },
  {
    title: "Turnkey",
    image: "/FIRM/Our Works/Gas Station RVIs/IOCL.jpg",
    text: "By providing full turnkey services that include consultation, design, production, installation, and maintenance, we enable each customer to focus on their area of expertise. The business consistently guarantees to provide comprehensive services for every single project that calls for Architectural signage, Corporate outfitting, Light metal structures, Digital Displays, and Facade.",
  },
  {
    title: "Maintenance",
    image: "/FIRM/Our Works/Automobile Showroom Signs & Fit Outs/Harley Davidson.png",
    text: "JMS's deliverables don't end with the transfer of ownership. We accompany our customers on annual maintenance contracts and post-sale services, relieving them of the worry that all facilities will continue to function flawlessly. Our hardworking maintenance crew makes sure that every customer call is handled as quickly as possible.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="How we deliver excellence."
        text="A fully integrated approach — from first brief to final handover."
        image="/FIRM/Our Works/Retail Outlet Signage/1Q2A8102.jpg.jpeg"
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
