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

import { useState } from "react";

import { signIn } from "next-auth/react"


import Errors from "../components/Errors";
import FormError from "../components/FormError";

import { validateField } from "../lib/validateField";

import { useRouter } from "next/navigation";

import { LoginErrors } from "../types";
import { UserLoginSchema } from "../lib/validations/userLogin";
import { UserLoginSchemaKeys } from "../lib/validations/types";


export default function Form() {
  const [errors, setErrors] = useState<LoginErrors>({})
  const [formError, setFormError] = useState<string | null>()

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const fieldErrors = validateField(UserLoginSchema, name as UserLoginSchemaKeys, value);

    setErrors(prev => ({ ...prev, [name]: fieldErrors }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.ok) {
      setFormError("Pogrešan email ili šifra");
      return
    }

    router.push("/oglasi")
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Prijavi se</FieldLegend>
        <FieldDescription>
          Popuni obrazac sa podacima za prijavu
        </FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              name="email"
              type="email"
              onChange={handleChange}
              required
            />
            <Errors>{errors.email}</Errors>
          </Field>

          <Field>
            <FieldLabel>Šifra</FieldLabel>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              required
              minLength={8}
            />
            <Errors>{errors.password}</Errors>
          </Field>

          <FormError>{formError}</FormError>

          <Field orientation="horizontal">
            <Button type="submit">Prijavi se</Button>
            <Button variant="outline" type="button" onClick={() => router.push('/vlasnik-registracija')}>
              Registruj se kao vlasnik
            </Button>
            <Button variant="outline" type="button" onClick={() => router.push('/cuvar-registracija')}>
              Registruj se kao čuvar
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
