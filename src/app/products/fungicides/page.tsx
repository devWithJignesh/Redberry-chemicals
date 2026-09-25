import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import { LinkButton } from "@/components/common/Button";
import { COMPANY } from "@/constants";

export const metadata: Metadata = {
  title: `Fungicides — ${COMPANY.name}`,
  description: `High efficacy broad-spectrum fungicides for crop disease management and harvest quality.`,
};

export default function FungicidesPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-4">
            Crop Protection Division
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Fungicides Range
          </h1>
          <p className="text-base text-brand-muted mb-8 leading-relaxed">
            Our comprehensive fungicide portfolio for blight, rust, downy mildew, and blast protection is being updated. Explore our available Insecticides range or contact our agrochemical specialists for immediate stock availability.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/products/insecticides" className="bg-[#EA580C] hover:bg-[#C2410C]">
              Browse Insecticides Range
            </LinkButton>
            <LinkButton href="/contact" variant="outline">
              Contact Agrochemical Team
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
