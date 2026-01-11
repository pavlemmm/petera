import { Button } from "@/components/ui/button";
import { UserRole } from "@/db/types";
import Link from "next/link";

export default function Plus({ role }: { role: UserRole }) {
  if (role == UserRole.SITTER)
    return <Link href="/dodaj-oglas" className="fixed bottom-6 right-6 z-50" aria-label="Dodaj oglas">
      <Button className="h-12 w-12 rounded-full p-0 text-2xl shadow-lg">
        +
      </Button>
    </Link>

}
