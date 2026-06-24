import { PageHero } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogs } from "@/lib/wordpress";

export default async function PRPage() {
  const blogs = await getBlogs();
  const [featured, ...rest] = blogs;

  return (
    <>
      <PageHero
        eyebrow="Blogs"
        title="Insights and ideas."
        text="Field notes on manufacturing, retail branding, signage, and the spaces JMS helps build."
      />

      <section className="section">
        <div className="container">
          {/* Featured post */}
          {featured && (
            <Reveal>
              <Link href={`/pr/${featured.slug}`} className="group mb-10 grid overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elevated)] md:grid-cols-[1.2fr_1fr]">
                <div className="overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 md:h-full"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="inline-block rounded-full bg-[#c8952a]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#c8952a]">
                    {featured.category}
                  </span>
                  <h2 className="mt-4 text-2xl font-black leading-tight text-[var(--navy)] sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-7 text-slate-500">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      {featured.author} &nbsp;·&nbsp; {featured.date}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-black text-[var(--navy)] transition group-hover:gap-2">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Remaining posts */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((blog) => (
              <Reveal key={blog.slug}>
                <Link href={`/pr/${blog.slug}`} className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1">
                  <div className="overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block rounded-full bg-[#c8952a]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#c8952a]">
                      {blog.category}
                    </span>
                    <h3 className="mt-3 text-lg font-black leading-tight text-[var(--navy)]">
                      {blog.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500 line-clamp-3">{blog.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                        {blog.author} · {blog.date}
                      </p>
                      <ArrowRight size={15} className="text-[var(--navy)] transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--border)] py-10 text-center">
        <p className="text-lg font-black uppercase tracking-[0.22em] text-[var(--navy)] sm:text-xl md:text-2xl">
          WE ENHANCE BRANDS WORLDWIDE
        </p>
      </div>
    </>
  );
}
