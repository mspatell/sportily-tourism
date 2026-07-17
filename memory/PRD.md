# Sportily Tourism — PRD

## Original Problem Statement
A travel agency ("Sportily Tourism") specializing in sports & live-event travel. Arranges event tickets, flights, accommodation and visas. Goal: a marketing/landing site to showcase services and capture leads.

## User Choices
- Type: Marketing/landing site with lead capture
- Events highlighted: Football, Tennis (Grand Slams), Olympics, NBA, Cricket (ICC/IPL), Tomorrowland
- Lead capture: contact/inquiry form
- Brand: Premium & luxury + energetic & bold (dark, volt-yellow accent)

## Architecture
- Frontend: React (CRA/craco), Tailwind, framer-motion, lenis smooth scroll, react-fast-marquee, shadcn/ui, sonner toasts.
- Backend: FastAPI + MongoDB (motor). Endpoints: POST/GET /api/inquiries, GET /api/.
- Fonts: Outfit (headings), Manrope (body).

## User Personas
- Sports superfan planning a bucket-list trip.
- Group organizer arranging travel for multiple fans.

## Core Requirements (static)
- Showcase services (tickets, flights, accommodation, visas).
- Showcase featured events across chosen sports/festival.
- Capture leads via inquiry form persisted to DB.

## Implemented (2026-07-12)
- v1 single-page dark landing site (Hero, ribbon, services, bento events, why-us, how-it-works, testimonials, contact, footer).
- Inquiry API (create + list) with MongoDB persistence. Tested 100% backend + frontend.

## Redesign (2026-07-13)
- Switched to bright/soothing white/beige theme (stone-50 base, amber-700 accent, Playfair Display + Manrope).
- Converted to MULTI-PAGE app with React Router + shared Layout (fixed glass Navbar + Footer, scroll-to-top on route change):
  - / Home (split hero, marquee ribbon, top-3 event highlights, trust cards, CTA)
  - /events (curated event bento grid)
  - /services (alternating tickets/flights/accommodation/visas blocks)
  - /about (story + values)
  - /contact (split layout lead-capture form -> POST /api/inquiries)
- Tested 100% backend + frontend (iteration_2).

## Backlog
- P1: Email notifications on new inquiry (Resend/SendGrid) — needs API key from user.
- P1: Admin dashboard to view/manage inquiries.
- P2: Per-event detail pages; rate limiting + input length caps on public endpoint; restrict CORS for production.

## Next Tasks
- Wire email delivery of inquiries once user provides email provider key.
