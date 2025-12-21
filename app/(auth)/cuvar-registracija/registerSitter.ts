"use server";

import { db } from "@/db/db";
import { sitters, users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { SitterRegisterSchema } from "@/lib/validations/sitterRegister";

import { generateSalt, hashPassword } from "@/lib/passwordHasher";

import { UserRole } from "@/db/types";


export async function registerSitter(formData: FormData) {
  const raw = Object.fromEntries(formData);

  const parsed = SitterRegisterSchema.safeParse({ ...raw, terms: raw.terms === "on" });

  if (!parsed.success) return { success: false, formError: "Došlo je do greške." }

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, parsed.data.email))
    .limit(1);

  if (existing.length > 0) {
    return { success: false, formError: "Email već postoji." };
  }

  const salt = generateSalt()
  const passwordHash = await hashPassword(parsed.data.password, salt)

  const user = await db.transaction(async (tx) => {
    const [createdUser] = await tx
      .insert(users)
      .values({
        email: parsed.data.email,
        name: parsed.data.name,
        lastName: parsed.data.lastName,
        role: UserRole.SITTER,
        passwordHash,
        salt,
      })
      .returning();

    await tx.insert(sitters).values({
      id: createdUser.id,
    });

    return createdUser;
  });

  return { success: true, user };
}
