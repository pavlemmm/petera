import { listing, sitter, user } from "./schema";

import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof user>;
export type Sitter = InferSelectModel<typeof sitter>;
export type Listing = InferSelectModel<typeof listing>;

export enum UserRole { OWNER = "OWNER", SITTER = "SITTER" }
export enum PetType { DOG = "DOG", CAT = "CAT", BIRD = "BIRD", OTHER = "OTHER" }
export enum City { BEOGRAD = "BEOGRAD", NOVI_SAD = "NOVI_SAD", NIS = "NIS", KRAGUJEVAC = "KRAGUJEVAC", SUBOTICA = "SUBOTICA" }
