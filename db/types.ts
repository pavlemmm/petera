import { sitter, user } from "./schema";

import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof user>;
export type Sitter = InferSelectModel<typeof sitter>;

export enum UserRole { OWNER = "OWNER", SITTER = "SITTER" }
export enum PetType { DOG = "DOG", CAT = "CAT", BIRD = "BIRD", OTHER = "OTHER" }
export enum City { BEOGRAD = "BEOGRAD", NOVI_SAD = "NOVI_SAD", NIS = "NIS", KRAGUJEVAC = "KRAGUJEVAC", SUBOTICA = "SUBOTICA" }
