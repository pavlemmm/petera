import type { City, PetType } from "@/db/types";

export const PetLabel: Record<PetType, string> = {
  DOG: "Pas 🐶",
  CAT: "Mačka 🐱",
  BIRD: "Ptica 🐦",
  OTHER: "Ostalo 🐾",
};

export const CityLabel: Record<City, string> = {
  BEOGRAD: "Beograd",
  NOVI_SAD: "Novi Sad",
  NIS: "Niš",
  KRAGUJEVAC: "Kragujevac",
  SUBOTICA: "Subotica",
};
