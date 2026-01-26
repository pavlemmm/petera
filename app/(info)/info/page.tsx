import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-w-5xl m-auto py-10 px-2 space-y-10">
      <Section className="bg-linear-to-r from-white/70 to-white/40">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-balance">
          Mesto gde vlasnici i čuvari kućnih ljubimaca lako grade poverenje.
        </h1>
        <p className="leading-7 mt-6">
          Petera povezuje vlasnike koji traže pouzdanu brigu i čuvare koji žele stabilne, jasno definisane
          angažmane. Fokus je na urednim profilima, preglednim oglasima i komunikaciji bez nejasnoća.
        </p>
        <p className="text-muted-foreground text-sm leading-7 mt-6">
          Svaki oglas prikazuje ključne informacije o usluzi, ceni i tipovima ljubimaca, a recenzije pomažu
          da se brže donese odluka.
        </p>
      </Section>
      <Section className="bg-white/50 flex flex-col md:flex-row gap-10">
        <div className="flex flex-col justify-center">
          <div><h3 className="text-xs font-semibold tracking-widest text-orange-700">ZA VLASNIKE</h3>
            <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">
              Brzo pronađite proverenog čuvara za svog ljubimca
            </h2>
            <p className="leading-7 mt-6">
              Pregledajte ponude po gradu, ceni i vrsti usluge, pa izaberite čuvara koji odgovara potrebama
              vašeg ljubimca. Svaki oglas je jasan i lako uporediv.
            </p>
            <p className="text-sm leading-7 mt-6 text-foreground">
              Rezervacije, dogovori i komunikacija su na jednom mestu, bez nepotrebne razmene poruka.
            </p></div>
          <Link href="/vlasnik-registracija">
            <Button className="mt-6">
              Registrujte se kao vlasnik
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-between">
          <div><h3 className="text-xs font-semibold tracking-widest text-orange-700">ZA ČUVARE</h3>
            <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">
              Istaknite usluge i gradite stabilan tok rezervacija
            </h2>
            <p className="leading-7 mt-6">
              Kreirajte oglas sa jasnim opisom usluga, cenom i fotografijama. Kvalitetan profil povećava
              poverenje i broj upita.
            </p>
            <p className="text-sm leading-7 mt-6 text-foreground">
              Sve rezervacije i komunikacija su organizovani, a uslovi su transparentni od početka.
            </p></div>
          <Link href="/cuvar-registracija">
            <Button className="mt-6">
              Registrujte se kao čuvar
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
