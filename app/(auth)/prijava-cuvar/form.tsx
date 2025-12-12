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
  FieldError,
} from "@/components/ui/field";

import { prijavaCuvarAction } from "./actions";

import { useActionState } from "react";


export default function Form() {
  const [state, action] = useActionState(prijavaCuvarAction, {error: ""})
  return (
    <form action={action}>
      <FieldSet>
        <FieldLegend>Prijavi se</FieldLegend>
        <FieldDescription>
          Popuni obrazac za prijavu sa osnovnim podacima
        </FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel>Ime</FieldLabel>
            <Input name="ime" placeholder="Vaše ime" required />
          </Field>

          <Field>
            <FieldLabel>Prezime</FieldLabel>
            <Input name="prezime" placeholder="Vaše prezime" required />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              name="email"
              type="email"
              placeholder="email@gmail.com"
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
          </Field>
          <Field orientation="horizontal">
            <Checkbox name="terms" className="mr-2" required />
            <FieldLabel
              className="font-normal"
            >Prihvatam uslove korišćenja</FieldLabel>
          </Field>
          {state.error && <FieldError>{state.error}</FieldError>}
          <Field orientation="horizontal">
            <Button type="submit">Pošalji prijavu</Button>
            <Button variant="outline" type="button">
              Već imam nalog
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}

