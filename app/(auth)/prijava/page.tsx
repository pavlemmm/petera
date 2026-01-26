import Section from "@/components/Section";
import Form from "./form";
import { requireAuth, AuthMode } from "@/lib/auth-server-helper";

export default async function CuvarRegistracija() {
  await requireAuth(AuthMode.GUEST);

  return (
    <div className="max-w-5xl m-auto py-10 px-2 space-y-10">
      <Section className="bg-linear-to-r from-white/80 to-white/40">
        <p className="text-sm font-semibold tracking-widest text-orange-700">
          PRIJAVA
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight text-balance">
          Pristupite svom nalogu
        </h2>
        <p className="leading-7 text-sm mt-4 text-muted-foreground">
          Unesite email i lozinku kako biste nastavili sa rezervacijama,
          oglasima i porukama.
        </p>
      </Section>

      <Section className="bg-white/70">
        <Form />
      </Section>
    </div>
  );
}
