import { SitterRegisterSchemaKeys } from "@/lib/validations/types";

export type SitterRegisterErrors = Partial<Record<SitterRegisterSchemaKeys, string[]>>;
