import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { BLOG_POSTS } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { COMPANY } from "@/constants";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Blog — ${COMPANY.name}`,
  description: `Insights on chemical supply, sourcing and industry best practices from ${COMPANY.name}.`,
};

export default function BlogPage() {
  return (
    <>
      <section className="relative flex h-[300px] items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark/60" />
        <Container className="relative">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/60">
            <span>Home</span> <span className="text-brand-red">/</span> <span>Blog</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">Blog</h1>
          <p className="mt-4 max-w-xl text-white/75">
            Notes on sourcing, supply planning and chemical industry basics.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionTitle eyebrow="Latest Articles" title="From the Blog" className="mb-14" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark">
                  {post.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2 text-xs font-medium text-brand-red">
                    {formatDate(post.date)}
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold leading-snug text-brand-navy">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-brand-muted">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
