import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Bug,
  Sprout,
  Droplets,
  ShieldAlert,
  FileText,
  PhoneCall,
  Send,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import Container from "@/components/common/Container";
import { LinkButton } from "@/components/common/Button";
import ProductImageShowcase from "@/components/product/ProductImageShowcase";
import InsecticideGrid from "@/components/product/InsecticideGrid";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { INSECTICIDES } from "@/data/insecticides";
import { COMPANY } from "@/constants";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.technicalName || product.category} | ${COMPANY.name}`,
    description: product.shortDescription,
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  // Related insecticides or category products
  const relatedInsecticides = INSECTICIDES.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Hero Header with Organic Agrochemical Background */}
      <section className="relative overflow-hidden bg-brand-navy py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy-light to-orange-950/40 opacity-90" />
        <Container className="relative z-10">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs md:text-sm font-semibold text-white/70">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-orange-500">/</span>
            <Link href="/products/insecticides" className="hover:text-white transition-colors">
              Insecticides
            </Link>
            <span className="text-orange-500">/</span>
            <span className="text-white font-bold">{product.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block rounded-full bg-[#EA580C] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {product.category}
                </span>
                {product.chemicalGroup && (
                  <span className="inline-block rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white/90">
                    {product.chemicalGroup}
                  </span>
                )}
              </div>
              <h1 className="font-heading text-3xl font-extrabold text-white md:text-5xl tracking-tight">
                {product.name}
              </h1>
              {product.technicalName && (
                <p className="mt-2 text-base md:text-lg text-orange-200/90 font-medium">
                  {product.technicalName}
                </p>
              )}
            </div>

            <Link
              href="/products/insecticides"
              className="inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-xs font-bold transition-colors border border-white/20"
            >
              <ArrowLeft size={14} /> Back to Insecticides
            </Link>
          </div>
        </Container>
      </section>

      {/* Main Details Section: Interactive Image Stage + Product Data */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Interactive 3D Product Bottle Showcase with Animations */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ProductImageShowcase
                image={product.image}
                name={product.name}
                technicalName={product.technicalName}
                packagingSizes={product.packagingSizes}
              />
            </div>

            {/* Right Column: Complete Specifications & Agrochemical Data */}
            <div className="lg:col-span-7 space-y-8">
              {/* Product Overview Card */}
              <div className="rounded-3xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-2">
                  <Sparkles size={16} /> Premium Crop Protection
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy">
                  {product.shortDescription}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-brand-muted">
                  {product.description}
                </p>

                {/* Key Benefits Checklist */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy mb-4">
                    Key Features & Proven Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 rounded-xl bg-orange-50/40 p-3 border border-orange-100/60"
                      >
                        <CheckCircle2 size={18} className="shrink-0 text-[#EA580C] mt-0.5" />
                        <span className="text-xs md:text-sm font-medium text-slate-800 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Target Pests & Recommended Crops */}
              {(product.targetPests || product.recommendedCrops) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Target Pests */}
                  {product.targetPests && (
                    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-bold text-rose-700 mb-3">
                        <Bug size={20} className="text-rose-600" /> Target Pests / Insects
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        {product.targetPests}
                      </p>
                    </div>
                  )}

                  {/* Recommended Crops */}
                  {product.recommendedCrops && (
                    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 mb-3">
                        <Sprout size={20} className="text-emerald-600" /> Recommended Crops
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        {product.recommendedCrops}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Dosage & Application Instructions */}
              {product.dosage && (
                <div className="rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border-2 border-orange-200/80 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#EA580C] mb-2">
                    <Droplets size={20} /> Recommended Application & Dosage
                  </div>
                  <div className="text-lg md:text-xl font-extrabold text-brand-navy">
                    {product.dosage}
                  </div>
                  <p className="mt-2 text-xs text-slate-600">
                    Apply during early infestation stages for optimal control. Always ensure uniform foliar coverage using recommended water volume and clean equipment.
                  </p>
                </div>
              )}

              {/* Technical Specifications Table */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="rounded-3xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 text-sm font-bold text-brand-navy mb-4">
                    <FileText size={20} className="text-[#EA580C]" /> Technical Specifications
                  </div>
                  <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden">
                    {product.specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 text-xs md:text-sm ${
                          idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"
                        }`}
                      >
                        <span className="font-semibold text-slate-600">{spec.label}</span>
                        <span className="font-bold text-slate-900 mt-1 sm:mt-0">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mode of Action & Safety */}
              {(product.modeOfAction || product.antidote) && (
                <div className="rounded-3xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-4">
                  {product.modeOfAction && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Mode of Action
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {product.modeOfAction}
                      </p>
                    </div>
                  )}

                  {product.antidote && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                        <ShieldAlert size={16} /> Antidote & Medical Advice
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {product.antidote}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons: Request Quote & Call Expert */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <LinkButton
                  href="/contact"
                  className="flex-1 justify-center py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-lg shadow-orange-500/20"
                >
                  <Send size={16} className="mr-1" /> Request Bulk Quote for {product.name}
                </LinkButton>
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-navy bg-white px-6 py-4 text-sm font-bold text-brand-navy transition-all duration-200 hover:bg-brand-navy hover:text-white"
                >
                  <PhoneCall size={16} className="text-[#EA580C]" />
                  Call Agro Specialist: {COMPANY.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Explore Other Insecticide Products */}
      {relatedInsecticides.length > 0 && (
        <section className="bg-white border-t border-slate-200/80 py-20">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                  Complete Crop Defense
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy mt-1">
                  Explore Other Insecticides
                </h3>
              </div>
              <Link
                href="/products/insecticides"
                className="mt-4 md:mt-0 text-sm font-bold text-[#EA580C] hover:underline"
              >
                View Full Insecticide Range →
              </Link>
            </div>

            <InsecticideGrid products={relatedInsecticides} />
          </Container>
        </section>
      )}
    </div>
  );
}
