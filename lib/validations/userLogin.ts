import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.email("Unesite validan email."),
  password: z.string().min(8, "Šifra mora imati bar 8 karaktera."),
});

