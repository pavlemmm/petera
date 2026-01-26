# 🐾 Petera

Petera is a web platform that connects pet owners with caregivers, making reliable pet care easy to find, compare, and book. The focus is on clear information, fast filtering, and straightforward reservations.

## The problem

Pet owners often struggle to find trustworthy caregivers in one place. Information is scattered across recommendations and ads, and comparing offers by price, location, and services is time-consuming. On the other side, caregivers lack a professional space to present their services clearly and consistently attract new clients.

## The solution

Petera provides a centralized marketplace for pet care, with structured listings and powerful filters. Owners can quickly review offers, compare services and prices, and book a stay. Caregivers get a clear way to showcase their services and build a stable flow of inquiries.

## Key features

- Caregiver listings with description, price, location, and accepted pet types
- Filtering by city, price, pet types, and services
- Detailed listing view with photos and caregiver info
- Reservations with automatic price calculation
- Owner and caregiver registration and login
- Caregiver verification through document upload

## Roles

- Owner: browses listings and books reservations
- Caregiver: publishes listings and receives reservations

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Drizzle ORM + PostgreSQL
- better-auth
- shadcn/ui

## Local development

### Prerequisites

- Node.js 18+ (recommended 20+)
- PostgreSQL (or Docker)

### Environment setup

Create a `.env` file and set values:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/petera
BETTER_AUTH_SECRET=change-me
BETTER_AUTH_URL=http://localhost:3000/
```

### Start the database with Docker

```bash
docker compose up -d
```

### Install and run

```bash
npm install
npm run db:migrate
npm run dev
```

The app will be available at `http://localhost:3000`.

## Scripts

- `npm run dev` - start in development mode
- `npm run build` - production build
- `npm run start` - run production build
- `npm run lint` - eslint check
- `npm run db:generate` - generate migrations
- `npm run db:migrate` - run migrations
- `npm run db:push` - push schema to the database
- `npm run db:studio` - Drizzle Studio
- `npm run db:check` - migration check
- `npm run db:drop` - drop schema

## Project structure

- `app/(info)` - info pages
- `app/(main)` - listings, reservations, create listing
- `app/(auth)` - login and registrations
- `components` - shared UI components
- `db` - schema and migrations

## Feature status

- Payments are not active yet (reservations are created without charging)
