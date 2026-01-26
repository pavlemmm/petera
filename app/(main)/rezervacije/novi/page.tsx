import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { getListingSummary } from "../_actions/get-listing-summary";
import { AuthMode, requireAuth } from "@/lib/auth-server-helper";
import { UserRole } from "@/db/types";
import { cityLabel } from "../../_lib/constants";
import ReservationForm from "./reservation-form";

interface NewBookingPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function NewBookingPage({
  searchParams,
}: NewBookingPageProps) {
  await requireAuth(AuthMode.REQUIRED, UserRole.OWNER);
  const { id } = await searchParams;
  if (!id) {
    notFound();
  }

  const listing = await getListingSummary(id);
  if (!listing) {
    notFound();
  }

  return (
    <div className="max-w-4xl m-auto py-10 px-2 space-y-8">
      <Section className="bg-linear-to-r from-white/80 to-white/40">
        <div className="space-y-3">
          <Link
            href={`/${listing.id}`}
            className="text-sm font-semibold tracking-widest text-orange-700"
          >
            ← Nazad na oglas
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-balance">
            Rezervacija
          </h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{cityLabel[listing.city]}</Badge>
            <Badge variant="outline">{listing.title}</Badge>
          </div>
        </div>
      </Section>

      <ReservationForm listing={listing} />
    </div>
  );
}
