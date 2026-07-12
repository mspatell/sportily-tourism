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
- Full landing page: Hero, event ribbon marquee, Services grid + visuals, Featured Events bento grid, Why Us, How It Works, Testimonials, Contact form, Footer.
- Inquiry API (create + list) with MongoDB persistence. Tested 100% backend + frontend.

## Backlog
- P1: Email notifications on new inquiry (Resend/SendGrid) — needs API key from user.
- P1: Admin dashboard to view/manage inquiries.
- P2: Per-event detail pages; rate limiting + input length caps on public endpoint; restrict CORS for production.

## Next Tasks
- Wire email delivery of inquiries once user provides email provider key.
