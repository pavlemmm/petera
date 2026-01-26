import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { getListing } from "../_actions/get-listing";
import ListingMedia from "./_components/ListingMedia";
import { buildImageSources, formatDate, formatPrice } from "./_lib/format";
import { cityLabel, petLabel, serviceLabel } from "../_lib/constants";
import { Button } from "@/components/ui/button";
import { AuthMode, requireAuth } from "@/lib/auth-server-helper";
import { UserRole } from "@/db/types";

interface OglasProps {
  params: Promise<{ id: string }>;
}

export default async function OglasPage({ params }: OglasProps) {
  const { id } = await params;
  const listing = await getListing(id);
  const { role } = await requireAuth(AuthMode.GUEST);

  if (!listing) {
    notFound();
  }

  const images = buildImageSources(listing.images, listing.title);
  const uniquePets = Array.from(new Set(listing.pets));
  const uniqueServices = Array.from(new Set(listing.services));
  const ratingText =
    listing.reviewCount > 0
      ? `${listing.ratingAverage?.toFixed(1) ?? "0.0"} (${listing.reviewCount} recenzija)`
      : "Nema recenzija";

  return (
    <div className="max-w-6xl m-auto py-10 px-2 space-y-8">
      <Section className="bg-linear-to-r from-white/80 to-white/40">
        <div className="space-y-3">
          <Link
            href="/"
            className="text-sm font-semibold tracking-widest text-orange-700"
            aria-label="Nazad na oglase"
          >
            ← Oglasi
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-balance">
            {listing.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{cityLabel[listing.city]}</Badge>
            <Badge variant="outline">
              Objavljen {formatDate(listing.createdAt)}
            </Badge>
          </div>
        </div>
      </Section>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <Section className="rounded-2xl bg-white/80 p-4 row-span-2">
          <ListingMedia images={images} />
        </Section>

        <Section className="bg-white/80">
          <h3 className="text-lg font-semibold">Rezervacija</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatPrice(listing.pricePerDay)}
          </p>
          <Button className="mt-4 w-full" disabled={role != UserRole.OWNER}>
            <Link href={`/rezervacije/novi?id=${listing.id}`} className="w-full">
              Rezervišite termin
            </Link>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            U cenu je uključena platformska provizija od 15%.
          </p>
        </Section>


        <Section className="bg-white/80 flex gap-5">
          <div>
            <h3 className="text-lg font-semibold">Usluge</h3>
            {uniqueServices.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {uniqueServices.map((service) => (
                  <Badge key={service} variant="secondary">
                    {serviceLabel[service]}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Nije navedeno.
              </p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">Tip ljubimaca</h3>
            {uniquePets.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {uniquePets.map((pet) => (
                  <Badge key={pet} variant="outline">
                    {petLabel[pet]}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Nije navedeno.
              </p>
            )}
          </div>
        </Section>

        <Section className="bg-white/80">
          <h3 className="text-lg font-semibold">Opis</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {listing.description}
          </p>
        </Section>


        <Section className="bg-white/80">
          <h3 className="text-lg font-semibold">Čuvar</h3>
          <p className="mt-2 text-sm font-semibold">{listing.sitterName}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {listing.sitterBio ?? "Nema dodatnih informacija."}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {ratingText}
          </p>
        </Section>

      </div>
    </div>
  );
}
