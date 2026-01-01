"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldLegend,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import Link from "next/link";
import { useTransition } from "react";


export default function Form() {
  const [isLoading, setLoading] = useTransition()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Dodaj Oglas</FieldLegend>
        <FieldDescription>
          Popuni obrazac sa podacima za oglas
        </FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel>Naslov oglasa</FieldLabel>
            <Input
              name="title"
              type="text"
              required
            />
          </Field>

          <Field>
            <FieldLabel>Grad</FieldLabel>
            <Input
              name="city"
              type="password"
              required
              minLength={8}
            />
          </Field>

          <Field orientation="horizontal">
            <Button type="submit">{isLoading ? "Prijavljujem se..." : "Prijavi se"}</Button>

            <Link href="/vlasnik-registracija">
              <Button variant="outline" type="button">
                Registruj se kao vlasnik
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
