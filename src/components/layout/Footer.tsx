import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { COMPANY } from "@/constants";
import { PRODUCTS } from "@/data/products";
import Container from "@/components/common/Container";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/80">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-flex items-center bg-white px-3.5 py-1.5 rounded-xl shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={COMPANY.logo}
                  alt={COMPANY.name}
                  className="h-8 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Reliable industrial, agro and specialty chemical supply — built on
              purity, documentation and on-time bulk delivery.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, href: COMPANY.social.facebook, label: "Facebook" },
                { Icon: Instagram, href: COMPANY.social.instagram, label: "Instagram" },
                { Icon: Linkedin, href: COMPANY.social.linkedin, label: "LinkedIn" },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-red text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-brand-red">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-red">About</Link></li>
              <li><Link href="/products" className="hover:text-brand-red">Products</Link></li>
              <li><Link href="/services" className="hover:text-brand-red">Services</Link></li>
              <li><Link href="/reviews" className="hover:text-brand-red">Customer Reviews</Link></li>
              <li><Link href="/blog" className="hover:text-brand-red">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-brand-red">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">Products</h4>
            <ul className="space-y-3 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="hover:text-brand-red">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-red" />
                <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-red" />
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-red" />
                <span className="text-white/60">{COMPANY.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-center text-xs text-white/45">
            © {new Date().getFullYear()} {COMPANY.name}. All Rights Reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
