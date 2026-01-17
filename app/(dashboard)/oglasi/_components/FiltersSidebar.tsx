"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { City, PetType } from "@/db/types";
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
import { CityLabel, PetTypeLabel } from "../../_lib/constants";
import type { ListingFilters } from "../_types";

const cityOptions = Object.values(City);
const petTypeOptions = Object.values(PetType);

type FiltersSidebarProps = {
  filters: ListingFilters;
};

export default function FiltersSidebar({ filters }: FiltersSidebarProps) {
  const router = useRouter();
  const [city, setCity] = useState<City | "all">(filters.city ?? "all");
  const [petTypes, setPetTypes] = useState<PetType[]>(filters.petTypes ?? []);
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
    petTypes.forEach((type) => params.append("petType", type));
    const query = params.toString();
    router.push(query ? `/oglasi?${query}` : "/oglasi");
  }

  function handleReset() {
    setCity("all");
    setPetTypes([]);
    setMinPrice("");
    setMaxPrice("");
    router.push("/oglasi");
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Grad</FieldLabel>
            <Select
              value={city}
              onValueChange={(value) => setCity(value as City | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sva mesta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Sva mesta</SelectItem>
                {cityOptions.map((value) => (
                  <SelectItem key={value} value={value}>
                    {CityLabel[value]}
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
              value={petTypes}
              className="grid grid-cols-2"
              variant="outline"
              spacing={2}
              onValueChange={(value) => setPetTypes(value as PetType[])}
            >
              {petTypeOptions.map((type) => (
                <ToggleGroupItem key={type} value={type}>
                  {PetTypeLabel[type]}
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
              Poništi
            </Button>
            <Button type="submit">Primeni filtere</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
