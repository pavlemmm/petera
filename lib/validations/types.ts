import { z } from "zod";

import { OwnerRegisterSchema } from "./ownerRegister"
import { SitterRegisterSchema } from "./sitterRegister"
import { UserLoginSchema } from "./userLogin"

export type OwnerRegisterSchema = z.infer<typeof OwnerRegisterSchema>
export type OwnerRegisterSchemaKeys = keyof OwnerRegisterSchema

export type SitterRegisterSchema = z.infer<typeof SitterRegisterSchema>
export type SitterRegisterSchemaKeys = keyof SitterRegisterSchema

export type UserLoginSchema = z.infer<typeof UserLoginSchema>
export type UserLoginSchemaKeys = keyof UserLoginSchema
