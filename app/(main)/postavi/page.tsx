import { UserRole } from "@/db/types";
import { requireAuth, AuthMode } from "@/lib/auth-server-helper";
import Section from "@/components/Section";
import Form from "./form";

export default async function DodajOglasPage() {
  const { session, user } = await requireAuth(AuthMode.GUEST, UserRole.SITTER);

  return (
    <div className="max-w-5xl m-auto py-10 px-2 space-y-10">
      <Section className="bg-linear-to-r from-white/80 to-white/40">
        <p className="text-sm font-semibold tracking-widest text-orange-700">
          DODAJ OGLAS
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight text-balance">
          Objavite oglas i ponudite usluge čuvanja
        </h2>
        <p className="leading-7 text-sm mt-4 text-muted-foreground">
          Unesite ključne informacije o uslugama, ceni i tipovima ljubimaca
          koje prihvatate. Kvalitetan opis povećava broj upita.
        </p>
      </Section>

      <Section className="bg-white/70">
        <Form />
      </Section>
    </div>
  );
}
