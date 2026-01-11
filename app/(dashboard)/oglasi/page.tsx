import Section from "@/components/section";
import { getListings } from "./_actions/get-listings";
import ListingGrid from "./_components/ListingGrid";
import FiltersSidebar from "./_components/FiltersSidebar";
import { parseListingFilters, type SearchParams } from "./_lib/filters";
import { requireAuth } from "@/lib/auth-server-helper";
import Plus from "./_components/Plus";

export default async function OglasiPage({ searchParams, }: { searchParams?: SearchParams; }) {
  const listings = await getListings(parseListingFilters(searchParams));
  const { session, user, role } = await requireAuth()

  return (
    <div className="max-w-6xl m-auto py-10 px-2 space-y-10">
      <Section className="bg-linear-to-r from-white/80 to-white/40">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-widest text-orange-700">
              Oglasi
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-balance">
              Pregled svih oglasa
            </h2>
            <p className="leading-7 text-sm mt-4 text-muted-foreground">
              Pronađite odgovarajućeg čuvara za Vas odmah.
            </p>
          </div>
        </div>
      </Section>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Section className="bg-white/70 h-fit lg:sticky lg:top-6">
          <FiltersSidebar />
        </Section>

        {listings.length === 0 ? (
          <Section className="bg-white/70 text-center">
            <h3 className="text-lg font-semibold">Nema oglasa</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Budi prvi koji će postaviti oglas.
            </p>
          </Section>
        ) : (
          <ListingGrid listings={listings} />
        )}
      </div>
      <Plus role={role} />
    </div>
  );
}
