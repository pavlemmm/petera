import ListingCard from "./ListingCard";
import { City } from "@/db/types";

type ListingGridProps = {
  listings: Array<{
    id: string;
    title: string;
    description: string;
    city: City;
    pricePerDay: string | number;
    image: Buffer | null;
    imageMimeType: string | null;
    ratingAverage: number | null;
    reviewCount: number;
  }>;
};

export default function ListingGrid({ listings }: ListingGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((item) => (
        <ListingCard
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          city={item.city}
          pricePerDay={item.pricePerDay}
          image={item.image}
          imageMimeType={item.imageMimeType}
          ratingAverage={item.ratingAverage}
          reviewCount={item.reviewCount}
        />
      ))}
    </div>
  );
}
