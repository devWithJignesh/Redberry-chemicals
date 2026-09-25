<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
=======
# Redberry Chemicals — Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project Structure

Matches the requested layout:

- `src/app` — routes (Home, About, Products + `[slug]`, Services, Contact, Blog + `[slug]`)
- `src/components/layout` — Navbar, MobileMenu, Footer
- `src/components/home` — Hero, AboutSection, ServicesSection, ProductsSection, StatsSection, ContactSection
- `src/components/common` — Button, SectionTitle, Container
- `src/components/product` — ProductCard, ProductGrid
- `src/data` — products.ts, services.ts, navigation.ts, blog.ts
- `src/lib/utils.ts` — `cn()` classname helper
- `src/hooks/useMobileMenu.ts`
- `src/types`, `src/constants` — shared types & company info (name, phone, address)

## Adding Real Media

This build ships with **styled placeholders** instead of real photography/video
so it runs out of the box. To finish it:

1. **Hero video** — drop an MP4 at `public/videos/hero.mp4` (and an optional
   poster image at `public/images/banners/hero-poster.jpg`). The `Hero`
   component (`src/components/home/Hero.tsx`) already wires up autoplay,
   loop and a muted background video, and falls back to an animated gradient
   slider automatically if the file is missing.
2. **Photos** — replace the gradient `<div>` placeholders (search for
   `Photo:` comments/labels) with real `<Image />` components pointing at
   files in `public/images/{products,about,banners}`.
3. **Logo** — add your logo file to `public/images/logo/` and swap the inline
   SVG mark in `Navbar.tsx` / `Footer.tsx`.

## Company Info

Edit `src/constants/index.ts` to update phone, address, email, map link, and
business hours — these are used across the Navbar, Footer, Contact page and
metadata.

## Contact Form

`src/app/contact/ContactForm.tsx` is a client component with local state only.
Wire it to a real endpoint (Formspree, Resend, or your own `route.ts` API
handler) via the `CONTACT_FORM_ENDPOINT` env var in `.env.local`.

## Animations

- Framer Motion `whileInView` scroll-reveals on section titles, cards and grids
- Hero: rotating slide content + progress-bar indicators + Ken Burns fallback background
- Animated count-up stats using `useInView`
- Hover lift/scale on cards, buttons and icons
- Respects `prefers-reduced-motion`

## Responsive Breakpoints

Tailwind defaults (`sm`, `md`, `lg`, `xl`) are used throughout; the navbar
switches to a slide-in mobile menu below `lg` (1024px).
>>>>>>> 984c6dc8795d48f3e4cac8cc6595ca63a38cc103
