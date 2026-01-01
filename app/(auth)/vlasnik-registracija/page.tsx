import Section from "@/components/section";
import Form from "./form";
import { requireNoSession } from "@/lib/auth-server-helper";

export default async function CuvarRegistracija() {
  await requireNoSession()
  return (
    <div className="max-w-5xl m-auto py-10 px-2 space-y-10">
      <Section className="bg-linear-to-r from-white/80 to-white/40">
        <p className="text-sm font-semibold tracking-widest text-orange-700">
          REGISTRACIJA ZA VLASNIKE
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight text-balance">
          Pokaži kome poveravamo naše ljubimce
        </h2>
        <p className="leading-7 text-sm mt-4 text-muted-foreground">
          Obrazac ispod nam pomaže da upoznamo tebe, tvoj prostor i standard brige koji nudiš. Nakon što
          pošalješ prijavu naš tim se javlja u roku od 48h sa sledećim koracima verifikacije.
        </p>
      </Section>

      <Section className="bg-white/70">
        <Form />
      </Section>
    </div>
  );
}


