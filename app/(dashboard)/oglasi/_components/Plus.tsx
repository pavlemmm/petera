import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/db/types";

type PlusProps = {
  role: UserRole;
};

export default function Plus({ role }: PlusProps) {
  if (role !== UserRole.SITTER) return null;

  return (
    <Link
      href="/dodaj-oglas"
      className="md:hidden fixed bottom-6 right-6 z-50"
      aria-label="Dodaj oglas"
    >
      <Button className="h-12 w-12 rounded-full p-0 text-2xl shadow-lg">
        +
      </Button>
    </Link>
  );
}
