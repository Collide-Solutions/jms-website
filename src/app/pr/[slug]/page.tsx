import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getBlogs, getBlogBySlug } from "@/lib/wordpress";
import { Reveal } from "@/components/Motion";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [blog, allBlogs] = await Promise.all([getBlogBySlug(slug), getBlogs()]);
  if (!blog) notFound();

  const others = allBlogs.filter((b) => b.slug !== slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero image */}
      <div className="relative h-[420px] w-full overflow-hidden sm:h-[520px]">
        <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-[var(--navy)]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-[#c8952a] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-white">
              {blog.category}
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              {blog.title}
            </h1>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-white/60">
              {blog.author} &nbsp;·&nbsp; {blog.date}
            </p>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mx-auto max-w-3xl px-5 pt-8 lg:px-8">
        <Link
          href="/pr"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-[var(--navy)]"
        >
          <ArrowLeft size={15} /> Back to Blogs
        </Link>
      </div>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-5 py-10 lg:px-8">
        {blog.sections.map((section, i) => {
          if (section.type === "heading") {
            return (
              <Reveal key={i}>
                <h2 className="mb-4 mt-10 text-2xl font-black text-[var(--navy)] first:mt-0">
                  {section.text}
                </h2>
              </Reveal>
            );
          }
          if (section.type === "paragraph") {
            return (
              <Reveal key={i}>
                <p className="mb-5 text-base leading-8 text-slate-600">{section.text}</p>
              </Reveal>
            );
          }
          if (section.type === "bullets") {
            return (
              <Reveal key={i}>
                <ul className="mb-5 space-y-2 pl-1">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-base leading-7 text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8952a]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          }
        })}

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--soft)] p-8 text-center">
          <p className="text-lg font-black text-[var(--navy)]">Ready to start a project with JMS?</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">Our team is ready to bring your vision to life - from design to installation.</p>
          <Link href="/reach-us" className="btn-primary mt-6 inline-flex">
            Get in Touch <ArrowRight size={15} />
          </Link>
        </div>
      </article>

      {/* Recent blogs sidebar */}
      <section className="border-t border-[var(--border)] py-14">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <h3 className="mb-6 text-sm font-black uppercase tracking-[0.18em] text-slate-400">Recent Blogs</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {others.map((b) => (
              <Reveal key={b.slug}>
                <Link href={`/pr/${b.slug}`} className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-white transition hover:shadow-md hover:-translate-y-0.5">
                  <img src={b.image} alt={b.title} className="h-36 w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="p-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#c8952a]">{b.category}</span>
                    <p className="mt-1 text-sm font-black leading-snug text-[var(--navy)] line-clamp-2">{b.title}</p>
                    <p className="mt-2 text-[10px] text-slate-400">{b.date}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
