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

import { registerSitter } from "./registerSitter";
import { validateField } from "../lib/validateField";

import { SitterRegisterSchema } from "@/lib/validations/sitterRegister";
import { SitterRegisterSchemaKeys } from "@/lib/validations/types";
import { SitterRegisterErrors } from "./types";
import { useRouter } from "next/navigation";

export default function Form() {
  const [isPending, startTransition] = useTransition();

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
    startTransition(async () => {
      const res = await registerSitter(formData);
      if (!res.success) {
        setFormError(res.formError)
        return
      }
      console.log(res.user)
    });
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
            <FieldLabel>Ime</FieldLabel>
            <Input name="name" onChange={handleChange} required />
            <Errors>{errors.name}</Errors>
          </Field>

          <Field>
            <FieldLabel>Prezime</FieldLabel>
            <Input name="lastName" onChange={handleChange} required />
            <Errors>{errors.lastName}</Errors>
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
            <Button type="submit">{isPending ? "Registrujem se..." : "Pošalji registraciju"}</Button>
            <Button variant="outline" type="button" onClick={() => router.push('/prijava')}>
              Već imam nalog
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
