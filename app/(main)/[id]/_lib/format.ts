import type { ListingImage } from "../../_types";

type ImageSource = {
  src: string;
  alt: string;
};

export function buildImageSources(
  images: ListingImage[],
  title: string,
): ImageSource[] {
  return images.map(({ image, mimeType }) => ({
    src: `data:${mimeType};base64,${Buffer.from(image).toString("base64")}`,
    alt: title,
  }));
}

export function formatPrice(pricePerDay: string | number) {
  const value =
    typeof pricePerDay === "number" ? pricePerDay : Number(pricePerDay);
  if (Number.isNaN(value)) return "Cena po dogovoru";
  return `${value.toFixed(2)} RSD / dan`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("sr-RS").format(date);
}
