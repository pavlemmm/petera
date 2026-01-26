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
import {
  CityValues,
  PetValues,
  ServiceValues,
  type CityType,
  type PetType,
  type ServiceType,
} from "@/db/types";
import { cityLabel, petLabel, serviceLabel } from "../_lib/constants";
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
  const [pets, setPets] = useState<PetType[]>([]);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [city, setCity] = useState<CityType | "">("");
  const { create, isLoading, error, setError } = useCreateListing();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.set("city", city);
    pets.forEach((pet) => {
      formData.append("pet", pet);
    });
    services.forEach((service) => {
      formData.append("service", service);
    });
    setError(null);
    await create(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Dodajte oglas</FieldLegend>
        <FieldDescription>Unesite osnovne informacije o oglasu.</FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel>Naslov oglasa</FieldLabel>
            <Input
              name="title"
              type="text"
              placeholder="Unesite naslov oglasa"
              required
            />
            <FieldDescription>Kratak i jasan naslov.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Grad</FieldLabel>
            <Select
              value={city}
              onValueChange={(value) => setCity(value as CityType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Odaberite grad" />
              </SelectTrigger>
              <SelectContent>
                {CityValues.map((c) => (
                  <SelectItem key={c} value={c}>
                    {cityLabel[c]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>
              Odaberite grad u kojem pružate usluge.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Cena po danu</FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder="0"
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
              placeholder="Unesite detaljan opis oglasa."
              required
            />
            <FieldDescription>
              Par rečenica o uslovima i navikama čuvanja.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Tipovi ljubimaca koje čuvate</FieldLabel>

            <ToggleGroup
              type="multiple"
              value={pets}
              variant="outline"
              spacing={2}
              onValueChange={(v) => setPets(v as PetType[])}
            >
              {PetValues.map((type) => (
                <ToggleGroupItem key={type} value={type}>
                  {petLabel[type]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <FieldDescription>Možete izabrati više opcija.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Usluge koje nudite</FieldLabel>
            <ToggleGroup
              type="multiple"
              value={services}
              variant="outline"
              spacing={2}
              onValueChange={(v) => setServices(v as ServiceType[])}
            >
              {ServiceValues.map((service) => (
                <ToggleGroupItem key={service} value={service}>
                  {serviceLabel[service]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <FieldDescription>Možete izabrati više opcija.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Fotografije oglasa</FieldLabel>
            <Input
              name="image"
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
              {isLoading ? "Objavljivanje..." : "Objavite"}
            </Button>

            <Link href="/">
              <Button variant="outline" type="button">
                Otkažite
              </Button>
            </Link>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
