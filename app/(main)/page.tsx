import Section from "@/components/Section";
import { getListings } from "./_actions/get-listings";
import ListingGrid from "./_components/ListingGrid";
import FiltersSidebar from "./_components/FiltersSidebar";
import { parseListingFilters } from "./_lib/filters";
import { requireAuth, AuthMode } from "@/lib/auth-server-helper";
import Plus from "./_components/Plus";
import type { SearchParams } from "./_types";
import Link from "next/link";

type OglasiProps = {
  searchParams: Promise<SearchParams>;
};

export default async function OglasiPage({ searchParams }: OglasiProps) {
  const filters = parseListingFilters(await searchParams);
  const listings = await getListings(filters);
  const { role } = await requireAuth(AuthMode.GUEST);

  return (
    <div className="max-w-6xl m-auto py-10 px-2 space-y-10">
      <Section className="bg-linear-to-r from-white/80 to-white/40">
        <p className="text-sm font-semibold tracking-widest text-orange-700">
          Oglasi čuvara
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight text-balance">
          Pronađite čuvara za svog ljubimca
        </h2>
        <p className="leading-7 text-sm mt-4 text-muted-foreground">
          Filtrirajte po gradu, ceni i uslugama, pa brzo uporedite dostupne
          opcije. Više informacija o platformi pogledajte{" "}
          <Link href="/info" className="underline text-orange-700">
            ovde
          </Link>
        </p>
      </Section>

      <div className="grid gap-6 md:grid-cols-[30%_1fr] lg:grid-cols-[20%_1fr] items-start">
        <FiltersSidebar filters={filters} />
        <ListingGrid listings={listings} />
      </div>
      <Plus role={role} />
    </div>
  );
}
