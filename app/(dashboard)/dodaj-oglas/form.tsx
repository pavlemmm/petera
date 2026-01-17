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
  FieldError,
} from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import { useState } from "react";
import { CityValues, PetValues, type City, type PetType } from "@/db/types";
import { CityLabel, PetLabel } from "../_lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { useCreateListing } from "./_hooks/useCreateListing";

export default function Form() {
  const [petTypes, setPetTypes] = useState<PetType[]>([]);
  const [city, setCity] = useState<City | "">("");
  const { create, isLoading, error, setError } = useCreateListing();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setError(null);
    await create(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Dodaj oglas</FieldLegend>
        <FieldDescription>Unesi osnovne informacije o oglasu.</FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel>Naslov oglasa</FieldLabel>
            <Input
              name="title"
              type="text"
              placeholder="Unesite vaš naslov oglasa"
              required
            />
            <FieldDescription>Kratak i jasan naslov.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Grad</FieldLabel>
            <Select
              value={city}
              onValueChange={(value) => setCity(value as City)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Odaberi grad" />
              </SelectTrigger>
              <SelectContent>
                {CityValues.map((c) => (
                  <SelectItem key={c} value={c}>
                    {CityLabel[c]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="city" value={city} required />
            <FieldDescription>
              Odaberite grad u kojem čuvate ljubimce.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Cena po danu</FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder="0.00"
                type="number"
                name="price"
                min={0}
                required
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>RSD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>Cena po danu u RSD.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Opis oglasa</FieldLabel>
            <Textarea
              name="description"
              placeholder="Unesite vaš detaljan opis oglasa ovde."
              required
            />
            <FieldDescription>
              Par rečenica o uslovima i navikama čuvanja.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Tipovi ljubimaca koje čuvaš</FieldLabel>

            <ToggleGroup
              type="multiple"
              value={petTypes}
              variant="outline"
              spacing={2}
              onValueChange={(v) => setPetTypes(v as PetType[])}
            >
              {PetTypeValues.map((type) => (
                <ToggleGroupItem key={type} value={type}>
                  {PetLabel[type]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <input type="hidden" name="petTypes" value={petTypes.join(",")} />

            <FieldDescription>Možete izabrati više opcija.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Slike na oglasu</FieldLabel>
            <Input
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="cursor-pointer"
              required
            />
            <FieldDescription>
              Maksimalno 3 slike, do 2MB po slici.
            </FieldDescription>
          </Field>

          {error && <FieldError>{error}</FieldError>}

          <Field orientation="horizontal">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Postavljam..." : "Postavi"}
            </Button>

            <Link href="/oglasi">
              <Button variant="outline" type="button">
                Otkaži
              </Button>
            </Link>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
