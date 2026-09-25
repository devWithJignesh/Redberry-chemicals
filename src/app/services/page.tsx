import type { Metadata } from "next";
import * as Icons from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { LinkButton } from "@/components/common/Button";
import { SERVICES } from "@/data/services";
import { COMPANY } from "@/constants";
import CustomerReviewsSection from "@/components/common/CustomerReviewsSection";

export const metadata: Metadata = {
  title: `Services — ${COMPANY.name}`,
  description: `Bulk supply, custom sourcing, quality assurance and logistics services from ${COMPANY.name}.`,
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative flex h-[300px] items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark/60" />
        <Container className="relative">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/60">
            <span>Home</span> <span className="text-brand-red">/</span> <span>Services</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">Our Services</h1>
          <p className="mt-4 max-w-xl text-white/75">
            Support at every stage of your chemical supply chain.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionTitle
            eyebrow="How We Help"
            title="Full-Service Chemical Supply"
            description="From first enquiry to repeat bulk orders, our team stays involved."
            className="mb-14"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {SERVICES.map((service) => {
              const Icon = (Icons as any)[service.icon] || Icons.FlaskConical;
              return (
                <div
                  key={service.slug}
                  className="flex gap-6 rounded-2xl bg-white p-8 shadow-soft transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-red-light text-brand-red">
                    <Icon size={26} />
                  </div>
                  <div>
                    <h3 className="mb-2 font-heading text-lg font-semibold text-brand-navy">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-16 text-center">
            <LinkButton href="/contact">Discuss Your Requirement</LinkButton>
          </div>
        </Container>
      </section>

      {/* Customer Reviews Slider */}
      <CustomerReviewsSection />
    </>
  );
}
