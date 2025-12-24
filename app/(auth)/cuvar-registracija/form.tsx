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

import { useState, useTransition } from "react";

import Errors from "../components/Errors";
import FormError from "../components/FormError";

import { validateField } from "../lib/validateField";

import { useRouter } from "next/navigation";

import { SitterRegisterErrors } from "../types";
import { SitterRegisterSchema } from "../lib/validations/sitterRegister";
import { SitterRegisterSchemaKeys } from "../lib/validations/types";
import { authClient } from "@/lib/auth-client";
import { UserRole } from "@/db/types";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<SitterRegisterErrors>({})
  const [formError, setFormError] = useState<string | null>()

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const fieldErrors = validateField(SitterRegisterSchema, name as SitterRegisterSchemaKeys, value);

    setErrors(prev => ({ ...prev, [name]: fieldErrors }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { data, error } = await authClient.signUp.email({
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
      role: UserRole.SITTER,
      callbackURL: "/oglasi" // A URL to redirect to after the user verifies their email (optional)
    }, {
      onRequest: (ctx) => {
        setIsLoading(true);
      },
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (ctx) => {
        setFormError(ctx.error.message);
        setIsLoading(false);
      },
    });
    console.log("DATA:")
    console.log(data)
    console.log("ERROR:")
    console.log(error)
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
            <Input name="name" onChange={handleChange} required />
            <Errors>{errors.name}</Errors>
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              name="email" onChange={handleChange}
              type="email"
              required
            />
            <Errors>{errors.email}</Errors>
          </Field>

          <Field>
            <FieldLabel>Šifra</FieldLabel>
            <Input
              name="password" onChange={handleChange}
              type="password"
              required
              minLength={8}
            />
            <Errors>{errors.password}</Errors>
          </Field>

          <Field>
            <FieldLabel>Potvrdi šifru</FieldLabel>
            <Input
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              required
              minLength={8}
            />
            <Errors>{errors.confirmPassword}</Errors>
          </Field>

          {/* TODO Fix this, not working rn */}
          <Field>
            <FieldLabel>Slike ličnog dokumenta</FieldLabel>
            <Input
              name="document" onChange={handleChange}
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
            <Errors>{errors.terms}</Errors>
          </Field>

          <FormError>{formError}</FormError>

          <Field orientation="horizontal">
            <Button type="submit">{isLoading ? "Registrujem se..." : "Pošalji registraciju"}</Button>
            <Button variant="outline" type="button" onClick={() => router.push('/prijava')}>
              Već imam nalog
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
