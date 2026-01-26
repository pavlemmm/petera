import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cityLabel, petLabel, serviceLabel } from "../_lib/constants";
import { Badge } from "@/components/ui/badge";
import type { Listing } from "../_types";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

function formatPrice(pricePerDay: string | number) {
  const value =
    typeof pricePerDay === "number" ? pricePerDay : Number(pricePerDay);
  if (Number.isNaN(value)) return "Cena po dogovoru";
  return `${value.toFixed(2)} RSD / dan`;
}

export default function ListingCard({
  id,
  title,
  description,
  city,
  pricePerDay,
  image,
  imageMimeType,
  ratingAverage,
  reviewCount,
  pets,
  services,
  sitterName,
}: Listing) {
  const imageSrc =
    image && imageMimeType
      ? `data:${imageMimeType};base64,${Buffer.from(image).toString("base64")}`
      : null;
  const uniquePets = Array.from(new Set(pets));
  const uniqueServices = Array.from(new Set(services));

  return (
    <Link href={`/${id}`}>
      <Card className="bg-white/80 hover:bg-gray-300 hover:cursor-pointer transition-colors duration-300 py-2">
        <CardHeader className="px-2 py-0">
          <div className="overflow-hidden rounded-lg">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="h-60 w-full object-cover"
              />
            ) : (
              <div className="flex h-60 w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                Nema fotografije
              </div>
            )}
          </div>
          <CardTitle className="px-3 flex justify-between items-center">
            <span className="text-lg">{title}</span>
            <span className="font-light text-sm whitespace-nowrap">{cityLabel[city]}📍</span>
          </CardTitle>
          <CardDescription className="px-3">
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 p-6 pt-0">
          <Separator />
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span className="text-slate-700">{sitterName}</span>
            <span className="font-light">
              {reviewCount > 0
                ? `${ratingAverage?.toFixed(1) ?? "0.0"} (${reviewCount} recenzija)`
                : "Nema recenzija"}
            </span>
          </div>
          <p className="text-sm font-semibold">{formatPrice(pricePerDay)}</p>

          {uniqueServices.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {uniqueServices.map((service) => (
                <Badge key={service}>{serviceLabel[service]}</Badge>
              ))}
            </div>
          )}
          {uniquePets.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {uniquePets.map((pet) => (
                <Badge key={pet} variant="secondary">
                  {petLabel[pet]}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
