import Section from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl m-auto py-10 px-2 space-y-10">
      <Section className="bg-linear-to-r from-white/70 to-white/40">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-balance">
          Zajednica gde vlasnici i čuvari kućnih ljubimaca grade poverenje zajedno.
        </h1>
        <p className="leading-7 mt-6">
          Petera je domaća platforma koja ujedinjuje brižne ljude oko jasnih pravila, proverenih profila i
          iskrenih dogovora. Vlasnici brzo pronalaze sigurne ruke, a čuvari grade transparentne karijere uz
          podršku našeg tima.
        </p>
        <p className="text-sm leading-7 mt-6">
          Svaki profil prolazi ručnu verifikaciju identiteta, fotografije prostora i plan brige. Tako je svako
          putovanje vlasnika i svaki novi klijent čuvara obojen radošću, a ne neizvesnošću.
        </p>
      </Section>
      <Section className="bg-white/50 flex flex-col md:flex-row gap-10">
        <div className="flex flex-col justify-center">
          <div><h3 className="text-xs font-semibold tracking-widest text-orange-700">ZA VLASNIKE</h3>
            <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">
              Brzo i sigurno nadji čuvara za svog ljubimca
            </h2>
            <p className="leading-7 mt-6">
              Petera je domaća platforma koja ujedinjuje brižne ljude oko jasnih pravila, proverenih profila i
              iskrenih dogovora. Vlasnici brzo pronalaze sigurne ruke, a čuvari grade transparentne karijere
              uz podršku našeg tima.
            </p>
            <p className="text-sm leading-7 mt-6">
              Svaki profil prolazi ručnu verifikaciju identiteta, fotografije prostora i plan brige. Tako je
              svako putovanje vlasnika i svaki novi klijent čuvara obojen radošću, a ne neizvesnošću.
            </p></div>
          <Link href="/prijava-vlasnik">
            <Button className="mt-6">
              Prijavi se kao vlasnik
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-between">
          <div><h3 className="text-xs font-semibold tracking-widest text-orange-700">ZA ČUVARE</h3>
            <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">Pojačaj vidljivost i
              obilnost svog posla.</h2>
            <p className="leading-7 mt-6">
              Petera je domaća platforma koja ujedinjuje brižne ljude oko jasnih pravila, proverenih profila i
              iskrenih dogovora. Vlasnici brzo pronalaze sigurne ruke, a čuvari grade transparentne karijere
              uz podršku našeg tima.
            </p>
            <p className="text-sm leading-7 mt-6">
              Svaki profil prolazi ručnu verifikaciju identiteta, fotografije prostora i plan brige. Tako je
              svako putovanje vlasnika i svaki novi klijent čuvara obojen radošću, a ne neizvesnošću.
            </p></div>
          <Link href="/prijava-cuvar">
            <Button className="mt-6">
              Prijavi se kao čuvar
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
