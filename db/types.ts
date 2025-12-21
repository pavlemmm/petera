import { sitters, users } from "./schema";

import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;

export enum UserRole { OWNER = "OWNER", SITTER = "SITTER" }

export type Sitter = InferSelectModel<typeof sitters>; 
