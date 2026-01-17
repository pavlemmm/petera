import Section from "@/components/section";
import { getListings } from "./_actions/get-listings";
import ListingGrid from "./_components/ListingGrid";
import FiltersSidebar from "./_components/FiltersSidebar";
import { parseListingFilters } from "./_lib/filters";
import { requireAuth } from "@/lib/auth-server-helper";
import Plus from "./_components/Plus";
import type { SearchParams } from "./_types";

type OglasiProps = {
  searchParams: Promise<SearchParams>;
};

export default async function OglasiPage({ searchParams }: OglasiProps) {
  const filters = parseListingFilters(await searchParams);
  const listings = await getListings(filters);
  const { role } = await requireAuth();

  return (
    <div className="max-w-6xl m-auto py-10 px-2 space-y-10">
      <Section className="bg-linear-to-r from-white/80 to-white/40">
        <p className="text-sm font-semibold tracking-widest text-orange-700">
          Oglasi
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight text-balance">
          Pregled svih oglasa
        </h2>
        <p className="leading-7 text-sm mt-4 text-muted-foreground">
          Pronađite odgovarajućeg čuvara u vašoj blizini odmah.
        </p>
      </Section>

      <div className="grid gap-6 lg:grid-cols-[20%_1fr]">
        <Section className="bg-white/70 h-fit lg:sticky lg:top-6">
          <FiltersSidebar filters={filters} />
        </Section>

        <ListingGrid listings={listings} />
      </div>
      <Plus role={role} />
    </div>
  );
}
