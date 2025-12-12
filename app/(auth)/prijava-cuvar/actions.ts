"use server";

import { CuvarSchema } from "@/lib/validations/cuvar";
import { redirect } from "next/navigation";

export async function prijavaCuvarAction(prev: any, formData: FormData) {
  const raw = Object.fromEntries(formData);

  const parsed = CuvarSchema.safeParse({
    ...raw,
    terms: raw.terms === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues}
  }

  console.log("SUCCESS")
  redirect("/")

}
