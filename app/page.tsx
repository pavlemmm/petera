import Section from "@/components/ui/section";
import {Button} from "@/components/ui/button";

export default function Home() {
    return (
        <div className="max-w-5xl m-auto">

            <Section className="mt-5 bg-gradient-to-r from-white/70 to-white/40">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mt-3">
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
            <Section className="mt-10 bg-white/50 flex space-x-3">
                <div>
                    <h3 className="text-xs font-semibold tracking-widest text-orange-700">ZA VLASNIKE</h3>
                    <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
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
                    </p>
                    <Button className="mt-5">Prijavi se kao čuvar</Button>
                </div>
                <div>
                    <h3 className="text-xs font-semibold tracking-widest text-orange-700">ZA ČUVARE</h3>
                    <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">Pojačaj vidljivost i
                        obilnost svog posla.</h2>
                    <p className="leading-7 mt-6">
                        Petera je domaća platforma koja ujedinjuje brižne ljude oko jasnih pravila, proverenih profila i
                        iskrenih dogovora. Vlasnici brzo pronalaze sigurne ruke, a čuvari grade transparentne karijere
                        uz podršku našeg tima.
                    </p>
                    <p className="text-sm leading-7 mt-6">
                        Svaki profil prolazi ručnu verifikaciju identiteta, fotografije prostora i plan brige. Tako je
                        svako putovanje vlasnika i svaki novi klijent čuvara obojen radošću, a ne neizvesnošću.
                    </p>
                    <Button className="mt-5">Prijavi se kao vlasnik</Button>
                </div>
            </Section>
        </div>
    );
}
