import { SitterRegisterSchemaKeys, UserLoginSchemaKeys } from "./lib/validations/types";

export type SitterRegisterErrors = Partial<Record<SitterRegisterSchemaKeys, string[]>>;

export type LoginErrors = Partial<Record<UserLoginSchemaKeys, string[]>>;

export type LoginFormState = {
  errors: LoginErrors
  formError: string | null;
  success: boolean;
};

