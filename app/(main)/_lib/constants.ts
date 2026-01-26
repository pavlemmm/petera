import type { CityType, PetType, ServiceType } from "@/db/types";

export const petLabel: Record<PetType, string> = {
  DOG: "Pas 🐶",
  CAT: "Mačka 🐱",
  BIRD: "Ptica 🐦",
  OTHER: "Ostalo 🐾",
};

export const cityLabel: Record<CityType, string> = {
  BEOGRAD: "Beograd",
  NOVI_SAD: "Novi Sad",
  NIS: "Niš",
  KRAGUJEVAC: "Kragujevac",
  SUBOTICA: "Subotica",
};

export const serviceLabel: Record<ServiceType, string> = {
  BOARDING: "Čuvanje 🏠",
  WALKING: "Šetnja 🚶",
  FEEDING: "Ishrana 🍽️",
  BATHING: "Kupanje 🛁",
  GROOMING: "Šišanje ✂️",
};

export const statusLabel: Record<string, string> = {
  PENDING: "Na čekanju",
  CONFIRMED: "Potvrđeno",
  CANCELLED: "Otkazano",
};
