# NutriLife

A full-stack nutrition practice management platform connecting dietitians with clients — built for the Unicorn Track hackathon.

**Live demo:** [https://as-kappa-five.vercel.app/]

## What it does

NutriLife is a two-sided platform for dietitians and their clients:

- **Dietitians** manage their client roster, schedule and confirm appointments, generate AI-powered meal plans, and answer client questions — publicly or privately.
- **Clients** get a personal workspace showing their meal plans, can request appointments, and ask nutrition questions to their dietitian or the wider community.
- **Anyone**, even without an account, can browse public nutrition Q&A and ask a question — any dietitian on the platform can choose to answer.

## Key features

- **Role-based auth** — separate secure flows for dietitians and clients, with invite-link-based client onboarding
- **AI-generated meal plans** — dietitians generate personalized 3-day meal plans using a self-hosted Gemma 2 model running on AMD GPU infrastructure (see below), with manual plan creation also supported
- **Booking → Approval flow** — public visitors submit a consultation request; a dietitian reviews and approves it, generating an invite link; the client signs up and a real appointment is scheduled
- **Public/private Q&A** — clients can ask questions privately to their own dietitian, or post publicly for any dietitian to answer. Dietitians can also choose to make a private answer public. Anonymous visitors can ask public questions too, with no account required
- **Real-time dashboard** — live stats on clients, appointments, and meal plans, all backed by a real Postgres database (no mock data)

## Tech stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** PostgreSQL (hosted on Neon), Prisma ORM
- **Auth:** HTTP-only session cookies, bcrypt password hashing
- **AI Inference:** Self-hosted vLLM serving `unsloth/gemma-2-9b-it` on **AMD MI300X GPU infrastructure** (AMD Developer Cloud, ROCm 7.2), exposed via a secure tunnel
- **Deployment:** Vercel

## Use of AMD Platforms

Meal plan generation runs on a real, self-hosted inference server on AMD GPU hardware (ROCm 7.2 + vLLM), not a third-party managed API. The dietitian-facing meal plan generator sends live requests to this AMD-hosted model, and generated plans are persisted to the database and shown to both the dietitian and the client in real time.

## Getting started locally

```bash
git clone <your-repo-url>
cd frontend
npm install
```

Create a `.env` file with:
```
DATABASE_URL="your-postgres-connection-string"
```

Then:
```bash
npx prisma db push
npx prisma generate
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
src/app/
  api/              → Backend API routes (auth, dashboard, community, booking, ai)
  dashboard/        → Dietitian-facing pages (clients, appointments, meal plans, settings)
  workspace/        → Client-facing personal dashboard
  community/         → Public Q&A page
  booking/          → Public consultation request form
  signup/, login/   → Auth pages
  components/       → Shared UI components
prisma/
  schema.prisma     → Database schema
```

## Known limitations

- Billing/payments are not integrated — pricing discussion currently happens manually between dietitian and client after booking approval
- Notification preferences and password-change are UI placeholders, not yet connected to a backend
- AI generation requires the AMD GPU instance to be actively running

## Team

[Advance]

## License

[Add your license, or note if unlicensed for hackathon purposes]