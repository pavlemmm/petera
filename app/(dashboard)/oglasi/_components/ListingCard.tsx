import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CityLabel } from "../../_lib/constants";
import type { Listing } from "../_types";

type ListingCardProps = Omit<Listing, "id">;

function formatPrice(pricePerDay: string | number) {
  const value =
    typeof pricePerDay === "number" ? pricePerDay : Number(pricePerDay);
  if (Number.isNaN(value)) return "Cena po dogovoru";
  return `${value.toFixed(2)} RSD / dan`;
}

function excerpt(text: string, max = 140) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export default function ListingCard({
  title,
  description,
  city,
  pricePerDay,
  image,
  imageMimeType,
  ratingAverage,
  reviewCount,
}: ListingCardProps) {
  const imageSrc =
    image && imageMimeType
      ? `data:${imageMimeType};base64,${Buffer.from(image).toString("base64")}`
      : null;

  return (
    <Card className="bg-white/80">
      <div className="overflow-hidden rounded-t-xl">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="h-40 w-full object-cover"
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-muted text-sm text-muted-foreground">
            Bez slike
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{CityLabel[city]}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{excerpt(description)}</p>
        <p className="text-sm font-semibold">{formatPrice(pricePerDay)}</p>
        <p className="text-sm text-muted-foreground">
          {reviewCount > 0
            ? `${ratingAverage?.toFixed(1) ?? "0.0"} (${reviewCount} recenzija)`
            : "Nema recenzija"}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Pogledaj detalje</Button>
      </CardFooter>
    </Card>
  );
}
