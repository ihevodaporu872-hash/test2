"use client";

import { Section } from "@/components/layout/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import type { Testimonial } from "@/types";

interface TestimonialsCarouselProps {
  title: string;
  description?: string;
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialsCarousel({
  title,
  description,
  testimonials,
  className,
}: TestimonialsCarouselProps) {
  return (
    <Section className={className}>
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="max-w-5xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12" aria-label="Предыдущий отзыв" />
          <CarouselNext className="-right-4 md:-right-12" aria-label="Следующий отзыв" />
        </Carousel>
      </div>
    </Section>
  );
}
