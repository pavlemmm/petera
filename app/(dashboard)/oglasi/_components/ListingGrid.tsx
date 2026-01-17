import ListingCard from "./ListingCard";
import type { Listing } from "../_types";
import Section from "@/components/section";

type ListingGridProps = {
  listings: Listing[];
};

export default function ListingGrid({ listings }: ListingGridProps) {
  if (listings.length === 0) return (
    <Section className="bg-white/70 text-center items-start">
      <h3 className="text-lg font-semibold">Nema oglasa</h3>
      <p className="text-sm text-muted-foreground mt-2">
        Budi prvi koji će postaviti oglas.
      </p>
    </Section>
  )
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map(listing => (
        <ListingCard key={listing.id} {...listing} />
      ))}
    </div>
  );
}
