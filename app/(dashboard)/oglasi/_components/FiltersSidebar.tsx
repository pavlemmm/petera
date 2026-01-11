"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { City, PetType } from "@/db/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CityLabel, PetTypeLabel } from "../../_lib/constants";

function getNumberParam(
  params: URLSearchParams,
  key: string
): string | undefined {
  const value = params.get(key);
  if (!value) return undefined;
  return value;
}

export default function FiltersSidebar() {
  const searchParams = useSearchParams();

  const city = searchParams.get("city") ?? "";
  const minPrice = getNumberParam(searchParams, "minPrice") ?? "";
  const maxPrice = getNumberParam(searchParams, "maxPrice") ?? "";
  const minRating = getNumberParam(searchParams, "minRating") ?? "";
  const petTypes = new Set(searchParams.getAll("petType"));

  return (
    <form className="space-y-6" method="get">
      <div className="space-y-2">
        <label htmlFor="city" className="text-sm font-semibold">
          Mesto
        </label>
        <select
          id="city"
          name="city"
          defaultValue={city}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs"
        >
          <option value="">Sva mesta</option>
          {Object.values(City).map((value) => (
            <option key={value} value={value}>
              {CityLabel[value]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="minPrice" className="text-sm font-semibold">
          Cena od
        </label>
        <Input
          id="minPrice"
          name="minPrice"
          type="number"
          min="0"
          step="1"
          defaultValue={minPrice}
          placeholder="RSD"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="maxPrice" className="text-sm font-semibold">
          Cena do
        </label>
        <Input
          id="maxPrice"
          name="maxPrice"
          type="number"
          min="0"
          step="1"
          defaultValue={maxPrice}
          placeholder="RSD"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="minRating" className="text-sm font-semibold">
          Recenzije
        </label>
        <select
          id="minRating"
          name="minRating"
          defaultValue={minRating}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs"
        >
          <option value="">Sve ocene</option>
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>
              {rating}+ ocena
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold">Tip ljubimca</p>
        <div className="flex flex-col gap-2">
          {Object.values(PetType).map((value) => (
            <label key={value} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="petType"
                value={value}
                defaultChecked={petTypes.has(value)}
                className="h-4 w-4 rounded border border-input"
              />
              {PetTypeLabel[value]}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Primeni filtere</Button>
        <Link href="/oglasi" className="text-sm text-muted-foreground">
          Resetuj filtere
        </Link>
      </div>
    </form>
  );
}
