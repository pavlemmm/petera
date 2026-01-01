"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldLegend,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import Error from "../components/Error";

import { UserRole } from "@/db/types";

import { useRegister } from "../lib/hooks/useRegister";
import Link from "next/link";

export default function Form() {
  const { register, isLoading, error } = useRegister()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await register(formData, UserRole.OWNER)
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Registruj se</FieldLegend>
        <FieldDescription>
          Popuni obrazac za prijavu sa osnovnim podacima
        </FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel>Ime i Prezime</FieldLabel>
            <Input name="name" required />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              name="email"
              type="email"
              required
            />
          </Field>

          <Field>
            <FieldLabel>Šifra</FieldLabel>
            <Input
              name="password"
              type="password"
              required
              minLength={8}
            />
          </Field>

          <Field>
            <FieldLabel>Potvrdi šifru</FieldLabel>
            <Input
              name="confirmPassword"

              type="password"
              required
              minLength={8}
            />
          </Field>

          {/* TODO Fix this, not working rn */}
          <Field>
            <FieldLabel>Slike ličnog dokumenta</FieldLabel>
            <Input
              name="document"
              type="file"
              accept="image/*"
              multiple
              className="cursor-pointer"
            />
            <FieldDescription>
              Pošalji jasne fotografije sebe i obe strane lične karte ili pasoša.
            </FieldDescription>
            {/* <Errors>{errors.document}</Errors> */}
          </Field>


          <Field orientation="horizontal">
            <Checkbox name="terms" className="mr-2" required />
            <FieldLabel
              className="font-normal"
            >Prihvatam uslove korišćenja</FieldLabel>
          </Field>

          <Error>{error}</Error>

          <Field orientation="horizontal">
            <Button type="submit">{isLoading ? "Registrujem se..." : "Pošalji registraciju"}</Button>

            <Link href="/prijava">
              <Button variant="outline" type="button">
                Već imam nalog
              </Button>
            </Link>
            <Link href="/cuvar-registracija">
              <Button variant="outline" type="button">
                Registruj se kao čuvar
              </Button>
            </Link>

          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
