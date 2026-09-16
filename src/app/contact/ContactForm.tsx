"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to CONTACT_FORM_ENDPOINT (see .env.example) or a Next.js API route.
    setSubmitted(true);
    e.currentTarget.reset();
  }

  return (
    <div>
      <h2 className="mb-7 font-heading text-2xl font-bold text-brand-navy">
        Send Us a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-brand-text">Name</label>
            <input
              required
              type="text"
              placeholder="Your full name"
              className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red-light"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-brand-text">Phone</label>
            <input
              type="text"
              placeholder="+91 00000 00000"
              className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red-light"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-brand-text">Email</label>
          <input
            required
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red-light"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-brand-text">Message</label>
          <textarea
            required
            rows={5}
            placeholder="Tell us what you're looking for..."
            className="w-full resize-none rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red-light"
          />
        </div>
        <Button type="submit">Send Message</Button>

        <AnimatePresence>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-brand-teal"
            >
              Thanks — your message has been noted. This is a demo form; connect
              CONTACT_FORM_ENDPOINT in .env.local to receive real submissions.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
