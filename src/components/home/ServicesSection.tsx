"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { SERVICES } from "@/data/services";

export default function ServicesSection() {
  return (
    <section className="bg-brand-cream py-24">
      <Container>
        <SectionTitle
          center
          eyebrow="What We Do"
          title="Services Built Around Your Supply Chain"
          description="From sourcing to delivery, we handle the details so your production line never waits."
          className="mx-auto mb-16"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = (Icons as any)[service.icon] || Icons.FlaskConical;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group rounded-2xl bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-card"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-red-light text-brand-red transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                  <Icon size={26} />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-brand-navy">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-muted">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
