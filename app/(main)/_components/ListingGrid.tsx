import ListingCard from "./ListingCard";
import type { Listing } from "../_types";
import Section from "@/components/Section";

type ListingGridProps = {
  listings: Listing[];
};

export default function ListingGrid({ listings }: ListingGridProps) {
  if (listings.length === 0) return (
    <Section className="bg-white/70 text-center items-start">
      <h3 className="text-lg font-semibold">Još nema oglasa</h3>
      <p className="text-sm text-muted-foreground mt-2">
        Budite prvi koji će objaviti oglas.
      </p>
    </Section>
  )
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {listings.map(listing => (
        <ListingCard key={listing.id} {...listing} />
      ))}
    </div>
  );
}
