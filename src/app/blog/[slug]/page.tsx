import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/common/Container";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { COMPANY } from "@/constants";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: `${post.title} — ${COMPANY.name}`, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative flex h-[320px] items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark/60" />
        <Container className="relative max-w-3xl">
          <div className="mb-4 text-xs font-medium text-brand-red">{formatDate(post.date)}</div>
          <h1 className="font-heading text-2xl font-bold leading-tight text-white md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-white/60">By {post.author}</p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="relative mb-10 h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark shadow-soft">
            {post.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <p className="text-base leading-relaxed text-brand-text">{post.content}</p>

          <Link
            href="/blog"
            className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand-red"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </Container>
      </section>
    </>
  );
}
