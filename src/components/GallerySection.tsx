import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import botanicalGardenImg from "@/assets/botanical-garden.jpg";
import geneBankImg from "@/assets/gene-bank.jpg";
import biodiversityImg from "@/assets/biodiversity-center.jpg";
import protectedAreaImg from "@/assets/protected-area.jpg";
import nurseryImg from "@/assets/nursery.jpg";
import heroImg from "@/assets/hero-bg.jpg";

const galleryImages = [
  {
    id: 1,
    src: botanicalGardenImg,
    alt: "Botanička bašta",
    category: "Botanička bašta",
  },
  {
    id: 2,
    src: geneBankImg,
    alt: "Banka gena",
    category: "Banka gena",
  },
  {
    id: 3,
    src: biodiversityImg,
    alt: "Istraživanje biodiverziteta",
    category: "Istraživanje",
  },
  {
    id: 4,
    src: protectedAreaImg,
    alt: "Zaštićeno područje",
    category: "Zaštićeno područje",
  },
  {
    id: 5,
    src: nurseryImg,
    alt: "Rasadnik",
    category: "Rasadnik",
  },
  {
    id: 6,
    src: heroImg,
    alt: "Institut",
    category: "Institut",
  },
];

const categories = ["Sve", "Botanička bašta", "Banka gena", "Istraživanje", "Zaštićeno područje", "Rasadnik"];

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("Sve");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "Sve"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handlePrev = () => {
    if (lightboxImage !== null) {
      const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage);
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setLightboxImage(filteredImages[prevIndex].id);
    }
  };

  const handleNext = () => {
    if (lightboxImage !== null) {
      const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage);
      const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
      setLightboxImage(filteredImages[nextIndex].id);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Galerija
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Foto galerija
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">
            Pogledajte fotografije naših centara, projekata i aktivnosti.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => setLightboxImage(image.id)}
            >
              <div className={`relative ${index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-4 py-2 bg-primary-foreground rounded-full text-primary font-medium">
                    {image.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={handleNext}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
          <img
            src={galleryImages.find((img) => img.id === lightboxImage)?.src}
            alt={galleryImages.find((img) => img.id === lightboxImage)?.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
