import Hero from "@/components/home/Hero";
import AgriSolutionsSection from "@/components/home/AgriSolutionsSection";
import AboutSection from "@/components/home/AboutSection";
import LeadershipSection from "@/components/common/LeadershipSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProductsSection from "@/components/home/ProductsSection";
import StatsSection from "@/components/home/StatsSection";
import CustomerReviewsSection from "@/components/common/CustomerReviewsSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AgriSolutionsSection />
      <AboutSection />
      <LeadershipSection />
      <ServicesSection />
      <ProductsSection />
      <StatsSection />
      <CustomerReviewsSection />
      <ContactSection />
    </>
  );
}
