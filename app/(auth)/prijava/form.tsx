"use client";

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

import Error from "../_components/Error";

import { useLogin } from "../_hooks/useLogin";
import Link from "next/link";

export default function Form() {
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await login(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Prijavite se</FieldLegend>
        <FieldDescription>
          Unesite podatke za prijavu
        </FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input name="email" type="email" required />
          </Field>

          <Field>
            <FieldLabel>Lozinka</FieldLabel>
            <Input name="password" type="password" required minLength={8} />
          </Field>

          <Error>{error}</Error>

          <Field orientation="horizontal">
            <Button type="submit">
              {isLoading ? "Prijavljivanje..." : "Prijavite se"}
            </Button>

            <Link href="/vlasnik-registracija">
              <Button variant="outline" type="button">
                Registrujte se kao vlasnik
              </Button>
            </Link>
            <Link href="/cuvar-registracija">
              <Button variant="outline" type="button">
                Registrujte se kao čuvar
              </Button>
            </Link>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
