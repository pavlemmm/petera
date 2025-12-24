import { sitter, user } from "./schema";

import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof user>;

export enum UserRole { OWNER = "OWNER", SITTER = "SITTER" }

export type Sitter = InferSelectModel<typeof sitter>; 
