import type { Metadata } from "next";
import Container from "@/components/common/Container";
import { COMPANY } from "@/constants";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: `Contact Us — ${COMPANY.name}`,
  description: `Get in touch with ${COMPANY.name} — call, email or visit us in Anand, Gujarat.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="relative flex h-[300px] items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark/60" />
        <Container className="relative">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/60">
            <span>Home</span> <span className="text-brand-red">/</span> <span>Contact</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">Get In Touch</h1>
          <p className="mt-4 max-w-xl text-white/75">
            Questions about products, pricing or bulk orders — we usually reply the same day.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            <ContactForm />

            <div className="space-y-6">
              <div className="rounded-2xl bg-brand-cream p-7">
                <h3 className="mb-5 font-heading text-lg font-semibold text-brand-navy">
                  Contact Information
                </h3>
                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <Phone size={18} className="mt-0.5 shrink-0 text-brand-red" />
                    <a href={COMPANY.phoneHref} className="font-medium text-brand-text">
                      {COMPANY.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-brand-red" />
                    <a href={`mailto:${COMPANY.email}`} className="font-medium text-brand-text">
                      {COMPANY.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-brand-red" />
                    <span className="text-brand-muted">{COMPANY.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={18} className="mt-0.5 shrink-0 text-brand-red" />
                    <div className="text-brand-muted">
                      <div>Mon – Fri: {COMPANY.hours.weekdays}</div>
                      <div>Saturday: {COMPANY.hours.saturday}</div>
                      <div>Sunday: {COMPANY.hours.sunday}</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="h-72 overflow-hidden rounded-2xl border border-black/5 shadow-soft">
                <iframe
                  src={COMPANY.mapEmbedSrc}
                  className="h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Redberry Chemicals location"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
