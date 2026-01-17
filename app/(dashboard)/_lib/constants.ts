import type { CityType, PetType } from "@/db/types";

export const PetLabel: Record<PetType, string> = {
  DOG: "Pas 🐶",
  CAT: "Mačka 🐱",
  BIRD: "Ptica 🐦",
  OTHER: "Ostalo 🐾",
};

export const CityLabel: Record<CityType, string> = {
  BEOGRAD: "Beograd",
  NOVI_SAD: "Novi Sad",
  NIS: "Niš",
  KRAGUJEVAC: "Kragujevac",
  SUBOTICA: "Subotica",
};
