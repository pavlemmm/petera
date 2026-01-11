import { City, PetType } from "@/db/types";

export const PetTypeLabel: Record<PetType, string> = {
  [PetType.DOG]: "Pas 🐶",
  [PetType.CAT]: "Mačka 🐱",
  [PetType.BIRD]: "Ptica 🐦",
  [PetType.OTHER]: "Ostalo 🐾",
};

export const CityLabel: Record<City, string> = {
  [City.BEOGRAD]: "Beograd",
  [City.NOVI_SAD]: "Novi Sad",
  [City.NIS]: "Niš",
  [City.KRAGUJEVAC]: "Kragujevac",
  [City.SUBOTICA]: "Subotica",
};
