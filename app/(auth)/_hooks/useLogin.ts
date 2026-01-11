"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserLoginSchema } from "../_validations/userLogin";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-utils";

export type LoginResult =
  | { success: true }
  | { success: false; error?: string };

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (formData: FormData): Promise<LoginResult> => {
    setIsLoading(true);
    setError(null);

    const values = Object.fromEntries(formData.entries());

    const parsed = UserLoginSchema.safeParse(values);
    if (!parsed.success) {
      setIsLoading(false);
      setError("Polja nisu pravilno unesena");
      return { success: false, error: "Polja nisu pravilno unesena" };
    }

    const { email, password } = parsed.data;

    try {
      await authClient.signIn.email(
        { email, password },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => router.push("/oglasi"),
          onError: (ctx) => setError(getAuthErrorMessage(ctx.error.code)),
        },
      );

      setIsLoading(false);
      return { success: true };
    } catch (e: any) {
      setIsLoading(false);
      setError(e?.message ?? "Došlo je do greške");
      return { success: false, error: e?.message ?? "Došlo je do greške" };
    }
  };

  return { login, isLoading, error, setError };
}
