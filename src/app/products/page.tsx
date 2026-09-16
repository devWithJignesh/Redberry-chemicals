import type { Metadata } from "next";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import ProductGrid from "@/components/product/ProductGrid";
import { PRODUCTS } from "@/data/products";
import { COMPANY } from "@/constants";

export const metadata: Metadata = {
  title: `Products — ${COMPANY.name}`,
  description:
    "Browse industrial, agro, specialty and water-treatment chemicals supplied by Redberry Chemicals.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative flex h-[300px] items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark/60" />
        <Container className="relative">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/60">
            <span>Home</span> <span className="text-brand-red">/</span> <span>Products</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">Our Products</h1>
          <p className="mt-4 max-w-xl text-white/75">
            Consistent, lab-verified chemicals across four core categories.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionTitle
            eyebrow="Full Catalogue"
            title="Choose a Category"
            description="Every product ships with documentation and can be scaled to bulk order volumes."
            className="mb-14"
          />
          <ProductGrid products={PRODUCTS} />
        </Container>
      </section>
    </>
  );
}
