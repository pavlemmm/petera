"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldLegend,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import Error from "../_components/Error";

import { UserRole } from "@/db/types";

import { useRegister } from "../_hooks/useRegister";
import Link from "next/link";

export default function Form() {
  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await register(formData, UserRole.OWNER);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Registrujte se</FieldLegend>
        <FieldDescription>
          Popunite osnovne podatke za registraciju
        </FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel>Ime i prezime</FieldLabel>
            <Input name="name" required />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input name="email" type="email" required />
          </Field>

          <Field>
            <FieldLabel>Broj telefona</FieldLabel>
            <Input
              name="phone"
              type="tel"
              required
            />
          </Field>

          <Field>
            <FieldLabel>Lozinka</FieldLabel>
            <Input name="password" type="password" required minLength={8} />
          </Field>

          <Field>
            <FieldLabel>Potvrdite lozinku</FieldLabel>
            <Input
              name="confirmPassword"
              type="password"
              required
              minLength={8}
            />
          </Field>

          <Field orientation="horizontal">
            <Checkbox name="terms" className="mr-2" required />
            <FieldLabel className="font-normal">
              Prihvatam uslove korišćenja
            </FieldLabel>
          </Field>

          <Error>{error}</Error>

          <Field orientation="horizontal">
            <Button type="submit">
              {isLoading ? "Registracija..." : "Pošaljite registraciju"}
            </Button>

            <Link href="/prijava">
              <Button variant="outline" type="button">
                Već imate nalog
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
