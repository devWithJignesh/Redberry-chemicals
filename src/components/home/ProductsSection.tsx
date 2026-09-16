import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import ProductGrid from "@/components/product/ProductGrid";
import { LinkButton } from "@/components/common/Button";
import { PRODUCTS } from "@/data/products";

export default function ProductsSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Our Products"
            title="Everything Your Facility Needs"
            description="Industrial, agro, specialty and water-treatment grade chemicals — sourced and verified for consistency."
          />
          <LinkButton href="/products" variant="outline" className="shrink-0">
            View All Products
          </LinkButton>
        </div>
        <ProductGrid products={PRODUCTS} />
      </Container>
    </section>
  );
}
