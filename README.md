# Petera

Petera je web platforma koja povezuje vlasnike kućnih ljubimaca i čuvare, tako da se pouzdana briga dogovori brzo i jasno. Fokus je na transparentnim informacijama, lakom poređenju i jednostavnoj rezervaciji.

## Problem koji rešavamo

Vlasnici kućnih ljubimaca često nemaju siguran i pregledan način da pronađu pouzdanog čuvara. Informacije su rasute po preporukama i oglasima, a upoređivanje ponuda po ceni, lokaciji i uslugama je sporo i neujednačeno. Sa druge strane, čuvari teško dolaze do novih klijenata i nemaju profesionalno mesto gde mogu jasno da predstave svoje usluge.

## Rešenje koje nudimo

Petera nudi centralizovano mesto za pronalazak i predstavljanje usluga čuvanja, uz jasne oglase i filtriranje po najbitnijim kriterijumima. Vlasnici mogu brzo da pregledaju ponude, uporede usluge i cene, a zatim rezervišu termin. Čuvari dobijaju alat za kreiranje kredibilnog profila i stabilniji tok upita.

## Ključne funkcionalnosti

- Oglasi čuvara sa opisom, cenom, lokacijom i tipovima ljubimaca
- Filtriranje po gradu, ceni, vrstama ljubimaca i uslugama
- Detaljan prikaz oglasa sa fotografijama i podacima o čuvaru
- Rezervacije sa automatskim obračunom ukupne cene
- Registracija i prijava za vlasnike i čuvare
- Verifikacija čuvara kroz upload dokumentacije

## Uloge

- Vlasnik: pretražuje oglase i pravi rezervacije
- Čuvar: objavljuje oglase i prima rezervacije

## Tehnologije

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Drizzle ORM + PostgreSQL
- better-auth
- Radix UI

## Lokalni razvoj

### Preduslovi

- Node.js 18+ (preporuka 20+)
- PostgreSQL (ili Docker)

### Podešavanje okruženja

Kreirajte `.env` fajl i podesite vrednosti:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/petera
BETTER_AUTH_SECRET=change-me
BETTER_AUTH_URL=http://localhost:3000/
```

### Pokretanje baze preko Docker-a

```bash
docker compose up -d
```

### Instalacija i pokretanje

```bash
npm install
npm run db:migrate
npm run dev
```

Aplikacija se podiže na `http://localhost:3000`.

## Skripte

- `npm run dev` - pokretanje u razvojnom režimu
- `npm run build` - build za produkciju
- `npm run start` - pokretanje produkcijskog build-a
- `npm run db:generate` - generisanje migracija
- `npm run db:migrate` - primena migracija
- `npm run db:push` - direktno usklađivanje šeme sa bazom
- `npm run db:studio` - Drizzle Studio
- `npm run db:check` - provera migracija
- `npm run db:drop` - brisanje šeme

## Struktura projekta

- `app/(info)` - info stranice
- `app/(main)` - oglasi, rezervacije, dodavanje oglasa
- `app/(auth)` - prijava i registracije
- `components` - zajedničke UI komponente
- `db` - schema i migracije
