import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/common/Container";
import { LinkButton } from "@/components/common/Button";
import ProductGrid from "@/components/product/ProductGrid";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { COMPANY } from "@/constants";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${COMPANY.name}`,
    description: product.shortDescription,
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="relative flex h-[300px] items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark/60" />
        <Container className="relative">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/60">
            <span>Home</span> <span className="text-brand-red">/</span>
            <span>Products</span> <span className="text-brand-red">/</span>
            <span>{product.name}</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">{product.name}</h1>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark shadow-card">
              <div className="flex h-full w-full items-center justify-center text-xs text-white/50">
                Photo: {product.name}
              </div>
            </div>
            <div>
              <span className="mb-3 inline-block rounded-full bg-brand-red-light px-4 py-1.5 text-xs font-bold text-brand-red">
                {product.category}
              </span>
              <h2 className="font-heading text-2xl font-bold text-brand-navy md:text-3xl">
                {product.shortDescription}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-brand-muted">
                {product.description}
              </p>
              <ul className="mt-7 space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium text-brand-text">
                    <CheckCircle2 size={18} className="shrink-0 text-brand-red" /> {f}
                  </li>
                ))}
              </ul>
              <LinkButton href="/contact" className="mt-9">
                Enquire About This Product
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-cream py-24">
        <Container>
          <h3 className="mb-10 font-heading text-2xl font-bold text-brand-navy">
            Other Products
          </h3>
          <ProductGrid products={related} />
        </Container>
      </section>
    </>
  );
}
