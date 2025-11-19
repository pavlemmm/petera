import Section from "@/components/ui/section";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

export default function PrijavaCuvar() {
    return (
        <div className="max-w-5xl m-auto py-10 space-y-10">
            <Section className="bg-gradient-to-r from-white/80 to-white/40">
                <p className="text-sm font-semibold tracking-widest text-orange-700">
                    PRIJAVA ZA ČUVARE
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight text-balance mt-4">
                    Pokaži kome poveravamo naše pse i mačke.
                </h1>
                <p className="leading-7 mt-4 text-base text-muted-foreground">
                    Obrazac ispod nam pomaže da upoznamo tebe, tvoj prostor i standard brige koji nudiš. Nakon što
                    pošalješ prijavu naš tim se javlja u roku od 48h sa sledećim koracima verifikacije.
                </p>
            </Section>

            <Section className="bg-white/70">
                <h2 className="text-2xl font-bold tracking-tight text-balance">
                    Osnovni podaci i verifikacija identiteta
                </h2>
                <form className="mt-8 space-y-8">
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel>Ime</FieldLabel>
                            <Input name="ime" placeholder="Vaše ime" required/>
                        </Field>

                        <Field>
                            <FieldLabel>Prezime</FieldLabel>
                            <Input name="prezime" placeholder="Vaše prezime" required/>
                        </Field>

                        <Field className="md:col-span-2">
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@email.com"
                                required
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Šifra</FieldLabel>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={8}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Potvrdi šifru</FieldLabel>
                            <Input
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={8}
                            />
                        </Field>

                        <Field className="md:col-span-2">
                            <FieldLabel>Slike ličnog dokumenta</FieldLabel>
                            <Input
                                name="dokument"
                                type="file"
                                accept="image/*"
                                multiple
                                className="cursor-pointer"
                            />
                            <FieldDescription>
                                Pošalji jasne fotografije obe strane lične karte ili pasoša.
                            </FieldDescription>
                        </Field>
                        <Field className="md:col-span-2">
                            <Button type="submit" className="w-full sm:w-auto">
                                Pošalji prijavu
                            </Button>
                            <FieldDescription className="text-sm text-muted-foreground">
                                Slanjem forme potvrđuješ da su podaci tačni i da prihvataš pravila platforme.
                            </FieldDescription></Field>
                    </FieldGroup>
                </form>
            </Section>
        </div>
    );
}
