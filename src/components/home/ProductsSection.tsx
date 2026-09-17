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
            eyebrow="Agro & Industrial Formulations"
            title="Precision Chemical Solutions for Field & Facility"
            description="From crop-protection insecticides and 100% water-soluble fertilizers to specialized agro-intermediates and water treatment."
          />
          <LinkButton href="/products" variant="outline" className="shrink-0">
            View All 20+ Products
          </LinkButton>
        </div>
        <ProductGrid products={PRODUCTS.slice(0, 4)} />
      </Container>
    </section>
  );
}
