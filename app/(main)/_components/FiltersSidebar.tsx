"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CityValues,
  PetValues,
  ServiceValues,
  CityType,
  PetType,
  ServiceType,
} from "@/db/types";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cityLabel, petLabel, serviceLabel } from "../_lib/constants";
import type { ListingFilters } from "../_types";
import Section from "@/components/Section";

const cityOptions = CityValues;
const petOptions = PetValues;
const serviceOptions = ServiceValues;

type FiltersSidebarProps = {
  filters: ListingFilters;
};

export default function FiltersSidebar({ filters }: FiltersSidebarProps) {
  const router = useRouter();
  const [city, setCity] = useState<CityType | "all">(filters.city ?? "all");
  const [pets, setPets] = useState<PetType[]>(filters.pet ?? []);
  const [services, setServices] = useState<ServiceType[]>(
    filters.service ?? []
  );
  const [minPrice, setMinPrice] = useState(
    filters.minPrice !== undefined ? String(filters.minPrice) : ""
  );
  const [maxPrice, setMaxPrice] = useState(
    filters.maxPrice !== undefined ? String(filters.maxPrice) : ""
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (city !== "all") params.set("city", city);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    pets.forEach((pet) => params.append("pet", pet));
    services.forEach((service) => params.append("service", service));
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  function handleReset() {
    setCity("all");
    setPets([]);
    setServices([]);
    setMinPrice("");
    setMaxPrice("");
    router.push("/");
  }

  return (
    <Section className="bg-white/70 md:sticky md:top-6">
      <form onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Grad</FieldLabel>
              <Select
                value={city}
                onValueChange={(value) => setCity(value as CityType | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sva mesta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sva mesta</SelectItem>
                  {cityOptions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {cityLabel[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Cena od</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="number"
                  min="0"
                  step="1"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>RSD</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Cena do</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="number"
                  min="0"
                  step="1"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>RSD</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Tip ljubimca</FieldLabel>
              <ToggleGroup
                type="multiple"
                value={pets}
                className="grid grid-cols-2"
                variant="outline"
                spacing={2}
                onValueChange={(value) => setPets(value as PetType[])}
              >
                {petOptions.map((type) => (
                  <ToggleGroupItem key={type} value={type}>
                    {petLabel[type]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>

            <Field>
              <FieldLabel>Usluge</FieldLabel>
              <ToggleGroup
                type="multiple"
                value={services}
                className="grid grid-cols-2"
                variant="outline"
                spacing={2}
                onValueChange={(value) => setServices(value as ServiceType[])}
              >
                {serviceOptions.map((service) => (
                  <ToggleGroupItem key={service} value={service}>
                    {serviceLabel[service]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>

            <Field>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={handleReset}
              >
                Poništite filtere
              </Button>
              <Button type="submit">Pretraži</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </Section>
  );
}
