"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBooking } from "../_actions/create-booking";
import type { ListingSummary } from "../_actions/get-listing-summary";
import { formatPrice } from "../../[id]/_lib/format";

type ReservationFormProps = {
  listing: ListingSummary;
};

const PLATFORM_FEE_PERCENT = 0.15;

export default function ReservationForm({ listing }: ReservationFormProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1;
    return Number.isNaN(diff) || diff < 1 ? 0 : diff;
  }, [startDate, endDate]);

  const priceValue =
    typeof listing.pricePerDay === "number"
      ? listing.pricePerDay
      : Number(listing.pricePerDay);
  const base = days && !Number.isNaN(priceValue) ? priceValue * days : 0;
  const fee = base * PLATFORM_FEE_PERCENT;
  const total = base + fee;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await createBooking({
      listingId: listing.id,
      startDate,
      endDate,
    });

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    router.push("/rezervacije");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Section className="bg-white/80">
        <h3 className="text-lg font-semibold">Termini</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Datum početka</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              required
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Datum završetka</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              required
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>
      </Section>

      <Section className="bg-white/80">
        <h3 className="text-lg font-semibold">Cena</h3>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Cena po danu</span>
            <span>{formatPrice(listing.pricePerDay)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Broj dana</span>
            <span>{days || "-"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Osnovica</span>
            <span>{base ? `${base.toFixed(2)} RSD` : "-"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Provizija (15%)</span>
            <span>{fee ? `${fee.toFixed(2)} RSD` : "-"}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-foreground">
            <span>Ukupno</span>
            <span>{total ? `${total.toFixed(2)} RSD` : "-"}</span>
          </div>
        </div>
      </Section>

      <Section className="bg-white/80">
        <h3 className="text-lg font-semibold">Plaćanje</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Plaćanje će biti dostupno uskoro. Za sada se rezervacija kreira bez
          naplate, a potvrdu dobijate odmah.
        </p>
      </Section>

      {error && (
        <p className="text-sm font-semibold text-destructive">{error}</p>
      )}

      <Button className="w-full p-6 rounded-4xl cursor-pointer" type="submit" disabled={isLoading}>
        {isLoading ? "Kreiranje rezervacije..." : "Potvrdite rezervaciju"}
      </Button>
    </form>
  );
}
