"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OwnerRegisterSchema } from "../_validations/ownerRegister";
import { SitterRegisterSchema } from "../_validations/sitterRegister";
import { UserRole } from "@/db/types";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-utils";

export type RegisterResult =
  | { success: true }
  | { success: false; error?: string };

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (
    formData: FormData,
    role: UserRole,
  ): Promise<RegisterResult> => {
    setIsLoading(true);
    setError(null);

    const schema =
      role === UserRole.OWNER ? OwnerRegisterSchema : SitterRegisterSchema;
    const values = Object.fromEntries(formData.entries());

    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      setIsLoading(false);
      setError("Polja nisu pravilno unesena");
      return { success: false, error: "Polja nisu pravilno unesena" };
    }

    const { email, password, name } = parsed.data;

    try {
      await authClient.signUp.email(
        { email, password, name, role },
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

  return { register, isLoading, error, setError };
}
