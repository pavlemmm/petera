"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type ImageSource = {
  src: string;
  alt: string;
};

type ListingMediaProps = {
  images: ImageSource[];
};

export default function ListingMedia({ images }: ListingMediaProps) {
  const [index, setIndex] = useState(0);
  const hasImages = images.length > 0;
  const heroImage = images[index];
  const hasMultiple = images.length > 1;

  const showPrev = () =>
    setIndex((current) => (current - 1 + images.length) % images.length);
  const showNext = () =>
    setIndex((current) => (current + 1) % images.length);

  return (
    <div className="space-y-2">
      <div className="p-0 relative overflow-hidden rounded-xl">
        {hasImages ? (
          <>
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className="h-80 w-full object-cover"
            />
            {hasMultiple && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full p-0 text-xl"
                  onClick={showPrev}
                >
                  ←
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full p-0 text-xl"
                  onClick={showNext}
                >
                  →
                </Button>
              </>
            )}
            {hasMultiple && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-md">
                {index + 1} / {images.length}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-80 w-full items-center justify-center bg-muted text-sm text-muted-foreground">
            Nema fotografija
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, imageIndex) => (
            <button
              key={`${image.src}-${imageIndex}`}
              type="button"
              onClick={() => setIndex(imageIndex)}
              className={`overflow-hidden rounded-2xl border bg-white/70 shadow-sm transition ${imageIndex === index
                ? "border-orange-400 ring-2 ring-orange-200"
                : "border-transparent opacity-80 hover:opacity-100"
                }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-20 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
