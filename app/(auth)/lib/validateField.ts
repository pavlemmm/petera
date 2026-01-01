"use client"

import { z } from "zod";

export function validateField<T extends z.ZodObject<any>>(
  schema: T,
  field: keyof z.infer<T>,
  value: unknown
): string[] {
  const fieldSchema = schema.shape[field] as z.ZodTypeAny;
  const result = fieldSchema.safeParse(value);

  if (result.success) return [];

  return result.error.issues.map(issue => issue.message);
}

export function hasErrors() {
  return Object.values(errors).some(
    (field) => field && field.length > 0
  );
} 
