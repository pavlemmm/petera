import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.email("Unesite ispravnu email adresu."),
  password: z.string().min(8, "Lozinka mora imati bar 8 karaktera."),
});
