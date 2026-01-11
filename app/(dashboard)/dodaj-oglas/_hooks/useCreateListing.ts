"use client";

import { useState } from "react";
import { createListing } from "../_actions/create-listing";
import { useRouter } from "next/navigation";

export type CreateListingResult =
  | { success: true }
  | { success: false; error: string };

export function useCreateListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const create = async (formData: FormData): Promise<CreateListingResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createListing(formData);
      if (!result.success) {
        setError(result.error);
      }
      setIsLoading(false);
      router.push("/oglasi");
      return { success: true };
    } catch (e: any) {
      const message = e?.message ?? "Došlo je do greške";
      setError(message);
      setIsLoading(false);
      return { success: false, error: message };
    }
  };

  return { create, isLoading, error, setError };
}
