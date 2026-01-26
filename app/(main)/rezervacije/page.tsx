import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { requireAuth } from "@/lib/auth-server-helper";
import { UserRole } from "@/db/types";
import { getBookings } from "./_actions/get-bookings";
import { statusLabel } from "../_lib/constants";

function formatAmount(value: string | number) {
  const amount = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(amount)) return "-";
  return amount.toFixed(2);
}

export default async function RezervacijePage() {
  const { role } = await requireAuth();

  const bookings = await getBookings();

  return (
    <div className="max-w-5xl m-auto py-10 px-2 space-y-8">
      <Section className="bg-linear-to-r from-white/80 to-white/40">
        <p className="text-sm font-semibold tracking-widest text-orange-700">
          Rezervacije
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-balance">
          {role === UserRole.SITTER
            ? "Rezervacije kod vas"
            : "Moje rezervacije"}
        </h1>
      </Section>

      {bookings.length === 0 ? (
        <Section className="bg-white/80">
          <p className="text-sm text-muted-foreground">
            Trenutno nema rezervacija.
          </p>
        </Section>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Section key={booking.id} className="bg-white/80">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">
                    {booking.listingTitle}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(booking.startDate).toLocaleDateString()} – {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">
                    {statusLabel[booking.status ?? ""] ?? "Nepoznato"}
                  </Badge>
                  <Badge variant="secondary">
                    {formatAmount(booking.totalAmount)} {booking.currency}
                  </Badge>
                  {role === UserRole.OWNER && (
                    <Link
                      href={`/rezervacije/novi?id=${booking.listingId}`}
                      className="text-sm font-semibold text-orange-700"
                    >
                      Ponovite rezervaciju
                    </Link>
                  )}
                </div>
              </div>
            </Section>
          ))}
        </div>
      )}
    </div>
  );
}
